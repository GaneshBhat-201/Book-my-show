import { InputStyled } from 'component/Form/Form.styles';

import { InputAdornment, MenuItem } from '@mui/material';

import { SelectInputProps } from './SelectInput.types';

/**
 * Select TextField
 * @param {Array} options - options that are provided for select field
 * @param {ReactNode} startIcon - start icon for input
 * @param {ReactNode} endIcon - end icon for input
 */
export const SelectInput = ({
    options,
    startIcon,
    endIcon,
    ...rest
}: SelectInputProps) => (
    <InputStyled
        select
        {...rest}
        slotProps={{
            input: {
                startAdornment: startIcon ? (
                    <InputAdornment position="start">
                        {startIcon}
                    </InputAdornment>
                ) : null,
                endAdornment: endIcon ? (
                    <InputAdornment position="end">{endIcon}</InputAdornment>
                ) : null,
            },
            inputLabel: { shrink: true },
            select: { displayEmpty: true },
        }}
    >
        {options?.map((option, index) => (
            <MenuItem
                key={option.value}
                value={option.value}
                disabled={index == 0}
            >
                {option.placeholder}
            </MenuItem>
        ))}
    </InputStyled>
);
