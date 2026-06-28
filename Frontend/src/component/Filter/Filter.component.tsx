import {
    Button,
    Checkbox,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';

import { getToday } from '@utils';

import {
    StyledChip,
    StyledFormControl,
    StyledTextField,
} from './Filter.styles';
import { FilterProps } from './Filter.types';

/**
 * Filter component
 * @param filters - filter state that will be interconnected to filter fiels
 * @param filterOptions -  config file to create fields accordingly
 * @param count - count state used to update number of selected filter
 * @param handleChange - function that has to be executed when changes happens in select field
 * @param handleInputChange - function that has to be executed when single input field changes
 * @param handleClear - function that to be executed when clear button is clicked
 */
export const Filter = <T,>({
    filters,
    filterOptions,
    count,
    handleChange,
    handleInputChange,
    handleClear,
}: FilterProps<T>) => {
    const theme = useTheme();

    return (
        <Stack
            direction={'row'}
            gap={theme.spacing(6)}
            flexWrap={{ xs: 'wrap', sm: 'nowrap' }}
            alignItems={'center'}
            width={'100%'}
        >
            <Typography variant="h4">Filters:</Typography>
            {filterOptions.map((option) =>
                option.type === 'select' ? (
                    <StyledFormControl key={String(option.name)}>
                        <InputLabel id={String(option.name)}>
                            <Typography variant="h5" color="text.primary">
                                {option.label}
                            </Typography>
                        </InputLabel>
                        <Select
                            labelId={String(option.name)}
                            multiple
                            value={(filters[option.name] as string[]) || []}
                            onChange={handleChange}
                            renderValue={(selected) => {
                                void selected;
                                return option.label;
                            }}
                            input={
                                <OutlinedInput label={String(option.name)} />
                            }
                            name={String(option.name)}
                            sx={{ height: theme.typography.pxToRem(36) }}
                        >
                            {option.options?.map((obj) => (
                                <MenuItem key={obj.id} value={String(obj.id)}>
                                    <Checkbox
                                        checked={(
                                            filters[option.name] as string[]
                                        )?.includes(String(obj.id))}
                                    />
                                    <ListItemText primary={obj.name} />
                                </MenuItem>
                            ))}
                        </Select>
                        {(count?.[option?.name] ?? 0 > 0) ? (
                            <StyledChip
                                color="primary"
                                label={count?.[option.name]}
                            />
                        ) : null}
                    </StyledFormControl>
                ) : (
                    <StyledFormControl key={String(option.name)}>
                        <StyledTextField
                            type={option.type}
                            id={String(option.name)}
                            name={String(option.name)}
                            variant="outlined"
                            value={filters[option.name]}
                            sx={{ height: theme.typography.pxToRem(36) }}
                            label={String(option.name)}
                            onChange={handleInputChange}
                            slotProps={{
                                htmlInput: { min: getToday() },
                                inputLabel: { shrink: true },
                            }}
                        />
                    </StyledFormControl>
                ),
            )}

            <Button
                variant="contained"
                sx={{ width: { xs: '100%', md: 'auto' } }}
                onClick={handleClear}
            >
                Clear
            </Button>
        </Stack>
    );
};
