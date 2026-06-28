import { useEffect, useState } from 'react';

import { Outlet } from 'react-router';

import { CircularProgress, Container } from '@mui/material';

import { useAppSelector } from '@app';
import { SnackBar } from '@component/SnackBar';
import { Header } from '@container/Header';
import { useLogoutMutation, useRefreshMutation } from '@service';

import { ChildContainer, MainContainer } from './Main.styles';

export const MainLayout = () => {
    const [refresh, { isLoading }] = useRefreshMutation();
    const [logout] = useLogoutMutation();
    const { error } = useAppSelector((state) => state.sever);
    const [open, setOpen] = useState(false);

    /**
     * whenever the page is refreshed access token will be extracted and stored
     * by calling refresh api
     */
    useEffect(() => {
        const refreshPage = async () => {
            try {
                await refresh().unwrap();
            } catch (err) {
                void err;
                await logout();
            }
        };
        void refreshPage();
    }, [refresh, logout]);

    useEffect(() => {
        if (error) {
            setOpen(true);
        }
    }, [error]);

    if (isLoading)
        return (
            <Container
                sx={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <CircularProgress />
            </Container>
        );

    return (
        <MainContainer>
            <Header />
            {open ? (
                <SnackBar
                    description={String(error)}
                    open={open}
                    severity="error"
                    setOpen={setOpen}
                />
            ) : null}
            <ChildContainer>
                <Outlet />
            </ChildContainer>
        </MainContainer>
    );
};
