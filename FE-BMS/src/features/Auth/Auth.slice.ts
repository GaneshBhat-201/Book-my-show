import { TOKEN_KEY } from '@constant';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@types';
import { getToken } from '@utils';

import { AuthSlice } from './Auth.types';

/**
 * Token stored in the localstorage
 */
const storedToken = getToken(TOKEN_KEY);
const token =
    storedToken &&
    storedToken.trim() &&
    storedToken !== 'null' &&
    storedToken !== 'undefined'
        ? storedToken
        : null;

/**
 * Initial state of the user authentication
 */
const initialState: AuthSlice = {
    token: token,
    isAuthenticated: Boolean(token),
    user: null,
};

/**
 * Slice responsible for the user authentication state
 */
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        /**
         * Used to set the token and isAuthenticated state
         */
        setAuthCredentials(state, action: PayloadAction<string>) {
            state.token = action.payload;
            state.isAuthenticated = true;
        },
        /**
         * Used to set the user data
         */
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
        },
        /**
         * Clears the user authentication state
         */
        removeAuthCredentials(state) {
            state.token = null;
            state.isAuthenticated = false;
            state.user = null;
        },
    },
});

export const { setAuthCredentials, removeAuthCredentials, setUser } =
    authSlice.actions;
export const authReducer = authSlice.reducer;
