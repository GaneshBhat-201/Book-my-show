import { Box, Button, styled } from '@mui/material';

export const ImageContainer = styled(Box)(
    ({
        theme: {
            typography: { pxToRem },
            breakpoints,
        },
    }) => ({
        height: pxToRem(160),
        width: 'fit-content',
        maxWidth: '100%',
        display: 'flex',
        justifyContent: 'center',

        [breakpoints.up('sm')]: {
            height: pxToRem(300),
        },
    }),
);

export const StyledButton = styled(Button)(
    ({
        theme: {
            typography: { pxToRem },
            spacing,
        },
    }) => ({
        padding: spacing(2, 4),
        borderRadius: pxToRem(12),
        marginTop: spacing(3),
    }),
);
