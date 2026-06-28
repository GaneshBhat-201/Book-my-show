import type { PaletteOptions } from '@mui/material/styles';

import { COLORS } from '@constant';

/* Custom Palette */
export const palette: PaletteOptions = {
    primary: {
        main: COLORS.PRIMARY.MAIN,
        contrastText: COLORS.WHITE,
    },

    secondary: {
        main: COLORS.GREY[50],
        contrastText: COLORS.GREY[700],
    },

    success: {
        main: COLORS.GREEN[100],
        contrastText: COLORS.WHITE,
        dark: COLORS.GREEN[400],
    },

    error: {
        main: COLORS.RED[700],
        contrastText: COLORS.WHITE,
    },

    text: {
        primary: COLORS.GREY[900],
        secondary: COLORS.GREY[600],
        disabled: COLORS.GREY[500],
    },

    action: {
        active: COLORS.GREY[100],
        disabledBackground: COLORS.GREY[200],
    },

    background: {
        default: COLORS.BLUE[100],
        paper: COLORS.WHITE,
    },
};
