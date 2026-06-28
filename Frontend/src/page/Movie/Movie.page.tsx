import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { useParams } from 'react-router';

import { Box, Skeleton, Stack, Typography, useTheme } from '@mui/material';

import { CarouselCard } from '@component/CarouselCard';
import { Filter } from '@component/Filter';
import { Slot } from '@component/Slot';
import { useMovieFilter } from '@hooks';
import { useMovieRetrieveQuery } from '@service';

import { MovieRetrieveFilter } from './Movie.types';

export const MoviePage = () => {
    const theme = useTheme();
    const { updateFilters, appliedFilters, clearAllFilters } = useMovieFilter();
    const [filters, setFilters] = useState<MovieRetrieveFilter>({ date: '' });
    const { slug } = useParams();
    const { data, isLoading } = useMovieRetrieveQuery({
        slug: slug || '',
        date: filters.date,
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        hasInteracted.current = true;
    };

    const handleClear = () => {
        clearAllFilters();
        setFilters({ date: '' });
    };

    const hasInteracted = useRef(false);

    useEffect(() => {
        setFilters({
            date: appliedFilters.date || '',
        });
        hasInteracted.current = false;
    }, [appliedFilters]);

    useEffect(() => {
        if (!hasInteracted.current) {
            return;
        }

        updateFilters([], [], filters.date || '');
    }, [filters, updateFilters]);

    return (
        <>
            {isLoading ? (
                <Skeleton
                    variant="rectangular"
                    height={theme.typography.pxToRem(300)}
                />
            ) : (
                <CarouselCard
                    title={String(data?.title)}
                    description={String(data?.description)}
                    duration={String(data?.duration)}
                    poster={String(data?.poster)}
                    genre={data?.genre || []}
                    language={data?.language || []}
                />
            )}

            <Stack
                padding={theme.spacing(8, 4)}
                alignItems={'center'}
                justifyContent={'center'}
                width={'100%'}
            >
                <Stack
                    sx={{
                        maxWidth: theme.typography.pxToRem(1216),
                        width: '100%',
                    }}
                    alignItems={'flex-start'}
                    gap={theme.spacing(8)}
                >
                    <Filter
                        filters={filters}
                        handleInputChange={handleInputChange}
                        handleClear={handleClear}
                        filterOptions={[
                            { name: 'date', label: 'Date', type: 'date' },
                        ]}
                    />
                    <Typography variant="h2" component={'h6'}>
                        Select Theater & Showtime
                    </Typography>
                    {isLoading ? (
                        <Skeleton
                            variant="rectangular"
                            width={'100%'}
                            height={theme.typography.pxToRem(126)}
                        />
                    ) : Boolean(Object.keys(data?.slots || {}).length) ? (
                        <Slot {...data?.slots} />
                    ) : (
                        <Box
                            textAlign={'center'}
                            sx={{ padding: 8 }}
                            width={'100%'}
                        >
                            <Typography variant="h2" component="p">
                                No slots found
                            </Typography>
                        </Box>
                    )}
                </Stack>
            </Stack>
        </>
    );
};
