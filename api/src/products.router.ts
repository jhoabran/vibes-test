import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
export const productsRouter = Router();

const querySchema = z.object({
    search: z.string().optional(),
    sort: z.enum(['price', 'name']).optional(),
    order: z.enum(['asc', 'desc']).optional(),
    limit: z.coerce.number().optional(),
    page: z.coerce.number().optional(),
    available: z.string().optional().transform((val) => {
        if (val === undefined) return undefined;
        if (val === '0' || val === 'false') return false;
        if (val === '1' || val === 'true') return true;
        return undefined;
    }),
});


productsRouter.get('/', async (req, res, next) => {

    const { search, sort, order, limit, page, available } = querySchema.parse(req.query);

    const db = new PrismaClient();

    const orderBy = sort === 'price' ? { price: order } : { name: order };

    try {
        const products = await db.product.findMany({
            orderBy,
            skip: (page ?? 1 - 1) * (limit ?? 10),
            take: limit ?? 10,
            where: {
                AND: [
                    search
                        ? {
                            OR: [
                                { name: { contains: search, mode: "insensitive" } },
                                { category: { contains: search, mode: "insensitive" } }
                            ]
                        }
                        : {},
                    available !== undefined ? { isAvailable: available } : {}
                ]
            },
        });

        res.json({ total: products.length, page, limit, products });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', message: (error as Error).message });
    }
});



productsRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const db = new PrismaClient();
    try {
        const product = await db.product.findUnique({ where: { id: id } });
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', message: (error as Error).message });
    }
});




