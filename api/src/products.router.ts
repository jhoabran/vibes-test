import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { querySchema } from "./types";
import { Product, ProductsResponse } from "../../shared/types";

export const productsRouter = Router();

// GET /api/products

productsRouter.get('/', async (req, res) => {

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

        const response: ProductsResponse = {
            total: products.length,
            page,
            limit,
            products: products as Product[]
        };
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', message: (error as Error).message });
    }
});

// GET /api/products/:id

productsRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const db = new PrismaClient();
    try {
        const product = await db.product.findUnique({ where: { id: id } });
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.json(product as Product);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', message: (error as Error).message });
    }
});




