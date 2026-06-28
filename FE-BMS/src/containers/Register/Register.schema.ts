import { matchIsValidTel } from 'mui-tel-input';
import { z } from 'zod';

export const RegisterSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(3, 'Name must be at least 3 characters')
            .regex(
                /^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/,
                'Only alphabetic characters',
            ),
        email: z.email('Invalid email address'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        confirm_password: z.string(),
        phone_number: z.string().refine((val) => matchIsValidTel(val), {
            message: 'Invalid phone number',
        }),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: 'Passwords do not match',
        path: ['confirm_password'],
    });

export type RegisterForm = z.infer<typeof RegisterSchema>;
