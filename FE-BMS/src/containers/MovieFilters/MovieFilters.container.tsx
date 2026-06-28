import { FormEvent, useEffect, useState } from 'react';

import dayjs, { Dayjs } from 'dayjs';

import { Button, Stack, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

import { Filter } from '@components';
import {
    FilterOptionsType,
    MovieApiParamType,
    useGenresQuery,
    useLanguagesQuery,
} from '@services';

import { MovieFiltersProps } from './MovieFilters.types';

/**
 * Container consist of different movie filters
 *
 * @param setApplyFilters - Function to set the filter value which trigger the movie filter api
 */
export const MovieFilters = ({
    appliedFilters,
    setApplyFilters,
    onClose,
}: MovieFiltersProps) => {
    /** States */
    const [languages, setLanguages] = useState<FilterOptionsType>([]);
    const [genres, setGenres] = useState<FilterOptionsType>([]);
    const [date, setDate] = useState<Dayjs | null>(null);

    /** Hooks */
    const {
        data: languageData,
        isLoading: languageLoading,
        isError: isLanguageError,
        refetch: languageRefetch,
    } = useLanguagesQuery();
    const {
        data: genreData,
        isLoading: genreLoading,
        isError: isGenreError,
        refetch: genreRefetch,
    } = useGenresQuery();

    /** Functions */
    /**
     * Function handle apply filters
     */
    const handleApplyFilters = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const nextFilters: MovieApiParamType = {};

        if (languages.length > 0) {
            nextFilters.languages = languages
                .slice()
                .sort((a, b) => a.id - b.id);
        }

        if (genres.length > 0) {
            nextFilters.genres = genres.slice().sort((a, b) => a.id - b.id);
        }

        if (date) {
            nextFilters.date = date.format('YYYY-MM-DD');
        }

        setApplyFilters(nextFilters);
        onClose?.();
    };

    /**
     * Function that remove all the filters
     */
    const handleRemoveFilters = () => {
        setLanguages([]);
        setGenres([]);
        setDate(null);
        setApplyFilters({});
        onClose?.();
    };

    /**
     * Function that handle refetching of filters
     */
    const handleRefetchFilters = async () => {
        await languageRefetch();
        await genreRefetch();
    };

    /** Constants */
    const isFormEmpty = languages.length === 0 && genres.length === 0 && !date;
    const isFiltersEmpty = Object.keys(appliedFilters).length === 0;

    /** Effects */
    useEffect(() => {
        setLanguages(appliedFilters.languages || []);
        setGenres(appliedFilters.genres || []);
        setDate(appliedFilters?.date ? dayjs(appliedFilters.date) : null);
    }, [appliedFilters]);

    return (
        <Stack
            component="form"
            onSubmit={handleApplyFilters}
            width={{ xs: '100%', md: 280 }}
            gap={4}
        >
            <Typography variant="h2">Filters</Typography>
            {(isLanguageError || isGenreError) && (
                <Stack justifyContent="center" alignItems="center" gap={2}>
                    <Typography variant="h5" color="error" textAlign="center">
                        There is something wrong fetching filter options.
                    </Typography>
                    <Button
                        type="button"
                        variant="contained"
                        sx={{ width: 'fit-content ' }}
                        onClick={handleRefetchFilters}
                    >
                        Retry
                    </Button>
                </Stack>
            )}
            <Filter
                listItems={languageData || []}
                value={languages}
                setValue={setLanguages}
                label="Languages"
                isMultiple={true}
                onLoading={languageLoading}
                noOptionsText={
                    isLanguageError
                        ? 'Unable to load language filters.'
                        : 'No languages available.'
                }
            />
            <Filter
                listItems={genreData || []}
                value={genres}
                setValue={setGenres}
                label="Genres"
                isMultiple={true}
                onLoading={genreLoading}
                noOptionsText={
                    isGenreError
                        ? 'Unable to load genre filters.'
                        : 'No genres available.'
                }
            />
            <DatePicker
                label="Date"
                value={date}
                slotProps={{ textField: { readOnly: true } }}
                onChange={(newDate) => setDate(newDate)}
                disablePast
            />
            <Stack gap={1}>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ py: 3, mt: 3 }}
                    disabled={isFormEmpty}
                >
                    Apply Filters
                </Button>
                <Button
                    type="button"
                    variant="outlined"
                    sx={{ py: 3, mt: 3 }}
                    onClick={handleRemoveFilters}
                    disabled={isFiltersEmpty}
                >
                    Remove Filters
                </Button>
            </Stack>
        </Stack>
    );
};
