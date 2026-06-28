import { NavLink } from 'react-router';

import { AppBar, Box, Button, styled } from '@mui/material';

export const StyledAppBar = styled(AppBar)(
    ({ theme: { typography, palette, spacing, breakpoints } }) => ({
        height: typography.pxToRem(64),
        backgroundColor: palette.background.paper,
        color: palette.text.primary,
        padding: spacing(0, 4),

        [breakpoints.up('md')]: {
            padding: spacing(0, 8),
        },
    }),
);

export const LogoContainer = styled(Box)(({ theme: { typography } }) => ({
    height: typography.pxToRem(28),
}));

export const NavLogoContainer = styled(NavLink)(() => ({
    textDecoration: 'none',
}));

export const StyledNavLink = styled(NavLink)(
    ({ theme: { typography, spacing, palette, breakpoints } }) => ({
        textDecoration: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: typography.pxToRem(28),
        padding: spacing(1),
        color: palette.secondary.contrastText,

        '&[aria-current="page"], &:hover': {
            backgroundColor: palette.background.default,
            color: palette.primary.main,
            borderRadius: typography.pxToRem(8),
        },

        [breakpoints.up('md')]: {
            height: typography.pxToRem(32),
            padding: spacing(2),
        },
    }),
);

export const ButtonStyled = styled(Button)(
    ({ theme: { typography, spacing, breakpoints } }) => ({
        padding: spacing(1),
        borderRadius: typography.pxToRem(8),
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'none',
        height: typography.pxToRem(28),

        [breakpoints.up('md')]: {
            height: typography.pxToRem(32),
            padding: spacing(2),
        },
    }),
);
