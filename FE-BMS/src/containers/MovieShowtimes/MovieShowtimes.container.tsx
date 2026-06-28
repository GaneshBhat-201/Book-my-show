import { useNavigate, useParams } from 'react-router-dom';

import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Stack,
    Typography,
} from '@mui/material';

import { MovieSlot } from '@components';
import { ERROR_STATUS, ROUTES } from '@constant';
import { useMovieShowtimesQuery } from '@services';
import { formatDuration, isFetchBaseQueryError } from '@utils';

import { MovieShowtimeSkeleton } from './MovieShowtimesSkeleton';

/**
 * Container used to display slots per cinema for a particular movie
 */
export const MovieShowtimesContainer = () => {
    /** Hooks */
    const { id = '' } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, isError, error, refetch } = useMovieShowtimesQuery(
        id,
        {
            skip: !id,
        },
    );

    if (isLoading) {
        return <MovieShowtimeSkeleton />;
    }

    /** Error state */
    if (
        isError &&
        isFetchBaseQueryError(error) &&
        error.status !== ERROR_STATUS.NOT_FOUND
    ) {
        return (
            <Stack flex={1} gap={2} justifyContent="center" alignItems="center">
                <Typography variant="h4" color="error" textAlign="center">
                    Failed to load slot details. Please try again.
                </Typography>
                <Button variant="contained" onClick={() => refetch()}>
                    Retry
                </Button>
            </Stack>
        );
    }

    /** Empty state */
    if (
        !data ||
        (isError &&
            isFetchBaseQueryError(error) &&
            error.status === ERROR_STATUS.NOT_FOUND)
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
                <Typography variant="h2">Movie Not Found</Typography>
                <Typography variant="h4" color="textSecondary">
                    We could not find the movie you are looking for.
                </Typography>
            </Stack>
        );
    }

    /** Functions */
    /**
     * This function handle navigation when clicking the slots
     */
    const handleNavigation = (slotId: number) => {
        void navigate(
            `${ROUTES.BOOKING}/${encodeURIComponent(data?.name ?? '')}/${slotId}`,
        );
    };

    return (
        <Stack flex={1} py={4} gap={6}>
            <Stack gap={6}>
                <Card>
                    <CardContent>
                        <Stack gap={4}>
                            <Typography variant="h2">{data?.name}</Typography>
                            <Box display="flex" gap={2} flexWrap="wrap">
                                <Chip
                                    label={`Movie runtime: ${formatDuration(data?.duration)}`}
                                />
                                {data?.genres.map((genre) => (
                                    <Chip
                                        key={genre.id}
                                        label={genre.genre_name}
                                    />
                                ))}
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>
                <Stack gap={2}>
                    <Typography variant="h2">Shows</Typography>
                    {data.cinemas.length === 0 && (
                        <Stack
                            flex={1}
                            justifyContent="center"
                            alignItems="center"
                            gap={2}
                            p={4}
                            textAlign="center"
                        >
                            <Typography variant="h4" color="textSecondary">
                                Oops! No shows available
                            </Typography>
                        </Stack>
                    )}

                    {data.cinemas.length > 0 && (
                        <Stack gap={4}>
                            {data.cinemas.map((cinema) => (
                                <MovieSlot
                                    key={cinema.id}
                                    title={cinema.name}
                                    subtitle={cinema.location}
                                    slots={cinema.slots}
                                    navigation={handleNavigation}
                                />
                            ))}
                        </Stack>
                    )}
                </Stack>
            </Stack>
        </Stack>
    );
};
