import { Skeleton, useTheme } from '@mui/material';

export const LatestMovieSkeleton = () => {
    const theme = useTheme();

    return (
        <Skeleton
            variant="rectangular"
            width={'100%'}
            sx={{
                height: {
                    xs: theme.typography.pxToRem(300),
                    md: theme.typography.pxToRem(400),
                },
            }}
        />
    );
};
