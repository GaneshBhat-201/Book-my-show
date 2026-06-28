import { Outlet } from 'react-router-dom';

import { Container, Stack, Toolbar } from '@mui/material';

import { Header } from '@containers';
import { useProfileQuery } from '@services';

/**
 * Represent the main layout of the application
 */
export const MainLayout = () => {
    /** Hooks */
    useProfileQuery(undefined);

    return (
        <Container maxWidth="xl" sx={{ px: 4 }}>
            <Stack height="100dvh">
                <Header />
                <Toolbar />
                <Outlet />
            </Stack>
        </Container>
    );
};
