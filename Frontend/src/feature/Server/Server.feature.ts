import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ServerState } from './Server.types';

const initialState: ServerState = {
    error: null,
};

export const serverSlice = createSlice({
    name: 'server',
    initialState,
    reducers: {
        setServerError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const { setServerError } = serverSlice.actions;

export default serverSlice.reducer;
