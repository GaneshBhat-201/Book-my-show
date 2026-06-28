import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { store } from '@app';
import { ErrorBoundary } from '@component/ErrorBoundary';
import { ErrorPage } from '@page/Error';
import { router } from '@routes';
import { theme } from '@theme';

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ErrorBoundary fallback={<ErrorPage />}>
                    <RouterProvider router={router} />
                </ErrorBoundary>
            </ThemeProvider>
        </Provider>
    </StrictMode>,
);
