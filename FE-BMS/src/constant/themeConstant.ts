/**
 * Color palette used in the application.
 * @constant
 */
export const COLORS = {
    PRIMARY: {
        MAIN: '#eb4e62',
        CONTRAST_TEXT: '#FFFFFF',
        LIGHT: '#D3D3D3',
    },
    BACKGROUND: {
        DEFAULT: '#f2f5f9',
        PAPER: '#f5f5f5',
    },
    TEXT: {
        PRIMARY: '#222222',
        SECONDARY: '#333333',
        DISABLED: '#666666',
    },
} as const;

/**
 * Breakpoints used in the application.
 * @constant
 */
export const BREAKPOINTS = {
    XS: 0,
    SM: 480,
    MD: 768,
    LG: 1068,
    XL: 1400,
} as const;

/**
 * Base font size in pixels.
 * @constant
 */
export const HTML_FONT_SIZE = 10;

/**
 * Scaling factor used for spacing.
 * @constant
 */
export const SCALING_FACTOR = 4;

/**
 * Constants used in movie card
 */
export const MOVIE_CARD_WIDTH = 250;
export const MOVIE_CARD_POSTER_HEIGHT = 280;
export const SKELETON_COUNT = 8;

/**
 * Constants used in cinema card
 */
export const CINEMA_CARD_MIN_HEIGHT = 70;
