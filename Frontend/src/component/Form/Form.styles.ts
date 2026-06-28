import { styled, TextField } from '@mui/material';

import { COLORS } from '@constant';

export const InputStyled = styled(TextField)(
    ({ theme: { typography, palette } }) => ({
        minHeight: typography.pxToRem(52),

        '& .MuiInputBase-root': {
            backgroundColor: palette.action.active,
            borderRadius: typography.pxToRem(12),
            height: typography.pxToRem(48),
        },

        '& .MuiInputBase-input': {
            height: typography.pxToRem(12),
            borderRadius: typography.pxToRem(12),
        },

        '& fieldset': {
            border: 'none',
        },

        '&:hover fieldset': {
            border: 'none',
        },

        '& .Mui-focused fieldset': {
            border: 'none',
        },

        '& .MuiSelect-icon': {
            color: palette.text.primary,
        },

        '& .MuiInputAdornment-positionStart': {
            color: COLORS.GREY[300],
        },

        '& .MuiFormLabel-root': {
            color: palette.text.primary,
            top: typography.pxToRem(-15),
            ...typography.h6,
        },

        '& .MuiSelect-select': {
            textAlign: 'left',
        },
    }),
);
