import { useState } from 'react';

import { NavLink } from 'react-router';

import { Stack, Typography } from '@mui/material';

import { useAppDispatch } from '@app';
import Logo from '@assets/images/logo2.webp';
import { AuthCard } from '@component/AuthCard';
import { Form } from '@component/Form';
import { ROUTE } from '@constant';
import { setServerError } from '@feature';
import { useLoginMutation } from '@service';
import { theme } from '@theme';
import { ApiError } from '@type';

import { LoginInputConfig } from './Login.config';
import {
    LoginApiErrorType,
    LoginFormErrorType,
    LoginFormValues,
} from './Login.types';
import { validate } from './LoginValidation';

export const Login = () => {
    const [errors, setErrors] = useState<LoginFormErrorType>({});

    const [login, { isLoading }] = useLoginMutation();

    const dispatch = useAppDispatch();

    const defaultValues = {
        email: '',
        password: '',
    };

    const handleSubmit = async (data: LoginFormValues) => {
        const validationError = validate(data);

        if (Object.keys(validationError).length > 0) {
            setErrors(validationError);
            return;
        }

        try {
            await login(data).unwrap();
        } catch (err) {
            const error = err as ApiError<LoginApiErrorType>;
            dispatch(setServerError(String(error.data.error)));
        }
    };

    return (
        <Stack
            minHeight="100%"
            width="100%"
            justifyContent="center"
            alignItems="center"
            padding={theme.spacing(8)}
        >
            <AuthCard
                image={Logo}
                alt="CineBook logo"
                heading="Welcome Back"
                subheading="Sign in to book your favorite movies"
            >
                <Stack gap={theme.spacing(6)} textAlign={'center'}>
                    <Form
                        errors={errors}
                        handleSubmit={handleSubmit}
                        inputs={LoginInputConfig}
                        button="Login"
                        isLoading={isLoading}
                        defaultValues={defaultValues}
                    />

                    <Typography variant="subtitle1" color="text.secondary">
                        Don&apos;t have an account?
                        <NavLink to={ROUTE.SIGNUP}>Sign up</NavLink>
                    </Typography>
                </Stack>
            </AuthCard>
        </Stack>
    );
};
