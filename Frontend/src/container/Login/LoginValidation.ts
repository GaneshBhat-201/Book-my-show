import { LoginFormErrorType, LoginFormValues } from './Login.types';

/**
 * Validator function for login form
 * @param {Object} form  - form values that has to be validated
 */
export const validate = (form: LoginFormValues) => {
    const newErrors: LoginFormErrorType = {};

    if (!form.email.trim()) {
        newErrors.email = [];
        newErrors.email?.push('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        newErrors.email = [];
        newErrors.email?.push('Invalid email address');
    }
    if (!form.password.trim()) {
        newErrors.password = [];
        newErrors.password?.push('Password is required');
    }

    return newErrors;
};
