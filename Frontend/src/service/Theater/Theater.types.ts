import { Slot } from 'service/Movie/Movie.types';

export type Theater = {
    id: number;
    name: string;
    city: string;
    state: string;
    rows: number;
    seats_per_row: number;
    slots?: Record<string, Slot[]>;
};

export type TheaterRequest = {
    cursor?: string | null;
    city?: number[];
};

export type TheaterRetrieveRequest = {
    date?: string;
    slug: string;
};
