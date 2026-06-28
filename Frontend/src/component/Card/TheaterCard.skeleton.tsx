import { Skeleton, Stack, useTheme } from '@mui/material';

import { CardStyled } from './Card.styles';

export const TheaterCardSkeleton = () => {
    const theme = useTheme();

    return (
        <CardStyled
            sx={{
                minHeight: theme.typography.pxToRem(64),
                padding: theme.spacing(1),
            }}
        >
            <Stack sx={{ padding: theme.spacing(1) }}>
                <Skeleton width={'60%'} />
                <Skeleton width={'40%'} />
            </Stack>
        </CardStyled>
    );
};
