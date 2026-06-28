export const API_URL = {
    REGISTER: '/user/register/',
    LOGIN: '/user/login/',
    REFRESH_TOKEN: '/user/refresh-token/',
    LOGOUT: '/user/logout/',
    PROFILE: '/user/details/',
    MOVIES: '/movies/',
    MOVIE_LANGUAGES: '/movies/languages/',
    MOVIE_GENRES: '/movies/genres/',
    CINEMAS: '/cinemas/',
    SLOT: '/movies/slot/',
    BOOKING: '/movies/booking/',
} as const;

export const TOKEN_KEY = 'auth_token';

export const ERROR_STATUS = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
} as const;

export const API_TAGS = {
    SEATS: 'Seats',
    PROFILE: 'Profile',
} as const;

export const POLLING_INTERVAL = 50000;
