import { api } from 'service/api';

import { API_URL } from '@constant';
import { PaginatedResponse } from '@type';

import {
    Theater,
    TheaterRequest,
    TheaterRetrieveRequest,
} from './Theater.types';

export const theaterApi = api.injectEndpoints({
    endpoints: (builder) => ({
        /**
         * Retrieves theaters which comes as paginated response
         * @param {string} cursor - specifies next cursor to extract next page
         * @param {number[]} city - city id's for filtering
         */
        theaterList: builder.query<PaginatedResponse<Theater>, TheaterRequest>({
            query: ({ cursor, city }) => ({
                url: API_URL.THEATER,
                params: {
                    cursor,
                    city: city?.join(','),
                },
            }),
            serializeQueryArgs: ({ endpointName, queryArgs }) => {
                const { cursor, ...filters } = queryArgs;
                void cursor;
                return endpointName + JSON.stringify(filters);
            },

            merge: (currentCacheData, newItem) => {
                currentCacheData.results.push(...newItem.results);
                currentCacheData.next = newItem.next;
            },

            forceRefetch: ({ currentArg, previousArg }) =>
                currentArg?.cursor != previousArg?.cursor ||
                JSON.stringify(currentArg) != JSON.stringify(previousArg),
        }),

        /**
         * It retrieves particular theater using slug field
         * @param {string} slug - slug field that is used to extract theater in backend
         * @param {string} date - date for filtering
         */
        theaterRetrieve: builder.query<Theater, TheaterRetrieveRequest>({
            query: ({ slug, date }) => ({
                url: `${API_URL.THEATER}${slug}/`,
                params: {
                    date,
                },
            }),
        }),
    }),
});

export const { useTheaterListQuery, useTheaterRetrieveQuery } = theaterApi;
