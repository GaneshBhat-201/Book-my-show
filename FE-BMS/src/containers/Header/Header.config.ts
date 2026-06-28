import { ROUTES } from '@constant';

/**
 * Represent the items that need to be displayed in navbar
 */
export const navItems = [
    {
        label: 'Home',
        path: ROUTES.HOME,
        requiresAuth: false,
    },
    {
        label: 'Cinemas',
        path: ROUTES.CINEMAS,
        requiresAuth: false,
    },
    {
        label: 'Your Orders',
        path: ROUTES.ORDERS,
        requiresAuth: true,
    },
];
