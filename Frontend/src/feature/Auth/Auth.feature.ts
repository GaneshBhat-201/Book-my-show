import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthState } from './Auth.types';

const initialState: AuthState = {
    accessToken: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthentication: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },

        setLogout: (state) => {
            state.accessToken = null;
        },
    },
});

export const { setAuthentication, setLogout } = authSlice.actions;

export default authSlice.reducer;
