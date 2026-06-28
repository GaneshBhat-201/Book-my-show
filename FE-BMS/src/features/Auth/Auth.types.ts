import { User } from '@types';

/**
 * Represent the authentication state of the user
 */
export type AuthSlice = {
    /**
     * Used to store access token
     */
    token: string | null;
    /**
     * Indicate whether the user is authenticated or not
     */
    isAuthenticated: boolean;
    /**
     * Used to store user details
     */
    user: User | null;
};
