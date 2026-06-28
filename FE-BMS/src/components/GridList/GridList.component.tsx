import { Grid2 } from '@mui/material';

import { GridListProps } from './GridList.types';

/**
 * This component display lists in grid with generic render component
 *
 * @param itemSize - Optional itemSize of the grid item
 * @param itemsList - Items list that need to be displayed in grid
 * @param renderItem - React component in which item is displayed
 */
export const GridList = <T,>(props: GridListProps<T>) => {
    /** Props */
    const {
        itemSize = { xs: 12, sm: 6, lg: 4, xl: 3 },
        itemsList,
        renderItem,
    } = props;

    return (
        <Grid2 container rowSpacing={4} columnSpacing={3}>
            {itemsList.map((item, index) => (
                <Grid2
                    key={(item as { id: number })?.id ?? index}
                    display="flex"
                    justifyContent="center"
                    size={itemSize}
                >
                    {renderItem(item, index)}
                </Grid2>
            ))}
        </Grid2>
    );
};
