import { useNavigate, useParams } from 'react-router-dom';

import { LocationOn } from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    Typography,
} from '@mui/material';

import { MovieSlot } from '@components';
import { ERROR_STATUS, ROUTES } from '@constant';
import { useCinemaDetailsQuery } from '@services';
import { isFetchBaseQueryError } from '@utils';

import { CinemaDetailsSkeleton } from './CinemaDetailsSkeleton';

/**
 * Container display cinema details with slot details
 */
export const CinemaDetailsContainer = () => {
    /** Hooks */
    const { id = '' } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, isError, error, refetch } = useCinemaDetailsQuery(
        id,
        {
            skip: !id,
        },
    );

    /** Loading state  */
    if (isLoading && !data) {
        return <CinemaDetailsSkeleton />;
    }

    /** Error state */
    if (
        isError &&
        isFetchBaseQueryError(error) &&
        error.status !== ERROR_STATUS.NOT_FOUND
    ) {
        return (
            <Stack flex={1} gap={2} justifyContent="center" alignItems="center">
                <Typography variant="h2" color="error" textAlign="center">
                    Failed to load cinema details. Please try again.
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
                <Typography variant="h2">Cinema Not Found</Typography>
                <Typography variant="h4" color="textSecondary">
                    We could not find the cinema you are looking for.
                </Typography>
            </Stack>
        );
    }

    return (
        <Stack flex={1} py={4} gap={5}>
            <Stack py={4} gap={6}>
                <Card>
                    <CardContent>
                        <Stack gap={3}>
                            <Typography variant="h2">{data.name}</Typography>
                            <Box display="flex" gap={2}>
                                <LocationOn />
                                <Typography variant="h4">
                                    {data.location}
                                </Typography>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>

                <Stack gap={2}>
                    <Typography variant="h2">Shows</Typography>

                    {data.movies.length === 0 && (
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

                    {data.movies.map((movie) => {
                        /**
                         * This function handle navigation when clicking the slots
                         */
                        const handleNavigation = (slotId: number) => {
                            void navigate(
                                `${ROUTES.BOOKING}/${movie?.name}/${slotId}`,
                            );
                        };

                        return (
                            <MovieSlot
                                key={movie.id}
                                title={movie.name}
                                subtitle={movie.languages
                                    .map((lang) => lang.lang_name)
                                    .join(', ')}
                                slots={movie.slots}
                                navigation={handleNavigation}
                            />
                        );
                    })}
                </Stack>
            </Stack>
        </Stack>
    );
};
