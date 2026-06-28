import { Box, Card, CardContent, Skeleton } from '@mui/material';

import { MOVIE_CARD_POSTER_HEIGHT, MOVIE_CARD_WIDTH } from '@constant';

/**
 * This component display the skeleton for movie cards
 */
export const MovieSkeleton = () => (
    <Card sx={{ width: MOVIE_CARD_WIDTH, borderRadius: 3 }}>
        <Skeleton variant="rectangular" height={MOVIE_CARD_POSTER_HEIGHT} />
        <CardContent>
            <Skeleton variant="text" height={40} width="80%" />
            <Box display="flex" gap={1}>
                <Skeleton variant="text" height={30} width="30%" />
                <Skeleton variant="text" height={30} width="30%" />
                <Skeleton variant="text" height={30} width="30%" />
            </Box>
            <Skeleton variant="text" height={30} />
        </CardContent>
    </Card>
);
