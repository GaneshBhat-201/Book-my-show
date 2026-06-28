import { AlertColor } from '@mui/material';

export type SnackBarProps = {
    description: string;
    severity: AlertColor;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
