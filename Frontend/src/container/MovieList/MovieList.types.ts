export type MovieFilters = {
    genre: string[];
    language: string[];
    date: string | null;
};

export type FilterCount = {
    genre: number;
    language: number;
};
