import { MovieResponseData } from 'services/Movie';

/**
 * Type of the param which need to be passed cinema api
 */
export type CinemaApiParamType = {
    city: string;
};

/**
 * Type of the cinema data
 */
export type CinemaType = {
    /**
     * Unique identifier of the cinema
     */
    id: number;
    /**
     * Location of the cinema
     */
    location: string;
    /**
     * Name of the cinema
     */
    name: string;
    /**
     * Rows in particular cinema
     */
    rows: number;
    /**
     * Seat per row in particular cinema
     */
    seats_per_row: number;
};

/**
 * Type of the response we get from cinema list api
 */
export type CinemaListApiResponse = CinemaType[];

/**
 * Data type of the slot data
 */
export type SlotDataType = {
    /**
     * Unique identifier of the slot
     */
    id: number;
    /**
     * Date and time of the slot
     */
    date_time: string;
    /**
     * Price of the particular slot
     */
    price: string;
};

/**
 * Type of the movie details which come with cinema details
 */
export type MovieDataType = Pick<
    MovieResponseData,
    'name' | 'poster_url' | 'genres' | 'languages' | 'id'
> & {
    /**
     * Slots array which includes different slot details
     */
    slots: SlotDataType[];
};

/**
 * Type of the response from cinema details api
 */
export type CinemaDetailsApiResponse = Pick<CinemaType, 'name' | 'location'> & {
    /**
     * Movies in particular cinema
     */
    movies: MovieDataType[];
};
