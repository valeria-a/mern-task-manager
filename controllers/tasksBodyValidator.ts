import * as z from 'zod';

export const createTaskBodySchema = z.object({
    title: z.string().max(128).min(1),
    description: z.string().optional(),
    done: z.boolean(),
    userId: z.string()
})
