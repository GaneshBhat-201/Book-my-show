import { useNavigate } from 'react-router-dom';

import { ArrowBack } from '@mui/icons-material';
import { Box, IconButton, Skeleton, Stack } from '@mui/material';

/**
 * This component represent the skeleton of the booking page
 */
export const BookingSkeleton = () => {
    /** Hooks */
    const navigate = useNavigate();

    return (
        <Stack flex={1} gap={10} py={8}>
            <Box
                display="flex"
                alignItems="center"
                gap={{ xs: 4, md: 10 }}
                sx={{ cursor: 'pointer' }}
            >
                <IconButton aria-label="Go back" onClick={() => navigate(-1)}>
                    <ArrowBack fontSize="small" />
                </IconButton>
                <Stack flex={1}>
                    <Skeleton variant="text" width="40%" height={50} />

                    <Box display="flex" gap={2} sx={{ width: '100%' }}>
                        <Skeleton variant="text" width={'40%'} height={40} />
                        <Skeleton variant="text" width={'20%'} height={40} />
                        <Skeleton variant="text" width={'20%'} height={40} />
                    </Box>
                </Stack>
            </Box>

            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                overflow="auto"
            >
                <SeatGridSkeleton />
            </Box>
        </Stack>
    );
};

/**
 * This component represent the skeleton of the seat grid layout
 */
export const SeatGridSkeleton = () => (
    <Stack gap={10} alignItems="center">
        <Stack gap={2} direction="column-reverse" overflow="auto">
            {Array.from({ length: 10 }, () => Array.from({ length: 20 })).map(
                (row, rowIndex) => (
                    <Box
                        key={rowIndex}
                        display="flex"
                        alignItems="center"
                        gap={10}
                    >
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            height={25}
                            width={25}
                            flexShrink={0}
                        >
                            <Skeleton
                                variant="rectangular"
                                width={25}
                                height={25}
                            />
                        </Box>
                        <Box display="flex" gap={2}>
                            {row.map((_, colIndex) => (
                                <Skeleton
                                    key={colIndex}
                                    variant="rectangular"
                                    height={25}
                                    width={25}
                                />
                            ))}
                        </Box>
                    </Box>
                ),
            )}
        </Stack>
        <Skeleton variant="rectangular" width={240} />
        <Skeleton variant="rectangular" width={280} height={40} />
    </Stack>
);
