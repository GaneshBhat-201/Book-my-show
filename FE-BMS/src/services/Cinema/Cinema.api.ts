import { baseApi } from 'services/BaseApi';

import { API_URL } from '@constant';

import {
    CinemaApiParamType,
    CinemaDetailsApiResponse,
    CinemaListApiResponse,
} from './Cinema.types';

/**
 * Consist of Cinemas endpoints
 */
export const cinemaApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /**
         * Endpoint to fetch all cinemas.
         *
         * It also consist of params to filter cinemas
         */
        cinemaWithFilter: builder.query<
            CinemaListApiResponse,
            CinemaApiParamType
        >({
            query: (data) => ({
                url: API_URL.CINEMAS,
                method: 'GET',
                params: data,
            }),
        }),
        cinemaDetails: builder.query<CinemaDetailsApiResponse, string>({
            query: (id) => ({
                url: `${API_URL.CINEMAS}${encodeURIComponent(id)}/`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useCinemaWithFilterQuery, useCinemaDetailsQuery } = cinemaApi;
