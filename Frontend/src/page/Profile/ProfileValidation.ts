import { ProfileEditForm, ProfileFormErrorType } from './Profile.types';

/**
 * Validator function for profile form
 * @param {Object} form  - form values that has to be validated
 */
export const validate = (form: ProfileEditForm) => {
    const newErrors: ProfileFormErrorType = {};

    if (!form.name.trim()) {
        newErrors.name = [];
        newErrors.name?.push('Full name is required');
    }

    if (!form.gender) {
        newErrors.gender = [];
        newErrors.gender?.push('Please select gender');
    }

    if (!form.dob) {
        newErrors.dob = [];
        newErrors.dob?.push('Date of birth is required');
    }

    if (
        (form.phoneNumber.length > 0 && form.phoneNumber.length < 10) ||
        form.phoneNumber.length > 10
    ) {
        newErrors.phoneNumber = [];
        newErrors.phoneNumber.push('Enter valid phone number');
    }

    return newErrors;
};
