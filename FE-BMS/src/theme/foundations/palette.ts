import type { PaletteOptions } from '@mui/material/styles';

import { COLORS } from '@constant';

/* Custom Palette */
export const palette: PaletteOptions = {
    primary: {
        main: COLORS.PRIMARY.MAIN,
        contrastText: COLORS.PRIMARY.CONTRAST_TEXT,
        light: COLORS.PRIMARY.LIGHT,
    },
    background: {
        default: COLORS.BACKGROUND.DEFAULT,
        paper: COLORS.BACKGROUND.PAPER,
    },
    text: {
        primary: COLORS.TEXT.PRIMARY,
        secondary: COLORS.TEXT.SECONDARY,
        disabled: COLORS.TEXT.DISABLED,
    },
};
