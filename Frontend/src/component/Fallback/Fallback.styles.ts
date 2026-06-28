import { Box, Stack, styled } from '@mui/material';

export const StackStyled = styled(Stack)(
    ({ theme: { breakpoints, spacing } }) => ({
        width: '100%',
        gap: spacing(8),
        margin: '0 auto',
        padding: spacing(8, 4),
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',

        [breakpoints.up('md')]: {
            padding: spacing(4, 20),
        },
    }),
);

export const ImageContainer = styled(Box)(
    ({ theme: { typography, breakpoints } }) => ({
        height: typography.pxToRem(50),
        width: typography.pxToRem(50),

        [breakpoints.up('md')]: {
            height: typography.pxToRem(60),
            width: typography.pxToRem(60),
        },
    }),
);

export const FallbackHead = styled(Stack)(({ theme: { spacing } }) => ({
    gap: spacing(7),
    textAlign: 'center',
    alignItems: 'center',
}));

export const FallbackIntro = styled(Stack)(
    ({ theme: { typography, spacing, breakpoints } }) => ({
        flexDirection: 'column',
        gap: spacing(2),
        maxWidth: typography.pxToRem(448),

        [breakpoints.up('md')]: {
            gap: spacing(4),
        },
    }),
);
