import { Box, styled } from '@mui/material';

import { HEADER_HEIGHT } from '@constant';

export const MainContainer = styled(Box)(({ theme: { palette } }) => ({
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: palette.background.default,
}));

export const ChildContainer = styled(Box)(({ theme: { typography } }) => ({
    maxWidth: typography.pxToRem(1440),
    height: `calc(100vh - ${typography.pxToRem(HEADER_HEIGHT)})`,
    margin: '0 auto',
    position: 'relative',
    top: typography.pxToRem(HEADER_HEIGHT),
    overflowY: 'auto',
}));
