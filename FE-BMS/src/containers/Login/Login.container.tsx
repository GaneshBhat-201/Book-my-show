import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';

import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';

import { AuthCard } from '@components';
import { ROUTES } from '@constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@hooks';

import { LoginForm, LoginSchema } from './Login.schema';

/**
 * Container which display login authentication form.
 * Handles states and actions of user login.
 */
export const LoginContainer = () => {
    /** Hooks */
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: zodResolver(LoginSchema),
    });
    const { handleLogin, loginLoading } = useAuth();

    /** Functions */
    /**
     * Function call when submit the login form
     * @param data - Login data which need to pass to the api
     */
    const onSubmit = async (data: LoginForm) => {
        await handleLogin(data);
    };

    return (
        <Box
            flex={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <AuthCard
                title="Welcome Back to BookMyShow"
                subtitle="Sign in to continue your movie journey"
            >
                <Stack
                    onSubmit={handleSubmit(onSubmit)}
                    component="form"
                    gap={3}
                    pt={4}
                >
                    <TextField
                        fullWidth
                        type="email"
                        label="Email"
                        {...register('email')}
                        autoComplete="email"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        fullWidth
                        type="password"
                        label="Password"
                        {...register('password')}
                        autoComplete="current-password"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ py: 3, mt: 3 }}
                        loading={loginLoading}
                    >
                        Sign in
                    </Button>
                    <Typography
                        variant="body2"
                        color="textDisabled"
                        textAlign="center"
                    >
                        Don&apos;t have an account?{' '}
                        <Link component={RouterLink} to={ROUTES.REGISTER}>
                            Sign up
                        </Link>
                    </Typography>
                </Stack>
            </AuthCard>
        </Box>
    );
};
