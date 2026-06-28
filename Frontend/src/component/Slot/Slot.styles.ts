import { NavLink } from 'react-router';

import { Stack, styled } from '@mui/material';

export const SlotContainer = styled(Stack)(
    ({ theme: { typography, spacing, palette } }) => ({
        width: '100%',
        padding: spacing(6),
        backgroundColor: palette.background.paper,
        borderRadius: typography.pxToRem(12),
        gap: spacing(4),
    }),
);

export const SlotLink = styled(NavLink)(
    ({ theme: { typography, palette, spacing } }) => ({
        height: typography.pxToRem(40),
        width: typography.pxToRem(72),
        textDecoration: 'none',
        border: `1px solid ${palette.primary.main}`,
        color: palette.primary.main,
        padding: spacing(2, 4),
        borderRadius: typography.pxToRem(12),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        '&:hover': {
            backgroundColor: palette.primary.main,
            color: palette.primary.contrastText,
        },
    }),
);
