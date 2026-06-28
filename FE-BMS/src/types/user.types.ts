/**
 * Represent the user details object
 */
export type User = {
    /**
     * Unique identifier for the user
     */
    id: number;
    /**
     * Avatar of the user
     */
    avatar?: string;
    /**
     * Name of the user
     */
    name: string;
    /**
     * Email of the user
     */
    email: string;
    /**
     * Phone number of the user
     */
    phone_number: string;
};
