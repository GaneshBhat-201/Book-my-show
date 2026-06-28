import { Stack, styled } from '@mui/material';

export const StyledStack = styled(Stack)(
    ({ theme: { typography, spacing, palette } }) => ({
        color: palette.primary.contrastText,
        backgroundColor: palette.primary.main,
        padding: spacing(8),
        justifyContent: 'center',
        height: typography.pxToRem(170),
    }),
);
