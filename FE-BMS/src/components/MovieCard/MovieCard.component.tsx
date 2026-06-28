import { useNavigate } from 'react-router-dom';

import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Chip,
    Stack,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';

import MoviePlaceholder from '@assets/images/movie-placeholder.webp';
import { MOVIE_CARD_POSTER_HEIGHT, MOVIE_CARD_WIDTH, ROUTES } from '@constant';

import { MovieCardProps } from './MovieCard.types';

/**
 * This component is used to display the movies details in a card
 *
 * @param movie - Movie data object containing name, languages and genres
 */
export const MovieCard = ({ movie }: { movie: MovieCardProps }) => {
    /** Hooks */
    const { palette } = useTheme();
    const navigate = useNavigate();

    /** Functions */
    /**
     * This function handle navigation when clicking the card
     */
    const handleNavigation = () => {
        void navigate(`${ROUTES.MOVIES}/${movie.id}`);
    };

    /** Constants */
    const languages = movie.languages;
    const genres = movie.genres;

    return (
        <Card sx={{ width: MOVIE_CARD_WIDTH, borderRadius: 3 }}>
            <CardActionArea onClick={handleNavigation}>
                <CardMedia
                    component="img"
                    height={MOVIE_CARD_POSTER_HEIGHT}
                    src={movie.poster_url || MoviePlaceholder}
                    alt={movie.name}
                    loading="lazy"
                    sx={{ background: palette.text.secondary }}
                />
                <CardContent>
                    <Stack spacing={3}>
                        <Tooltip title={movie.name}>
                            <Typography
                                gutterBottom
                                variant="h4"
                                component="div"
                                noWrap
                            >
                                {movie.name}
                            </Typography>
                        </Tooltip>

                        <Stack flexDirection="row" gap={1}>
                            {genres.slice(0, 2).map((item) => (
                                <Chip
                                    color="primary"
                                    key={item.id}
                                    label={item.genre_name}
                                    size="small"
                                    variant="outlined"
                                />
                            ))}

                            {genres.length > 2 && (
                                <Chip
                                    color="primary"
                                    label={`+${genres.length - 2} More`}
                                    size="small"
                                    variant="outlined"
                                />
                            )}
                        </Stack>

                        <Typography
                            variant="body2"
                            color="textSecondary"
                            noWrap
                        >
                            {languages.map((item) => item.lang_name).join(', ')}
                        </Typography>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
