import { Box, Skeleton, Stack, Typography } from '@mui/material';

import { SKELETON_COUNT } from '@constant';

/**
 * Skeleton to be rendered when movie details is loading
 */
export const MovieDetailsSkeleton = () => (
    <Stack gap={8} py={4}>
        <Skeleton variant="rounded" height={400} />
        <Box display="flex" flexDirection="column" gap={4} px={4} maxWidth="lg">
            <Typography variant="h3">About the movie</Typography>
            {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                <Skeleton key={index} variant="text" />
            ))}
        </Box>
    </Stack>
);
