import { ChangeEvent } from 'react';

import { SelectChangeEvent } from '@mui/material';

export type SelectType = {
    id: number;
    name: string;
};

export type FilterOptions<T> = {
    name: keyof T;
    label: string;
    type: 'select' | 'date';
    options?: SelectType[];
};

export type FilterProps<T> = {
    filters: T;
    count?: Partial<Record<keyof T, number>>;
    filterOptions: FilterOptions<T>[];
    handleChange?: (event: SelectChangeEvent<string[]>) => void;
    handleInputChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    handleClear: () => void;
};
