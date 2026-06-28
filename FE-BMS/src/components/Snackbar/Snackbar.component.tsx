import { SyntheticEvent } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Alert, Snackbar, SnackbarCloseReason } from '@mui/material';

import { hideSnackbar } from '@features';
import { AppDispatch, RootState } from '@store';

/**
 * It is a snackbar component that uses to display messages globally.
 * It is managed by the snackbar slice.
 */
export const GlobalSnackbar = () => {
    /** Hooks */
    const dispatch = useDispatch<AppDispatch>();
    const { key, open, message, severity } = useSelector(
        (state: RootState) => state.snackbar,
    );

    /** Functions */
    /**
     * Function used to close the snackbar
     * @param reason - Used to control the response to onClose
     */
    const handleClose = (
        _: Event | SyntheticEvent<Element, Event>,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(hideSnackbar());
    };

    return (
        <Snackbar
            key={key}
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
            <Alert onClose={handleClose} severity={severity} variant="filled">
                {message}
            </Alert>
        </Snackbar>
    );
};
