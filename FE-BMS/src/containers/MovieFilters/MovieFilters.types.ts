import { Dispatch, SetStateAction } from 'react';

import { MovieApiParamType } from '@services';

export interface MovieFiltersProps {
    appliedFilters: MovieApiParamType;
    setApplyFilters: Dispatch<SetStateAction<MovieApiParamType>>;
    onClose?: () => void;
}
