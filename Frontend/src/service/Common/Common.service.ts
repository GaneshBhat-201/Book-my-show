import { api } from 'service/api';

import { API_URL } from '@constant';

import { CityResponse, GenreResponse, LanguageResponse } from './Common.types';

export const commonApi = api.injectEndpoints({
    endpoints: (builder) => ({
        genreList: builder.query<GenreResponse, void>({
            query: () => ({
                url: API_URL.GENRE,
            }),
        }),
        languageList: builder.query<LanguageResponse, void>({
            query: () => ({
                url: API_URL.LANGUAGE,
            }),
        }),
        cityList: builder.query<CityResponse, void>({
            query: () => ({
                url: API_URL.CITY,
            }),
        }),
    }),
});

export const { useGenreListQuery, useCityListQuery, useLanguageListQuery } =
    commonApi;
