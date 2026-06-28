export type PaginatedResponse<T> = {
    next: string | null;
    previous: string | null;
    results: T[];
};
