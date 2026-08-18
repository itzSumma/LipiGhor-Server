import { z } from 'zod';

export const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name cannot be empty').optional(),
    image: z.string().url('Invalid image URL').optional().nullable(),
  }),
});
