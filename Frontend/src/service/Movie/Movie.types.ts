export type Slot = {
    id: number;
    language: string;
    start_time: string;
    end_time: string;
    price: string;
};

export type Movie = {
    id: number;
    title: string;
    description: string;
    duration: string;
    poster: string;
    genre: string[];
    language: string[];
    slots?: Record<string, Slot[]>;
};

export type MovieQueryParams = {
    cursor?: string | null;
    genre?: number[];
    language?: number[];
    date?: string | null;
};

export type MovieRetrieveRequest = {
    date?: string;
    slug: string;
};
