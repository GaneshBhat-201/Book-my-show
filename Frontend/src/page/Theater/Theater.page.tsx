import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { useParams } from 'react-router';

import { Box, Skeleton, Stack, Typography, useTheme } from '@mui/material';

import { CarouselCard } from '@component/CarouselCard';
import { Filter } from '@component/Filter';
import { Slot } from '@component/Slot';
import { useTheaterFilter } from '@hooks';
import { useTheaterRetrieveQuery } from '@service';

import { TheaterRetrieveFilter } from './Theater.types';

export const TheaterPage = () => {
    const theme = useTheme();
    const { updateDateFilter, appliedFilters, clearAllFilters } =
        useTheaterFilter();
    const [filters, setFilters] = useState<TheaterRetrieveFilter>({ date: '' });
    const hasInteracted = useRef(false);
    const { slug } = useParams();
    const { data, isLoading } = useTheaterRetrieveQuery({
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

        updateDateFilter(filters.date || '');
    }, [filters, updateDateFilter]);

    return (
        <>
            {isLoading ? (
                <Skeleton
                    variant="rectangular"
                    height={theme.typography.pxToRem(300)}
                />
            ) : (
                <CarouselCard
                    title={String(data?.name)}
                    description={String(data?.city)}
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
                        Select Movie & Showtime
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
