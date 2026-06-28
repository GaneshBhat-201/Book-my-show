import { ChangeEvent, useEffect, useRef, useState } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {
    Box,
    Grid2,
    SelectChangeEvent,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';

import { Card, MovieCardSkeleton } from '@component/Card';
import { Filter, FilterOptions } from '@component/Filter';
import { PAGE_SIZE, ROUTE } from '@constant';
import { useMovieFilter } from '@hooks';
import { useMovieListQuery } from '@service';
import { extractCursor, hmsToMinutes, urlify } from '@utils';

import { NavLinkStyled } from './MovieList.styles';
import { FilterCount, MovieFilters } from './MovieList.types';

export const MovieList = () => {
    const {
        genres,
        updateFilters,
        languages,
        appliedFilters,
        clearAllFilters,
    } = useMovieFilter();
    const [cursor, setCursor] = useState<string | undefined>(undefined);
    const [filters, setFilters] = useState<MovieFilters>({
        language: appliedFilters.languages.map(String),
        genre: appliedFilters.genres.map(String),
        date: appliedFilters.date || '',
    });

    const [count, setCount] = useState<FilterCount>({
        genre: appliedFilters.genres.length,
        language: appliedFilters.languages.length,
    });

    const { data, isFetching } = useMovieListQuery({
        cursor,
        language: Boolean(filters.language?.length)
            ? filters.language?.map(Number)
            : appliedFilters.languages,
        genre: Boolean(filters.genre?.length)
            ? filters.genre?.map(Number)
            : appliedFilters.genres,
        date: Boolean(filters.date?.length)
            ? filters.date
            : appliedFilters.date,
    });
    const movies = data?.results || [];
    const nextCursor = data?.next;
    const theme = useTheme();
    const hasInteracted = useRef(false);

    useEffect(() => {
        setFilters({
            genre: appliedFilters.genres.map(String),
            language: appliedFilters.languages.map(String),
            date: appliedFilters.date || '',
        });
        setCount({
            genre: appliedFilters.genres.length,
            language: appliedFilters.languages.length,
        });

        hasInteracted.current = false;
    }, [appliedFilters]);

    useEffect(() => {
        if (!hasInteracted.current) {
            return;
        }

        updateFilters(
            filters.genre.map(Number),
            filters.language.map(Number),
            filters.date || '',
        );
    }, [filters, updateFilters]);

    /**
     * Function that specifies how to handle when filter select component has change event
     */
    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { name, value },
        } = event;
        const result = typeof value === 'string' ? value.split(',') : value;
        setFilters((prev) => ({ ...prev, [name]: result }));
        const fieldName = name as keyof typeof count;
        setCount({ ...count, [fieldName]: result.length });
        hasInteracted.current = true;
    };

    /**
     * Function that specifies how to handle when filter input component has change event
     */
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        hasInteracted.current = true;
    };

    /**
     * Function that has to be executed when clear button is clicked
     */
    const handleClear = () => {
        clearAllFilters();
        setCount({ genre: 0, language: 0 });
        setFilters({ date: '', genre: [], language: [] });
    };

    const fetchMore = () => {
        if (!nextCursor || isFetching) return;
        setCursor(extractCursor(nextCursor) || undefined);
    };

    const MovieFilterConfig: FilterOptions<MovieFilters>[] = [
        {
            name: 'genre',
            label: 'Genre',
            type: 'select',
            options: genres,
        },
        {
            name: 'language',
            label: 'Language',
            type: 'select',
            options: languages,
        },
        {
            name: 'date',
            label: 'Date',
            type: 'date',
        },
    ];

    return (
        <Stack
            gap={theme.spacing(5)}
            maxWidth={theme.typography.pxToRem(1216)}
            width={'100%'}
        >
            <Filter
                filters={filters}
                filterOptions={MovieFilterConfig}
                handleChange={handleChange}
                handleInputChange={handleInputChange}
                count={count}
                handleClear={handleClear}
            />
            <Typography variant="h2">All Movies</Typography>
            <Box
                id="scrolldiv"
                sx={{
                    height: '100vh',
                    overflow: 'auto',
                    scrollbarWidth: 'none',
                }}
            >
                <InfiniteScroll
                    dataLength={movies.length}
                    next={fetchMore}
                    hasMore={Boolean(nextCursor) && !isFetching}
                    loader={null}
                    scrollableTarget="scrolldiv"
                >
                    <Grid2
                        container
                        spacing={theme.spacing(4)}
                        columns={{ xs: 2, sm: 4, md: 5 }}
                    >
                        {movies?.map((movie) => (
                            <Grid2
                                key={movie.id}
                                size={{ xs: 1, sm: 1, md: 1 }}
                            >
                                <NavLinkStyled
                                    to={urlify(`${ROUTE.MOVIE}/${movie.title}`)}
                                >
                                    <Card
                                        title={movie.title}
                                        poster={movie.poster}
                                    >
                                        <Stack
                                            direction={'row'}
                                            gap={theme.spacing(1)}
                                            color="text.secondary"
                                            alignItems={'center'}
                                        >
                                            <AccessTimeIcon
                                                sx={{
                                                    fontSize:
                                                        theme.typography.pxToRem(
                                                            12,
                                                        ),
                                                }}
                                            />
                                            <Typography
                                                variant="subtitle2"
                                                color="text.secondary"
                                            >
                                                {hmsToMinutes(movie.duration)}{' '}
                                            </Typography>
                                        </Stack>
                                        <Typography
                                            variant="subtitle2"
                                            color="text.secondary"
                                            sx={theme.mixins.lineClamp(1)}
                                        >
                                            Language -{' '}
                                            {movie.language.join(', ')}
                                        </Typography>
                                        <Typography
                                            variant="subtitle2"
                                            color="text.secondary"
                                            sx={theme.mixins.lineClamp(1)}
                                        >
                                            Genre - {movie.genre.join(', ')}
                                        </Typography>
                                    </Card>
                                </NavLinkStyled>
                            </Grid2>
                        ))}
                        {isFetching &&
                            Array.from({ length: PAGE_SIZE }).map((_, i) => (
                                <Grid2 key={i} size={{ xs: 1, sm: 1, md: 1 }}>
                                    <MovieCardSkeleton />
                                </Grid2>
                            ))}
                    </Grid2>
                    {data?.results.length === 0 ? (
                        <Box textAlign={'center'} sx={{ padding: 8 }}>
                            <Typography variant="h2" component="p">
                                No movies found
                            </Typography>
                        </Box>
                    ) : null}
                </InfiniteScroll>
            </Box>
        </Stack>
    );
};
