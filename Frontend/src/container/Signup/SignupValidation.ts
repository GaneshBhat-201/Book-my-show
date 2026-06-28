import { SignupFormErrorType, SignupFormValues } from './Signup.types';

/**
 * Validator function for login form
 * @param {Object} form  - form values that has to be validated
 */
export const validate = (form: SignupFormValues) => {
    const newErrors: SignupFormErrorType = {};

    if (!form.name.trim()) {
        newErrors.name = [];
        newErrors.name?.push('Full name is required');
    }

    if (!form.email) {
        newErrors.email = [];
        newErrors.email?.push('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        newErrors.email = [];
        newErrors.email?.push('Invalid email address');
    }

    if (!form.password) {
        newErrors.password = [];
        newErrors.password?.push('Password is required');
    } else if (form.password.length < 8) {
        newErrors.password = [];
        newErrors.password?.push('Password must be atleast 8 characters');
    } else if (/^\d+$/.test(form.password)) {
        newErrors.password = [];
        newErrors.password?.push('Password cannot be only numbers');
    } else if (/^[a-zA-Z]+$/.test(form.password)) {
        newErrors.password = [];
        newErrors.password?.push('Password cannot be only letters');
    }

    if (form.password != form.confirmPassword) {
        newErrors.password = [];
        newErrors.password?.push('Password and confirm should be same');
        newErrors.confirmPassword = [];
        newErrors.confirmPassword?.push('Password and confirm should be same');
    }

    if (!form.gender) {
        newErrors.gender = [];
        newErrors.gender?.push('Please select gender');
    }

    if (!form.dob) {
        newErrors.dob = [];
        newErrors.dob?.push('Date of birth is required');
    }

    return newErrors;
};
