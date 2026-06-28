import { Chip, FormControl, styled, TextField } from '@mui/material';

export const StyledFormControl = styled(FormControl)(
    ({ theme: { typography, palette, breakpoints } }) => ({
        width: '100%',
        height: typography.pxToRem(36),
        position: 'relative',

        [breakpoints.up('md')]: {
            width: typography.pxToRem(300),
        },

        '& .MuiSelect-select': {
            padding: 0,
        },

        '& .MuiInputLabel-root': {
            top: -8,
        },

        '& .MuiSvgIcon-root': {
            color: palette.text.primary,
        },

        '& .MuiInputBase-root': {
            padding: typography.pxToRem(8),
        },
    }),
);

export const StyledTextField = styled(TextField)(
    ({ theme: { typography } }) => ({
        '& .MuiInputBase-root, & .MuiInputBase-input': {
            height: '100%',
            padding: typography.pxToRem(6),
        },
    }),
);

export const StyledChip = styled(Chip)(({ theme: { typography } }) => ({
    height: typography.pxToRem(18),
    width: typography.pxToRem(18),
    position: 'absolute',
    top: 5,
    right: 8,
    textAlign: 'center',

    '& .MuiChip-label': {
        padding: 0,
    },
}));
