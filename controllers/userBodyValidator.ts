import * as z from 'zod';

export const userBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
    name: z.string()
    
})

export const loginBodySchema = z.object({
    email: z.string().email(),
    password: z.string()    
})