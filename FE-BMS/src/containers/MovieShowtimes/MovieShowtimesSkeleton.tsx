import { Skeleton, Stack, Typography } from '@mui/material';

import { SKELETON_COUNT } from '@constant';

/**
 * Skeleton to be rendered when movie details is loading
 */
export const MovieShowtimeSkeleton = () => (
    <Stack flex={1} py={4} gap={5}>
        <Skeleton variant="rounded" width="100%" height={100} />
        <Stack gap={2}>
            <Typography variant="h2">Shows</Typography>
            {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                <Skeleton
                    variant="rounded"
                    key={index}
                    width="100%"
                    height={150}
                />
            ))}
        </Stack>
    </Stack>
);
