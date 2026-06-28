import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { ArrowBack } from '@mui/icons-material';
import {
    Box,
    Breadcrumbs,
    Button,
    IconButton,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';

import { SeatGrid, SeatsLegend } from '@components';
import { ERROR_STATUS, NOTIFICATIONS, POLLING_INTERVAL } from '@constant';
import { showSnackbar } from '@features';
import {
    BookingApiErrorType,
    useBookingMutation,
    useSeatsQuery,
    useSlotDetailsQuery,
} from '@services';
import {
    formatAmount,
    formatDate,
    formatTime,
    isFetchBaseQueryError,
} from '@utils';

import { BookingSkeleton, SeatGridSkeleton } from './Booking.skeleton';

/**
 * This container display the details about the slot and seat layout.
 * It also provide functionality for ticket booking.
 */
export const BookingContainer = () => {
    /** States */
    const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());

    /** Hooks */
    const { id = '' } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { breakpoints, palette } = useTheme();
    const isSmAndUp = useMediaQuery(breakpoints.up('sm'));
    const {
        data: slotDetails,
        isLoading: slotDetailsLoading,
        isError: isSlotDetailsError,
        error: slotDetailsError,
        refetch: slotDetailRefetch,
    } = useSlotDetailsQuery(id, {
        skip: !id,
    });
    const {
        data: seatsData,
        isLoading: seatsDataLoading,
        isError: isSeatsDataError,
        refetch: seatsDataRefetch,
    } = useSeatsQuery(id, {
        skip: !id,
        pollingInterval: POLLING_INTERVAL,
        skipPollingIfUnfocused: true,
    });
    const [booking, { isLoading: ticketBookingLoading }] = useBookingMutation();

    /** Functions */
    /**
     * Function to handle ticket booking,
     *
     * Trigger booking api and show success messages
     */
    const handleBooking = async () => {
        const seats = Array.from(selectedSeats).map((item) => {
            const [row, seat] = item.split('-');

            return {
                row_number: Number(row),
                seat_number: Number(seat),
            };
        });

        const payload = {
            slot: Number(id),
            seats: seats,
        };

        try {
            await booking(payload).unwrap();
            dispatch(
                showSnackbar({
                    message: NOTIFICATIONS.BOOKING_SUCCESS,
                    severity: 'success',
                }),
            );
        } catch (error: unknown) {
            const err = error as BookingApiErrorType;

            if (err.status === ERROR_STATUS.FORBIDDEN) {
                dispatch(
                    showSnackbar({
                        message: err?.data?.detail || NOTIFICATIONS.ERROR,
                        severity: 'error',
                    }),
                );
            } else if (err?.status === ERROR_STATUS.BAD_REQUEST) {
                dispatch(
                    showSnackbar({
                        message: NOTIFICATIONS.BOOKING_ERROR,
                        severity: 'error',
                    }),
                );
            } else {
                dispatch(
                    showSnackbar({
                        message: NOTIFICATIONS.ERROR,
                        severity: 'error',
                    }),
                );
            }
        } finally {
            setSelectedSeats(new Set());
        }
    };

    if (slotDetailsLoading) {
        return <BookingSkeleton />;
    }

    /** Error state */
    if (
        isSlotDetailsError &&
        isFetchBaseQueryError(slotDetailsError) &&
        slotDetailsError.status !== ERROR_STATUS.NOT_FOUND
    ) {
        return (
            <Stack flex={1} gap={2} justifyContent="center" alignItems="center">
                <Typography variant="h4" color="error" textAlign="center">
                    Failed to load slot details. Please try again.
                </Typography>
                <Button variant="contained" onClick={() => slotDetailRefetch()}>
                    Retry
                </Button>
            </Stack>
        );
    }

    /** Empty state */
    if (
        !slotDetails ||
        (isSlotDetailsError &&
            isFetchBaseQueryError(slotDetailsError) &&
            slotDetailsError.status === ERROR_STATUS.NOT_FOUND)
    ) {
        return (
            <Stack
                flex={1}
                justifyContent="center"
                alignItems="center"
                gap={2}
                p={4}
                textAlign="center"
            >
                <Typography variant="h2">Slot Not Found</Typography>
                <Typography variant="h4" color="textSecondary">
                    We could not find the slot you are looking for.
                </Typography>
            </Stack>
        );
    }

    return (
        <Stack flex={1} gap={10} py={8}>
            <Box
                display="flex"
                alignItems="center"
                gap={{ xs: 4, sm: 10 }}
                sx={{ cursor: 'pointer' }}
            >
                <IconButton aria-label="Go back" onClick={() => navigate(-1)}>
                    <ArrowBack />
                </IconButton>
                <Stack>
                    <Typography variant={isSmAndUp ? 'h2' : 'h3'}>
                        {slotDetails.movie}
                    </Typography>
                    <Breadcrumbs separator="|">
                        <Typography
                            variant={isSmAndUp ? 'h4' : 'h5'}
                            color="textSecondary"
                        >
                            {slotDetails.cinema}
                        </Typography>
                        <Typography
                            variant={isSmAndUp ? 'h4' : 'h5'}
                            color="textSecondary"
                        >
                            {formatDate({
                                date: slotDetails.date_time,
                                options: { weekday: 'short' },
                            })}
                        </Typography>
                        <Typography
                            variant={isSmAndUp ? 'h4' : 'h5'}
                            color="textSecondary"
                        >
                            {formatTime(slotDetails.date_time)}
                        </Typography>
                    </Breadcrumbs>
                </Stack>
            </Box>

            {seatsDataLoading && <SeatGridSkeleton />}

            {isSeatsDataError && (
                <Stack
                    flex={1}
                    gap={2}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography variant="h4" color="error" textAlign="center">
                        Failed to load seats in this slot.
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => seatsDataRefetch()}
                    >
                        Retry
                    </Button>
                </Stack>
            )}

            {seatsData && (
                <>
                    {/* <Stack alignItems="center" width='100%'> */}
                    <Stack overflow="auto">
                        <Box mx="auto">
                            {seatsData && (
                                <SeatGrid
                                    seats={seatsData?.seats}
                                    selectedSeats={selectedSeats}
                                    setSelectedSeats={setSelectedSeats}
                                />
                            )}
                        </Box>
                    </Stack>

                    <Stack alignItems="center">
                        <Box
                            width="100%"
                            maxWidth={300}
                            height={20}
                            sx={{
                                backgroundColor: palette.text.secondary,
                                borderRadius: '50% 50% 0 0',
                                boxShadow: '0px 10px 10px -5px black',
                                my: 6,
                            }}
                        />
                        <Typography
                            variant="caption"
                            sx={{ mb: 4, color: 'text.secondary' }}
                        >
                            SCREEN
                        </Typography>
                    </Stack>

                    <SeatsLegend />
                    <Stack alignSelf="center" width="fit-content" gap={1}>
                        {selectedSeats.size > 0 && (
                            <Typography variant="body2" color="textSecondary">
                                Total:{' '}
                                {formatAmount(
                                    selectedSeats.size *
                                        Number(slotDetails.price ?? 0),
                                )}
                            </Typography>
                        )}
                        <Button
                            variant="contained"
                            size="large"
                            sx={{ width: 280, alignSelf: 'center' }}
                            onClick={handleBooking}
                            disabled={selectedSeats.size === 0}
                            loading={ticketBookingLoading}
                        >
                            {selectedSeats.size === 0
                                ? 'Select seats to continue'
                                : `Proceed to Pay`}
                        </Button>
                    </Stack>
                </>
            )}
        </Stack>
    );
};
