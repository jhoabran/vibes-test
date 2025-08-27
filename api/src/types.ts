import { z } from "zod";
import { QueryParams } from "../../shared/types";

// Zod schema for runtime validation
// This ensures the parsed query matches our shared QueryParams type
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
}) satisfies z.ZodType<QueryParams>;