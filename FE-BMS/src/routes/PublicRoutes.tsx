import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { ROUTES } from '@constant';
import { RootState } from '@store';

/**
 * Route guard for public pages.
 * It ensures authenticated user not allowed to access login and register page
 */
export const PublicRoutes = () => {
    /** Hooks */
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    return isAuthenticated ? <Navigate to={ROUTES.HOME} replace /> : <Outlet />;
};
