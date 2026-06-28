import { ChangeEvent, useEffect, useMemo, useState } from 'react';

import { debounce, TextField } from '@mui/material';

import { SearchProps } from './Search.types';

/**
 * This component display search box with debounced search functionality
 *
 * @param label - Label of the search box
 * @param setData - State to update the data which triggers api call
 * @param variant - Variant of the textfield component
 * @param placeholder - Placeholder displayed in textField component
 * @param size - Size of the textField component
 */
export const Search = (props: SearchProps) => {
    /** Props */
    const {
        label,
        setData,
        variant = 'outlined',
        placeholder,
        size = 'medium',
    } = props;

    /** States */
    const [value, setValue] = useState<string>('');

    /** Functions */
    /**
     * This function handle the debouncing functionality
     */
    const debouncedSearch = useMemo(
        () =>
            debounce((newValue: string) => {
                setData(newValue);
            }, 300),
        [setData],
    );

    /**
     * This function triggers the debounce function when data change in search box
     */
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue(newValue);
        debouncedSearch(newValue);
    };

    /** Clean up function  */
    useEffect(() => () => debouncedSearch.clear(), [debouncedSearch]);

    return (
        <TextField
            variant={variant}
            label={label}
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
            size={size}
            slotProps={{
                htmlInput: {
                    'aria-label': label || placeholder,
                },
            }}
            fullWidth
        />
    );
};
