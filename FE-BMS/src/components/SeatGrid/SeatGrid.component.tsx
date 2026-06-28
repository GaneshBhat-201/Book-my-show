import { Box, Button, Stack, Typography } from '@mui/material';

import { SeatDataType } from '@services';

import { SeatGridProps } from './SeatGrid.types';

/**
 * This component display the seat layout
 * @param seats - Data which consist of rows, seat per rows and status
 * @param selectedSeats - Seats selected by user
 * @param setSelectedSeats - Function to handle selection of seats
 */
export const SeatGrid = ({
    seats,
    selectedSeats,
    setSelectedSeats,
}: SeatGridProps) => {
    /** Functions */
    /**
     * Function that take row index and convert it into labels
     */
    const getRowLabel = (index: number) => String.fromCharCode(65 + index);

    /**
     * Function that seat number and format it
     */
    const formattedSeatNumber = (seat: number) => String(seat).padStart(2, '0');

    /**
     * Function that takes seat consisting of row number and seat number, and convert it into string type key
     */
    const getSeatKey = (seat: SeatDataType) =>
        `${seat.row_number}-${seat.seat_number}`;

    /**
     * Function that check if seat is selected or not and based on this styles applied
     */
    const isSelected = (seat: SeatDataType) =>
        selectedSeats.has(getSeatKey(seat));

    /**
     * Function to handle selection of seats
     */
    const handleSelect = (seat: SeatDataType) => {
        setSelectedSeats((prev) => {
            const newSet = new Set(prev);
            const seatId = getSeatKey(seat);

            if (newSet.has(seatId)) {
                newSet.delete(seatId);
            } else {
                newSet.add(seatId);
            }
            return newSet;
        });
    };

    return (
        <Stack gap={2} direction="column-reverse" overflow="auto">
            {seats.map((row, rowIndex) => (
                <Box key={rowIndex} display="flex" alignItems="center" gap={10}>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height={25}
                        width={25}
                        flexShrink={0}
                    >
                        <Typography variant="caption" lineHeight={1}>
                            {getRowLabel(rowIndex)}
                        </Typography>
                    </Box>
                    <Box display="flex" gap={2}>
                        {row.map((seat, colIndex) => {
                            const currentSeat = {
                                row_number: rowIndex + 1,
                                seat_number: colIndex + 1,
                            };

                            return (
                                <Button
                                    key={colIndex}
                                    sx={{ minWidth: 0, width: 25, height: 25 }}
                                    variant={
                                        seat && !isSelected(currentSeat)
                                            ? 'outlined'
                                            : 'contained'
                                    }
                                    color={
                                        isSelected(currentSeat)
                                            ? 'success'
                                            : 'primary'
                                    }
                                    disabled={!seat}
                                    onClick={() =>
                                        seat && handleSelect(currentSeat)
                                    }
                                >
                                    <Typography
                                        variant="caption"
                                        lineHeight={1}
                                    >
                                        {formattedSeatNumber(colIndex + 1)}
                                    </Typography>
                                </Button>
                            );
                        })}
                    </Box>
                </Box>
            ))}
        </Stack>
    );
};
