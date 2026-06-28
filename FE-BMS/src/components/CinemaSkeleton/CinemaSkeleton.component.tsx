import { Card, CardContent, Skeleton, Stack } from '@mui/material';

import { CINEMA_CARD_MIN_HEIGHT } from '@constant';

/**
 * This component displays the skeleton of cinema card
 */
export const CinemaSkeleton = () => (
    <Card sx={{ width: '100%' }}>
        <CardContent>
            <Stack gap={1} minHeight={CINEMA_CARD_MIN_HEIGHT}>
                <Skeleton variant="text" height={30} width="60%" />
                <Skeleton variant="text" height={30} width="30%" />
            </Stack>
        </CardContent>
    </Card>
);
