import { Snackbar, SnackbarCloseReason } from '@mui/material';
import Alert from '@mui/material/Alert';

import { useAppDispatch } from '@app';
import { setServerError } from '@feature';

import { SnackBarProps } from './SnackBar.types';

/**
 * Custom snackbar
 * @param {string} description - Description that should be displayed
 * @param {AlertColor} severity - severity of snackbar
 * @param {boolean} open - open state of snackbar
 * @param {Dispatch<React.SetStateAction<boolean>>} setOpen - setState function for open state
 */
export const SnackBar = ({
    description,
    severity,
    open,
    setOpen,
}: SnackBarProps) => {
    const dispatch = useAppDispatch();

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            void event;
            return;
        }

        setOpen(false);
        dispatch(setServerError(null));
    };

    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {description}
                </Alert>
            </Snackbar>
        </div>
    );
};
