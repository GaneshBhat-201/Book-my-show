export type LoginFormValues = {
    email: string;
    password: string;
};

export type LoginFormErrorType = Partial<
    Record<keyof LoginFormValues, string[]>
>;

export type LoginApiErrorType = {
    error: string;
};
