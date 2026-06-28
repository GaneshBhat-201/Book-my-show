import { Stack, styled } from '@mui/material';

export const ProfileContainer = styled(Stack)(
    ({ theme: { typography, palette, spacing } }) => ({
        maxWidth: typography.pxToRem(1216),
        padding: spacing(8),
        backgroundColor: palette.background.paper,
        width: '100%',
        borderRadius: typography.pxToRem(12),
        gap: spacing(8),
        position: 'relative',
    }),
);
