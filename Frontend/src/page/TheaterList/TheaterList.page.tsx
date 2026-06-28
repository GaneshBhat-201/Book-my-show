import { useEffect, useRef, useState } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useTheaterListQuery } from 'service/Theater/Theater.service';

import RoomIcon from '@mui/icons-material/Room';
import {
    Box,
    Grid2,
    SelectChangeEvent,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';

import { Card } from '@component/Card';
import { TheaterCardSkeleton } from '@component/Card/TheaterCard.skeleton';
import { CarouselCard } from '@component/CarouselCard';
import { Filter, FilterOptions } from '@component/Filter';
import { PAGE_SIZE } from '@constant';
import { NavLinkStyled } from '@container/MovieList/MovieList.styles';
import { useTheaterFilter } from '@hooks';
import { extractCursor, urlify } from '@utils';

import { TheaterFilterCount, TheaterFilterType } from './TheaterList.types';

export const TheaterList = () => {
    const { appliedFilters, cities, clearAllFilters, updateCityFilter } =
        useTheaterFilter();
    const [cursor, setCursor] = useState<string | undefined>(undefined);
    const theme = useTheme();
    const [filters, setFilters] = useState<TheaterFilterType>({ city: [] });
    const hasInteracted = useRef<boolean>(false);
    const [count, setCount] = useState<TheaterFilterCount>({
        city: 0,
    });

    const { data, isFetching } = useTheaterListQuery({
        cursor,
        city: filters.city.map(Number),
    });
    const theaters = data?.results || [];
    const nextCursor = data?.next;

    const fetchMore = () => {
        if (!nextCursor || isFetching) return;
        setCursor(extractCursor(nextCursor) || undefined);
    };

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

    const TheaterFilterConfig: FilterOptions<TheaterFilterType>[] = [
        {
            name: 'city',
            label: 'City',
            type: 'select',
            options: cities,
        },
    ];

    const handleClear = () => {
        clearAllFilters();
        setCount({ city: 0 });
        setFilters({ city: [] });
    };

    useEffect(() => {
        setFilters({
            city: appliedFilters.cities.map(String),
        });
        setCount({
            city: appliedFilters.cities.length,
        });

        hasInteracted.current = false;
    }, [appliedFilters]);

    useEffect(() => {
        if (!hasInteracted.current) {
            return;
        }

        updateCityFilter(filters.city.map(Number));
    }, [filters, updateCityFilter]);

    return (
        <Box width={'100%'} height={'100%'}>
            <CarouselCard
                title="Theaters"
                description="Find the perfect cinema for your movie experience"
            />
            <Stack
                width={'100%'}
                gap={theme.spacing(8)}
                padding={theme.spacing(8)}
                sx={{
                    maxWidth: theme.typography.pxToRem(1216),
                    margin: '0 auto',
                    width: '100%',
                }}
            >
                <Filter
                    filters={filters}
                    handleChange={handleChange}
                    handleClear={handleClear}
                    filterOptions={TheaterFilterConfig}
                    count={count}
                />
                <Typography variant="h2">Theaters</Typography>
                <Box
                    id="scrolldiv"
                    sx={{
                        height: '50vh',
                        overflow: 'auto',
                        scrollbarWidth: 'none',
                    }}
                >
                    <InfiniteScroll
                        dataLength={theaters.length}
                        next={fetchMore}
                        hasMore={Boolean(nextCursor) && !isFetching}
                        loader={null}
                        scrollableTarget="scrolldiv"
                    >
                        <Grid2
                            container
                            spacing={theme.spacing(4)}
                            columns={{ xs: 2, sm: 3, md: 5 }}
                        >
                            {theaters?.map((theater) => (
                                <Grid2
                                    key={theater.id}
                                    size={{ xs: 1, sm: 1, md: 1 }}
                                >
                                    <NavLinkStyled
                                        to={urlify(`${theater.name}`)}
                                    >
                                        <Card title={theater.name}>
                                            <Stack
                                                direction={'row'}
                                                gap={theme.spacing(1)}
                                                color="text.secondary"
                                                alignItems={'center'}
                                            >
                                                <RoomIcon
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
                                                    {theater.city},{' '}
                                                    {theater.state}
                                                </Typography>
                                            </Stack>
                                        </Card>
                                    </NavLinkStyled>
                                </Grid2>
                            ))}
                            {isFetching &&
                                Array.from({ length: PAGE_SIZE }).map(
                                    (_, i) => (
                                        <Grid2
                                            key={i}
                                            size={{ xs: 1, sm: 1, md: 1 }}
                                        >
                                            <TheaterCardSkeleton />
                                        </Grid2>
                                    ),
                                )}
                        </Grid2>
                        {data?.results.length == 0 ? (
                            <Box textAlign={'center'} sx={{ padding: 8 }}>
                                <Typography variant="h2" component="p">
                                    No theaters found
                                </Typography>
                            </Box>
                        ) : null}
                    </InfiniteScroll>
                </Box>
            </Stack>
        </Box>
    );
};
