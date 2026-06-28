import { RootState } from 'app/store.types';

import { API_METHOD, API_URL } from '@constant';
import { LoginApiErrorType } from '@container/Login';
import { setAuthentication, setLogout } from '@feature';
import {
    BaseQueryFn,
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { ApiError } from '@type';

import { LoginResponse } from './Auth/Auth.types';

const baseQuery: BaseQueryFn = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.accessToken;

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        return headers;
    },
});

/**
 * Wrapper function for baseQuery where new access and refresh token will be extracted
 * if we get 401-unauthorized when the access token get expired and if refresh token
 * is also expired then logout will be called.
 */
const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    const accessToken = (api.getState() as RootState).auth.accessToken;

    if (
        result.error &&
        (result.error as ApiError<LoginApiErrorType>).status === 401 &&
        api.endpoint != 'login' &&
        accessToken
    ) {
        const refershResult = await baseQuery(
            { url: API_URL.REFRESH, method: API_METHOD.HTTP_POST },
            api,
            extraOptions,
        );

        if (refershResult.data) {
            const newToken = (refershResult.data as LoginResponse).access;
            api.dispatch(setAuthentication(newToken));

            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(setLogout());
        }
    }

    return result;
};

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
    tagTypes: ['Profile'],
});
