import { matchIsValidTel } from 'mui-tel-input';
import z from 'zod';

export const ProfileSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, 'Name must be at least 3 characters')
        .regex(/^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/, 'Only alphabetic characters'),
    phone_number: z.string().refine((val) => matchIsValidTel(val), {
        message: 'Invalid phone number',
    }),
});

export type EditProfileForm = z.infer<typeof ProfileSchema>;
