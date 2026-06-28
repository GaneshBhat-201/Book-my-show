import { Navigate, Outlet, useLocation } from 'react-router';

import { useAppSelector } from '@app';
import { ROUTE } from '@constant';
/**
 * Wrapper component which will re-direct to home page if not authenticated
 * otherwise, child component will be returned
 */
export const ProtectedRoute = () => {
    const isAuthenticated = useAppSelector((state) => state.auth.accessToken);
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to={ROUTE.LOGIN} replace state={{ from: location }} />;
    }

    return <Outlet />;
};
