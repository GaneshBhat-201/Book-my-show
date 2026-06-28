import { useNavigate, useParams } from 'react-router-dom';

import {
    Box,
    Breadcrumbs,
    Button,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';

import MoviePlaceholder from '@assets/images/movie-placeholder.webp';
import { ERROR_STATUS } from '@constant';
import { ROUTES } from '@constant';
import { useMovieDetailsQuery } from '@services';
import { formatDate, formatDuration, isFetchBaseQueryError } from '@utils';

import { StyledBanner, StyledPoster } from './MovieDetails.styles';
import { MovieDetailsSkeleton } from './MovieDetailsSkeleton';

/**
 * Container represent the details of the movie.
 */
export const MovieDetailsContainer = () => {
    /** Hooks */
    const { id = '' } = useParams();
    const { palette } = useTheme();
    const navigate = useNavigate();
    const { data, isLoading, isError, error, refetch } = useMovieDetailsQuery(
        id,
        {
            skip: !id,
        },
    );

    /** Functions */
    /**
     * This function handle navigation when clicking the card
     */
    const handleNavigation = () => {
        void navigate(`${ROUTES.MOVIE_SHOWTIME}/${id}`);
    };

    /** Constants */
    const formattedGenres = data?.genres
        ?.map((genre) => genre.genre_name)
        .join(', ');
    const formattedLanguages = data?.languages
        ?.map((language) => language.lang_name)
        .join(', ');

    /** Loading state */
    if (isLoading) {
        return <MovieDetailsSkeleton />;
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
                    Failed to load movie details. Please try again.
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

    return (
        <Stack flex={1} py={4} gap={5}>
            <Stack gap={8}>
                <StyledBanner>
                    <StyledPoster
                        src={data.poster_url || MoviePlaceholder}
                        alt={data.name}
                        loading="lazy"
                    />
                    <Stack flex={1} gap={2}>
                        <Typography variant="h2">{data.name}</Typography>
                        <Breadcrumbs
                            separator="•"
                            sx={{ color: palette.text.primary }}
                        >
                            <Typography variant="h4">
                                {formatDuration(data.duration)}
                            </Typography>
                            <Typography variant="h4">
                                {formattedGenres}
                            </Typography>
                            <Typography variant="h4">
                                {formatDate({
                                    date: data.release_date || '',
                                    options: { year: 'numeric' },
                                })}
                            </Typography>
                        </Breadcrumbs>
                        <Typography variant="h4">
                            {formattedLanguages}
                        </Typography>

                        <Button
                            variant="contained"
                            size="large"
                            sx={{ width: 200, mt: 5 }}
                            onClick={handleNavigation}
                        >
                            Book tickets
                        </Button>
                    </Stack>
                </StyledBanner>
                <Box
                    display="flex"
                    flexDirection="column"
                    gap={4}
                    px={4}
                    maxWidth="lg"
                >
                    <Typography variant="h3">About the movie</Typography>
                    <Typography
                        variant="body1"
                        letterSpacing={0.5}
                        whiteSpace="pre-line"
                    >
                        {data.description}
                    </Typography>
                </Box>
            </Stack>
        </Stack>
    );
};
