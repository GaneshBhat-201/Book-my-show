import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

/**
 * Type guard to check if an error is a FetchBaseQueryError
 */
export const isFetchBaseQueryError = (
    error: unknown,
): error is FetchBaseQueryError =>
    typeof error === 'object' && error !== null && 'status' in error;
