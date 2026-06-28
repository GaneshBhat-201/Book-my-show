/**
 * Represent the generic API error type
 */
export type ApiError<T> = {
    /**
     * Data which get when error occurs
     */
    data: T;
    /**
     * Status code of the error occurred
     */
    status: number;
};
