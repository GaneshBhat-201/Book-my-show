import { useSearchParams } from 'react-router';

import { useGenreListQuery, useLanguageListQuery } from '@service';

export const useMovieFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const { data: languages = [], isLoading: loadingLanguages } =
        useLanguageListQuery();
    const { data: genres = [], isLoading: loadingGenres } = useGenreListQuery();

    const urlLanguages = searchParams.getAll('language');
    const urlGenres = searchParams.getAll('genre');
    const urlDate = searchParams.get('date') || '';

    /**
     * Extracts search params from url and maps to id
     */
    const appliedFilters = {
        languages: urlLanguages
            .map(
                (name) =>
                    languages.find(
                        (l) => l.name.toLowerCase() === name.toLowerCase(),
                    )?.id,
            )
            .filter((id): id is number => id !== undefined),
        genres: urlGenres
            .map(
                (name) =>
                    genres.find(
                        (g) => g.name.toLowerCase() === name.toLowerCase(),
                    )?.id,
            )
            .filter((id): id is number => id !== undefined),
        date: urlDate || undefined,
    };

    /**
     * Updates search params based on id passed by mapping it to name
     * @param {number[]} selectedGenres - id's of selected genre
     * @param {number[]} selectedLanguages - id's pf selected language
     * @param {string} selectedDate - date
     */
    const updateFilters = (
        selectedGenres: number[],
        selectedLanguages?: number[],
        selectedDate?: string,
    ) => {
        const finalParams = new URLSearchParams();
        if (selectedDate) finalParams.set('date', selectedDate);
        else finalParams.delete('date');

        selectedLanguages?.forEach((id) => {
            const name = languages.find((l) => l.id === id)?.name;
            if (name) finalParams.append('language', name.toLowerCase());
        });

        selectedGenres.forEach((id) => {
            const name = genres.find((g) => g.id === id)?.name;
            if (name) finalParams.append('genre', name.toLowerCase());
        });

        setSearchParams(finalParams);
    };

    /**
     * resets url so that all search params will be erased
     */
    const clearAllFilters = () => setSearchParams(new URLSearchParams());

    const isHelperLoading = !!loadingLanguages || !!loadingGenres;

    return {
        languages,
        genres,
        urlDate,
        appliedFilters,
        isHelperLoading,
        updateFilters,
        clearAllFilters,
    };
};
