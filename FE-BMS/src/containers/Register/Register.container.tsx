import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';

import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';

import { AuthCard, PhoneInput } from '@components';
import { ROUTES } from '@constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@hooks';

import { RegisterForm, RegisterSchema } from './Register.schema';

/**
 * Container which display register authentication form.
 * Handles states and actions of user registration.
 */
export const RegisterContainer = () => {
    /** Hooks */
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<RegisterForm>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            phone_number: '',
        },
    });
    const { handleRegister, registerLoading } = useAuth();

    /** Functions */
    /**
     * Function call when submit the registration form
     * @param data - Register data which need to pass to the api
     */
    const onSubmit = async (data: RegisterForm) => {
        await handleRegister(data);
    };

    return (
        <Box
            flex={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <AuthCard
                title="Welcome to BookMyShow"
                subtitle="Create an account to book tickets and enjoy seamless entertainment"
            >
                <Stack
                    onSubmit={handleSubmit(onSubmit)}
                    component="form"
                    gap={3}
                    pt={4}
                >
                    <TextField
                        fullWidth
                        label="Full Name"
                        {...register('name')}
                        autoComplete="name"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                    <TextField
                        fullWidth
                        type="email"
                        label="Email"
                        {...register('email')}
                        autoComplete="email"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <PhoneInput name="phone_number" control={control} />
                    <TextField
                        fullWidth
                        type="password"
                        label="Password"
                        {...register('password')}
                        autoComplete="new-password"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <TextField
                        fullWidth
                        type="password"
                        label="Confirm Password"
                        {...register('confirm_password')}
                        autoComplete="new-password"
                        error={!!errors.confirm_password}
                        helperText={errors.confirm_password?.message}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ py: 3, mt: 3 }}
                        loading={registerLoading}
                    >
                        Sign up
                    </Button>
                    <Typography
                        variant="body2"
                        color="textDisabled"
                        textAlign="center"
                    >
                        Already have an account?{' '}
                        <Link component={RouterLink} to={ROUTES.LOGIN}>
                            Sign in
                        </Link>
                    </Typography>
                </Stack>
            </AuthCard>
        </Box>
    );
};
