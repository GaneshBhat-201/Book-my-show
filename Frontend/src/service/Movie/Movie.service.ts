import { api } from 'service/api';

import { API_URL } from '@constant';
import { PaginatedResponse } from '@type';

import { Movie, MovieQueryParams, MovieRetrieveRequest } from './Movie.types';

export const movieApi = api.injectEndpoints({
    endpoints: (builder) => ({
        /**
         * Get first 3 latest movies from backend
         */
        latestMovies: builder.query<PaginatedResponse<Movie>, void>({
            query: () => ({
                url: API_URL.MOVIE,
                params: {
                    page_size: 3,
                },
            }),
        }),

        /**
         * Retrieves movie list which comes as paginated response
         * @param {string} cursor - cursor to retrieve next page
         * @param {string} date - date param for filtering
         * @param {number[]} genre - genre id's for filtering
         * @param {number[]} language - language id's for filtering
         */
        movieList: builder.query<PaginatedResponse<Movie>, MovieQueryParams>({
            query: ({ cursor, genre, language, date }) => ({
                url: API_URL.MOVIE,
                params: {
                    cursor,
                    genre: genre?.join(','),
                    language: language?.join(','),
                    date,
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
                currentArg?.cursor !== previousArg?.cursor ||
                JSON.stringify(currentArg) !== JSON.stringify(previousArg),
        }),

        movieRetrieve: builder.query<Movie, MovieRetrieveRequest>({
            query: ({ slug, date }) => ({
                url: `${API_URL.MOVIE}${slug}/`,
                params: {
                    date,
                },
            }),
        }),
    }),
});

export const {
    useLatestMoviesQuery,
    useMovieListQuery,
    useMovieRetrieveQuery,
} = movieApi;
