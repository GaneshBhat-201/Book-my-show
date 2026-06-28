import type { ApiError, User } from '@types';

/**
 * Represent the request data type for register API
 */
export type RegisterApiRequestType = Omit<User, 'id'> & {
    password: string;
    confirm_password: string;
};

/**
 * Represent the request data type for Login API
 */
export type LoginRequestType = Pick<User, 'email'> & {
    password: string;
};

/**
 * Represent the response type of the login and register API
 */
export type AuthApiResponseType = {
    /**
     * User object contains the details of user
     */
    user: User;
    /**
     * Access token
     */
    access: string;
};

/**
 * Represent the error data of the login and register API
 */
export type AuthApiErrorData = {
    email?: string[];
    phone?: string[];
    password?: string[];
    message?: string[];
};

/**
 * Represent the error type for auth API
 */
export type AuthApiErrorType = ApiError<AuthApiErrorData>;

/**
 * Represent the response type for refresh token API
 */
export type RefreshApiResponseType = Pick<AuthApiResponseType, 'access'>;

export type ProfileErrorData = {
    detail?: string;
};

export type ProfileApiErrorType = ApiError<ProfileErrorData>;
