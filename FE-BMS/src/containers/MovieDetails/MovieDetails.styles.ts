import { Box, styled } from '@mui/material';

export const StyledPoster = styled('img')(
    ({
        theme: {
            typography: { pxToRem },
        },
    }) => ({
        width: pxToRem(280),
        height: pxToRem(380),
        display: 'block',
        borderRadius: pxToRem(8),
    }),
);

export const StyledBanner = styled(Box)(
    ({
        theme: {
            palette,
            typography: { pxToRem },
            spacing,
        },
    }) => ({
        background: palette.action.disabled,
        display: 'flex',
        gap: spacing(4),
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        borderRadius: pxToRem(8),
        padding: spacing(4),
    }),
);
