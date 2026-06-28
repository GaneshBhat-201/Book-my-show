export type SignupFormValues = {
    name: string;
    email: string;
    password: string;
    gender: string;
    dob: string;
    confirmPassword: string;
};

export type SignupFormErrorValues = {
    name: string;
    email: string;
    password: string;
    gender: string;
    date_of_birth: string;
};

export type SignupFormErrorType = Partial<
    Record<keyof SignupFormValues, string[]>
>;

export type SignupFormServerErrorType = Partial<
    Record<keyof SignupFormErrorValues, string[]>
>;
