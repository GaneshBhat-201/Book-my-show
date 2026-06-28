import type { Components } from '@mui/material/styles';

export const components: Components = {
    MuiCssBaseline: {
        styleOverrides: {
            html: {
                fontSize: '62.5%',
            },
        },
    },
    MuiButton: {
        styleOverrides: {
            root: {
                '&.Mui-disabled': {
                    pointerEvents: 'unset',
                    cursor: 'not-allowed',
                },
            },
        },
    },
};
