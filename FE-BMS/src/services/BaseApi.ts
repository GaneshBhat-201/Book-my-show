import { API_TAGS, API_URL, ERROR_STATUS, TOKEN_KEY } from '@constant';
import { removeAuthCredentials, setAuthCredentials } from '@features';
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@store';
import { removeToken, setToken } from '@utils';

/**
 * Base api url
 */
const BASE_API_URL = import.meta.env.VITE_API_URL as string;

if (!BASE_API_URL) {
    throw new Error('VITE_API_URL environment variable is not defined');
}

/**
 * List of endpoints that require authentication header
 */
const authEndpoints = ['profile', 'booking', 'updateProfile'];

/**
 * Endpoints where refresh token not needed
 */
const noRefreshTryEndpoints = ['refreshToken'];

/**
 * Define base query with authorization header
 */
export const baseQuery = fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: (headers, { getState, endpoint }) => {
        const token = (getState() as RootState).auth.token;
        if (token && authEndpoints.includes(endpoint)) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

/**
 * Base query wrapper that automatically
 * handle access token expiration.
 *
 * If access token expire it calls the
 * refresh token which generate the new access token.
 *
 * If refresh token throw error,
 * logout the user
 */
export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (noRefreshTryEndpoints.includes(api.endpoint)) {
        return result;
    }

    if (result.error && result.error.status === ERROR_STATUS.UNAUTHORIZED) {
        try {
            const refreshResult = await baseQuery(
                {
                    url: API_URL.REFRESH_TOKEN,
                    method: 'POST',
                    credentials: 'include',
                },
                api,
                extraOptions,
            );

            if (refreshResult?.data) {
                const response = refreshResult.data as { access: string };
                api.dispatch(setAuthCredentials(response.access));
                setToken(TOKEN_KEY, response.access);
                result = await baseQuery(args, api, extraOptions);
            } else {
                api.dispatch(removeAuthCredentials());
                removeToken(TOKEN_KEY);
            }
        } catch {
            api.dispatch(removeAuthCredentials());
            removeToken(TOKEN_KEY);
        }
    }

    return result;
};

/**
 * Base RTK query, that acts as single entry
 * point for all endpoint in the app.
 */
export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: Object.values(API_TAGS),
    endpoints: () => ({}),
});
