import { useSearchParams } from 'react-router';

import { useCityListQuery } from '@service';

export const useTheaterFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const { data: cities = [], isLoading: loadingCities } = useCityListQuery();

    const urlCity = searchParams.getAll('city');
    const urlDate = searchParams.get('date') || '';

    /**
     * Extracts search params from url and map it to ID
     */
    const appliedFilters = {
        cities: urlCity
            .map(
                (name) =>
                    cities.find(
                        (l) => l.name.toLowerCase() === name.toLowerCase(),
                    )?.id,
            )
            .filter((id): id is number => id !== undefined),
        date: urlDate || undefined,
    };

    /**
     * Validates and maps id to respective slug
     * @param {number[]} selectedCity - Array of selected city id's
     */
    const updateCityFilter = (selectedCity: number[]) => {
        const finalParams = new URLSearchParams();

        selectedCity?.forEach((id) => {
            const name = cities.find((l) => l.id === id)?.name;
            if (name) finalParams.append('city', name.toLowerCase());
        });

        setSearchParams(finalParams);
    };

    /**
     * Updates url
     * @param {string} date - Selected date
     */
    const updateDateFilter = (date: string) => {
        const finalParams = new URLSearchParams();

        if (date) finalParams.set('date', date);
        else finalParams.delete('date');

        setSearchParams(finalParams);
    };

    /**
     * Resets the url which clears all applied filter
     */
    const clearAllFilters = () => setSearchParams(new URLSearchParams());

    const isHelperLoading = !!loadingCities;

    return {
        cities,
        urlDate,
        appliedFilters,
        isHelperLoading,
        updateCityFilter,
        clearAllFilters,
        updateDateFilter,
    };
};
