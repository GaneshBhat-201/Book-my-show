import { Autocomplete, TextField } from '@mui/material';

import { FilterProps, ListItemTypes } from './Filter.types';

/**
 * This component display the autocomplete filter, handle both multiselect and single value
 *
 * @param isMultiple - Used to support multiple selection
 * @param label - Label of the filter field
 * @param listItems - Items that need to be displayed as filter option
 * @param setValue - Function that handle onchange
 * @param value - Selected item for the filter
 * @param onLoading - Loading state to be shown when filter values fetched
 */
export const Filter = (props: FilterProps) => {
    /** Props */
    const {
        isMultiple,
        label,
        listItems,
        setValue,
        value,
        onLoading,
        noOptionsText,
    } = props;

    return (
        <Autocomplete
            loading={onLoading}
            multiple={isMultiple}
            color="primary"
            options={listItems}
            getOptionLabel={(option) => option.label}
            value={value}
            onChange={(_, newValue) => {
                if (isMultiple) {
                    setValue(newValue as ListItemTypes[]);
                } else {
                    setValue(newValue as ListItemTypes | null);
                }
            }}
            filterSelectedOptions
            renderInput={(params) => (
                <TextField {...params} label={label} placeholder={label} />
            )}
            noOptionsText={noOptionsText}
        />
    );
};
