import { Skeleton, Stack, useTheme } from '@mui/material';

import { CardStyled, PosterContainer } from './Card.styles';

export const MovieCardSkeleton = () => {
    const theme = useTheme();

    return (
        <CardStyled>
            <PosterContainer>
                <Skeleton
                    width={'100%'}
                    height={'100%'}
                    variant="rectangular"
                />
            </PosterContainer>
            <Stack sx={{ padding: theme.spacing(1) }}>
                <Skeleton width={'60%'} />
                <Skeleton width={'40%'} />
                <Skeleton width={'80%'} />
                <Skeleton width={'70%'} />
            </Stack>
        </CardStyled>
    );
};
