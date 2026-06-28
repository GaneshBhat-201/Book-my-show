import { ApiError } from '@types';

/**
 * Response type of the slot details API
 */
export type SlotDetailsApiResponseType = {
    /**
     * Unique identifier of the slot
     */
    id: number;
    /**
     * Name of the movie to be displayed in that slot
     */
    movie: string;
    /**
     * Name of the cinema that belongs to the slot
     */
    cinema: string;
    /**
     * Date and time of the slot
     */
    date_time: string;
    /**
     * Price of the slot
     */
    price: string;
};

/**
 * Response type of the api to fetch seats
 */
export type SeatApiResponseType = {
    /**
     * Rows available in the cinema
     */
    rows: number;
    /**
     * Number of seats available per row
     */
    seats_per_row: number;
    /**
     * Array consist of seats with status
     */
    seats: boolean[][];
};

/**
 * Type of the seat data
 */
export type SeatDataType = {
    /**
     * Row number of the seat
     */
    row_number: number;
    /**
     * Column number of seat in particular row
     */
    seat_number: number;
};

/**
 * Type of the request body for the ticket booking API
 */
export type BookingApiRequestType = {
    /**
     * Id of the slot
     */
    slot: number;
    /**
     * Seats selected for booking
     */
    seats: SeatDataType[];
};

/**
 * Response type get from booking API
 */
export type BookingApiResponseType = BookingApiRequestType & {
    /**
     * Movie of the slot
     */
    movie: string;
    /**
     * Cinema of the slot
     */
    cinema: string;
};

/**
 * Error data type of the booking API
 */
export type BookingErrorData = {
    /**
     * Message get in the error
     */
    detail?: string;
};

/**
 * API error type of the booking API
 */
export type BookingApiErrorType = ApiError<BookingErrorData>;
