import { ReactNode } from 'react';

import { GridSize } from '@mui/material';
import { ResponsiveStyleValue } from '@mui/system';

/**
 * Props of the grid list component
 */
export interface GridListProps<T> {
    /**
     * Optional item size of the grid items
     */
    itemSize?: ResponsiveStyleValue<GridSize>;
    /**
     * List of items that need to be displayed in grid
     */
    itemsList: T[];
    /**
     * Component used to display item
     */
    renderItem: (item: T, index: number) => ReactNode;
}
