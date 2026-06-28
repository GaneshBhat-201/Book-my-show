import { Box, Button, Stack, styled } from '@mui/material';

export const StyledBox = styled(Box)(
    ({ theme: { typography, breakpoints, spacing } }) => ({
        maxHeight: typography.pxToRem(300),
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        padding: spacing(15, 15),

        [breakpoints.up('md')]: {
            maxHeight: typography.pxToRem(400),
        },
    }),
);

export const ButtonStyled = styled(Button)(
    ({ theme: { typography, palette, breakpoints } }) => ({
        backgroundColor: palette.primary.main,
        color: palette.primary.contrastText,
        width: typography.pxToRem(64),
        textTransform: 'none',
        borderRadius: typography.pxToRem(8),

        [breakpoints.up('md')]: {
            width: typography.pxToRem(102),
            height: typography.pxToRem(40),
        },
    }),
);

export const CarouselContent = styled(Stack)(
    ({ theme: { spacing, breakpoints } }) => ({
        gap: spacing(3),
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',

        [breakpoints.up('md')]: {
            gap: spacing(12),
            width: '100%',
        },
    }),
);

export const PosterContainer = styled(Box)(({ theme: { breakpoints } }) => ({
    display: 'none',

    [breakpoints.up('md')]: {
        display: 'block',
    },
}));
