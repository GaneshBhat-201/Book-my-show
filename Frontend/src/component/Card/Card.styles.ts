import { BOX_SHADOW } from 'constant/themeConstant';

import { Box, Stack, styled } from '@mui/material';

export const PosterContainer = styled(Box)(
    ({ theme: { typography, breakpoints } }) => ({
        height: typography.pxToRem(280),

        [breakpoints.up('md')]: {
            height: typography.pxToRem(300),
        },

        '& img': {
            borderTopLeftRadius: typography.pxToRem(12),
            borderTopRightRadius: typography.pxToRem(12),
        },
    }),
);

export const CardStyled = styled(Stack)(
    ({ theme: { spacing, typography, palette } }) => ({
        gap: spacing(2),
        backgroundColor: palette.background.paper,
        borderRadius: typography.pxToRem(12),
        cursor: 'pointer',
        width: '100%',

        '&:hover': {
            boxShadow: BOX_SHADOW[0],
        },
    }),
);
