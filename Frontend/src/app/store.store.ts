import { authReducer, serverReducer } from '@feature';
import { configureStore } from '@reduxjs/toolkit';
import { api } from '@service';

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: authReducer,
        sever: serverReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});
