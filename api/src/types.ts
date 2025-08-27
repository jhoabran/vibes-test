import { z } from "zod";

// schema for query params

export const querySchema = z.object({
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