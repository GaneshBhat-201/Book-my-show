import { Dispatch, SetStateAction } from 'react';

/**
 * Props type of the seat grid component
 */
export interface SeatGridProps {
    /**
     * Seats which need to be displayed. 2D array where each boolean indicates
     * seat availability: `true` = available for selection, `false` = sold/unavailable.
     */
    seats: boolean[][];
    /**
     * Seat selected by user
     */
    selectedSeats: Set<string>;
    /**
     * Function that handle selection of seats
     */
    setSelectedSeats: Dispatch<SetStateAction<Set<string>>>;
}
