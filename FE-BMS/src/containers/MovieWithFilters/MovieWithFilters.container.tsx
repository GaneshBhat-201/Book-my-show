import { useState } from 'react';

import { FilterAlt } from '@mui/icons-material';
import {
    Box,
    Button,
    IconButton,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';

import { CustomModal, GridList, MovieCard, MovieSkeleton } from '@components';
import { SKELETON_COUNT } from '@constant';
import { MovieFilters } from '@containers/MovieFilters';
import { MovieApiParamType, useMovieWithFilterQuery } from '@services';

/**
 * Container display movies and their filter panel
 */
export const MovieWithFilters = () => {
    /** States */
    const [applyFilters, setApplyFilters] = useState<MovieApiParamType>({});
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    /** Hooks */
    const { breakpoints } = useTheme();
    const isMobile = useMediaQuery(breakpoints.down('lg'));
    const { data, isLoading, isError, refetch } =
        useMovieWithFilterQuery(applyFilters);

    /**
     * Functions
     */
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    return (
        <Box
            py={4}
            display="flex"
            gap={4}
            flexDirection={{ xs: 'column', md: 'row' }}
        >
            <Stack flex={1} height="100%" gap={4}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant="h2" pl={2}>
                        Movies
                    </Typography>
                    {isMobile && (
                        <IconButton
                            onClick={handleOpen}
                            aria-label="open movie filters"
                        >
                            <FilterAlt />
                        </IconButton>
                    )}
                </Box>

                {isLoading && !data && (
                    <GridList
                        itemSize={{ xs: 12, sm: 6, md: 4, xl: 3 }}
                        itemsList={Array.from({ length: SKELETON_COUNT })}
                        renderItem={(_, index) => <MovieSkeleton key={index} />}
                    />
                )}

                {isError && (
                    <Stack
                        flex={1}
                        gap={2}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Typography
                            variant="h4"
                            color="error"
                            textAlign="center"
                        >
                            Failed to load movies. Please try again.
                        </Typography>
                        <Button variant="contained" onClick={() => refetch()}>
                            Retry
                        </Button>
                    </Stack>
                )}

                {data && data.length === 0 && (
                    <Stack
                        flex={1}
                        justifyContent="center"
                        alignItems="center"
                        gap={2}
                        p={4}
                        textAlign="center"
                    >
                        <Typography variant="h2">No movies found</Typography>
                        <Typography variant="h4" color="textSecondary">
                            Try adjusting your filters or clearing them to see
                            more results.
                        </Typography>
                    </Stack>
                )}

                {data && data.length > 0 && (
                    <GridList
                        itemSize={{ xs: 12, sm: 6, md: 4, xl: 3 }}
                        itemsList={data ?? []}
                        renderItem={(movie) => <MovieCard movie={movie} />}
                    />
                )}
            </Stack>

            {isMobile ? (
                <CustomModal open={modalOpen} onClose={handleClose}>
                    <MovieFilters
                        appliedFilters={applyFilters}
                        setApplyFilters={setApplyFilters}
                        onClose={handleClose}
                    />
                </CustomModal>
            ) : (
                <MovieFilters
                    appliedFilters={applyFilters}
                    setApplyFilters={setApplyFilters}
                />
            )}
        </Box>
    );
};
