import { BOX_SHADOW } from 'constant/themeConstant';

import { Box, Stack, styled } from '@mui/material';

export const AuthCardContainer = styled(Stack)(
    ({ theme: { typography, palette, breakpoints } }) => ({
        maxWidth: typography.pxToRem(398),
        backgroundColor: palette.background.paper,
        boxShadow: BOX_SHADOW[0],
        gap: typography.pxToRem(64),
        padding: typography.pxToRem(32),
        alignItems: 'center',
        borderRadius: typography.pxToRem(16),

        [breakpoints.up('md')]: {
            maxWidth: 'none',
            width: typography.pxToRem(448),
        },
    }),
);

export const BoxStyled = styled(Box)(({ theme: { typography } }) => ({
    height: typography.pxToRem(56),
    width: typography.pxToRem(56),
}));
