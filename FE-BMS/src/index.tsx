import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { GlobalSnackbar, PageLoader } from '@components';
import { Router } from '@routes';
import { store } from '@store';
import { theme } from '@theme';

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Provider store={store}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <GlobalSnackbar />
                    <Suspense fallback={<PageLoader />}>
                        <RouterProvider router={Router} />
                    </Suspense>
                </LocalizationProvider>
            </Provider>
        </ThemeProvider>
    </StrictMode>,
);
