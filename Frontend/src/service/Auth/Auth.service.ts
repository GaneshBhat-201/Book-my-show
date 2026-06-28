import { api } from 'service/api';

import { API_METHOD, API_URL } from '@constant';
import { setAuthentication, setLogout } from '@feature';

import {
    LoginRequest,
    LoginResponse,
    LogoutResponse,
    Profile,
    RefreshResponse,
    SignupReqRes,
} from './Auth.types';

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        /**
         * Registers a new user account.
         *
         * Sends user credentials to the backend
         */
        signup: builder.mutation<SignupReqRes, SignupReqRes>({
            query: (body) => ({
                url: API_URL.SIGNUP,
                method: API_METHOD.HTTP_POST,
                body,
            }),
        }),
        /**
         * Authenticates a user using email and password credentials.
         *
         * Sends user credentials to the backend and returns
         * JWT tokens upon successful authentication.
         *
         */
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (body) => ({
                url: API_URL.LOGIN,
                method: API_METHOD.HTTP_POST,
                body,
            }),
            onQueryStarted(_, { dispatch, queryFulfilled }) {
                void queryFulfilled.then(
                    (response) => {
                        dispatch(setAuthentication(response.data.access));
                    },
                    () => {},
                );
            },
        }),
        /**
         * Provides new updated JWT tokens for API requests.
         *
         * Sends refresh token to backend and gets new refresh and
         * access token in return.
         */
        refresh: builder.mutation<RefreshResponse, void>({
            query: () => ({
                url: API_URL.REFRESH,
                method: API_METHOD.HTTP_POST,
            }),
            onQueryStarted(_, { dispatch, queryFulfilled }) {
                void queryFulfilled.then(
                    (response) => {
                        dispatch(setAuthentication(response.data.access));
                    },
                    () => {},
                );
            },
        }),
        /**
         * Send logout request to backend which in turn deletes refresh cookie
         */
        logout: builder.mutation<LogoutResponse, void>({
            query: () => ({
                url: API_URL.LOGOUT,
                method: API_METHOD.HTTP_POST,
            }),
            onQueryStarted(_, { dispatch, queryFulfilled }) {
                void queryFulfilled.then(
                    () => {
                        dispatch(setLogout());
                    },
                    () => {},
                );
            },
        }),

        /**
         * Retrieves profile data from backend
         */
        getProfile: builder.query<Profile, void>({
            query: () => ({
                url: API_URL.PROFILE,
                method: 'GET',
            }),
            providesTags: ['Profile'],
        }),

        /**
         * Makes patch request for editing profile and invalidates 'Profile' for refetching
         */
        editProfile: builder.mutation<Profile, Profile>({
            query: (body) => ({
                url: API_URL.PROFILE,
                method: API_METHOD.HTTP_PATCH,
                body,
            }),
            invalidatesTags: ['Profile'],
        }),
    }),
});

export const {
    useSignupMutation,
    useLoginMutation,
    useLogoutMutation,
    useRefreshMutation,
    useGetProfileQuery,
    useEditProfileMutation,
} = authApi;
