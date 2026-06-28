import { useState } from 'react';

import { NavLink, useNavigate } from 'react-router';

import { Stack, Typography } from '@mui/material';

import Logo from '@assets/images/logo2.webp';
import { AuthCard } from '@component/AuthCard';
import { Form } from '@component/Form';
import { ROUTE } from '@constant';
import { useSignupMutation } from '@service';
import { theme } from '@theme';
import { ApiError } from '@type';

import { SignupInputConfig } from './Signup.config';
import {
    SignupFormErrorType,
    SignupFormServerErrorType,
    SignupFormValues,
} from './Signup.types';
import { validate } from './SignupValidation';

export const Signup = () => {
    const [errors, setErrors] = useState<SignupFormErrorType>({});

    const navigate = useNavigate();

    const [signup, { isLoading }] = useSignupMutation();

    const defaultValues = {
        name: '',
        email: '',
        password: '',
        gender: '',
        dob: '',
        confirmPassword: '',
    };

    const handleSubmit = async (data: SignupFormValues) => {
        const validationErrors = validate(data);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await signup({ ...data, date_of_birth: data.dob }).unwrap();
            void navigate(ROUTE.LOGIN);
        } catch (err) {
            const error = err as ApiError<SignupFormServerErrorType>;
            const errData = error.data;

            if (errData.date_of_birth) {
                setErrors({ ...errData, dob: errData.date_of_birth });
            } else {
                setErrors(errData);
            }
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
                heading="Create Account"
                subheading="Join us to book amazing movies"
            >
                <Stack gap={theme.spacing(6)} textAlign={'center'}>
                    <Form
                        errors={errors}
                        handleSubmit={handleSubmit}
                        inputs={SignupInputConfig}
                        button="Sign up"
                        isLoading={isLoading}
                        defaultValues={defaultValues}
                    />
                    <Typography variant="subtitle1" color="text.secondary">
                        Already have and account?
                        <NavLink to={ROUTE.LOGIN}>Login</NavLink>
                    </Typography>
                </Stack>
            </AuthCard>
        </Stack>
    );
};
