export type SnackbarSeverity = 'success' | 'error' | 'warning' | 'info';

/**
 * Represent state of snackbar
 */
export type SnackbarStateType = {
    /**
     * Key to track which message it is showing
     */
    key: number;
    /**
     * State to check whether snackbar is open or closed
     */
    open: boolean;
    /**
     * Message which need to be displayed in snackbar
     */
    message: string;
    /**
     * Severity of the alert
     */
    severity: SnackbarSeverity;
};

/**
 * Action payload of the snackbar reducer
 */
export type SnackbarPayload = Pick<SnackbarStateType, 'message' | 'severity'>;
