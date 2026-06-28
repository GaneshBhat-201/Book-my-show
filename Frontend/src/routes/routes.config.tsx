import { LoginPage } from 'page/Login/Login.page';
import { RouteObject } from 'react-router';

import { ROUTE } from '@constant';
import { MainLayout } from '@layout';
import { ErrorPage } from '@page/Error';
import { Home } from '@page/Home';
import { MoviePage } from '@page/Movie/Movie.page';
import { NotFound } from '@page/NotFound';
import { ProfilePage } from '@page/Profile';
import { SignupPage } from '@page/Signup';
import { TheaterPage } from '@page/Theater';
import { TheaterList } from '@page/TheaterList';

import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './publicRoute';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                element: <PublicRoute />,
                children: [
                    {
                        path: ROUTE.SIGNUP,
                        element: <SignupPage />,
                    },
                    {
                        path: ROUTE.LOGIN,
                        element: <LoginPage />,
                    },
                ],
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: ROUTE.PROFILE,
                        element: <ProfilePage />,
                    },
                ],
            },
            {
                path: ROUTE.MOVIE_RETRIEVE,
                element: <MoviePage />,
            },
            {
                path: ROUTE.THEATER,
                element: <TheaterList />,
            },
            {
                path: ROUTE.THEATER_RETRIEVE,
                element: <TheaterPage />,
            },
            {
                path: ROUTE.ERROR,
                element: <ErrorPage />,
            },
            {
                path: '/*',
                element: <NotFound />,
            },
        ],
    },
];
