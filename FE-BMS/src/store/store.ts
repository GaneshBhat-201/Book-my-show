import { authReducer, snackbarReducer } from 'features';

import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@services';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        snackbar: snackbarReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

// Inferred type for useSelector
export type RootState = ReturnType<typeof store.getState>;

// Inferred type for dispatch
export type AppDispatch = typeof store.dispatch;
