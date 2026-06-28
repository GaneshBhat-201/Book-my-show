import { Navigate, Outlet } from 'react-router';

import { useAppSelector } from '@app';
import { ROUTE } from '@constant';

/**
 * Wrapper component which navigates back to home if authenticated
 * otherwise child component will be returned
 */
export const PublicRoute = () => {
    const isAuthenticated = useAppSelector((state) => state.auth.accessToken);

    if (isAuthenticated) {
        return <Navigate to={ROUTE.HOME} replace />;
    }

    return <Outlet />;
};
