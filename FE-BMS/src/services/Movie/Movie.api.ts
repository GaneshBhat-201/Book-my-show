import { baseApi } from 'services/BaseApi';

import { API_URL } from '@constant';

import {
    FilterOptionsType,
    GenreApiResponseType,
    LanguageApiResponseType,
    MovieApiParamType,
    MovieApiResponseType,
    MovieResponseData,
    MovieShowtimesResponseType,
} from './Movie.types';

/**
 * Consist of movie endpoints
 */
export const movieApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /**
         * Takes params and return the list of movies with filters
         */
        movieWithFilter: builder.query<MovieApiResponseType, MovieApiParamType>(
            {
                query: (params) => {
                    const transformedParams = {
                        ...params,
                        languages: params?.languages
                            ?.map((lang) => lang.id)
                            .join(','),
                        genres: params?.genres
                            ?.map((genre) => genre.id)
                            .join(','),
                    };
                    return {
                        url: API_URL.MOVIES,
                        method: 'GET',
                        params:
                            Object.keys(params).length === 0
                                ? undefined
                                : transformedParams,
                    };
                },
            },
        ),
        /**
         * Takes movie id and return movie details
         */
        movieDetails: builder.query<MovieResponseData, string>({
            query: (id) => ({
                url: `${API_URL.MOVIES}${encodeURIComponent(id)}`,
                method: 'GET',
            }),
        }),
        /**
         * Takes movie id and return cinemas with slot details
         */
        movieShowtimes: builder.query<MovieShowtimesResponseType, string>({
            query: (id) => ({
                url: `${API_URL.MOVIES}${encodeURIComponent(id)}${API_URL.CINEMAS}`,
                method: 'GET',
            }),
        }),
        /**
         * Endpoint to fetch languages of movies
         */
        languages: builder.query<FilterOptionsType, void>({
            query: () => ({
                url: API_URL.MOVIE_LANGUAGES,
                method: 'GET',
            }),
            transformResponse: (response: LanguageApiResponseType) =>
                response.map((lang) => ({
                    label: lang.lang_name,
                    id: lang.id,
                })),
            keepUnusedDataFor: 3600,
        }),
        /**
         * Endpoint to fetch genres of movies
         */
        genres: builder.query<FilterOptionsType, void>({
            query: () => ({
                url: API_URL.MOVIE_GENRES,
                method: 'GET',
            }),
            transformResponse: (response: GenreApiResponseType) =>
                response.map((lang) => ({
                    label: lang.genre_name,
                    id: lang.id,
                })),
            keepUnusedDataFor: 3600,
        }),
    }),
});

export const {
    useMovieWithFilterQuery,
    useLanguagesQuery,
    useGenresQuery,
    useMovieDetailsQuery,
    useMovieShowtimesQuery,
} = movieApi;
