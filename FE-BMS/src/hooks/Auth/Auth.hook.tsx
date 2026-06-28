import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { NOTIFICATIONS, ROUTES } from '@constant';
import { showSnackbar } from '@features';
import {
    AuthApiErrorType,
    AuthApiResponseType,
    LoginRequestType,
    RegisterApiRequestType,
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
} from '@services';
import { AppDispatch } from '@store';

import { LocationState } from './Auth.types';

/**
 * Auth hook that returns authentication actions and there states
 */
export const useAuth = () => {
    /** Hooks */
    const dispatch = useDispatch<AppDispatch>();
    const [register, { isLoading: registerLoading }] = useRegisterMutation();
    const [login, { isLoading: loginLoading }] = useLoginMutation();
    const [logout] = useLogoutMutation();
    const location = useLocation();
    const navigate = useNavigate();

    const to = location.state as LocationState | null;

    /** Functions */
    /**
     * Function to handle auth actions
     * @param action - Specific action which need to execute
     * @param successMsg - Success message which need to be displayed in snackbar
     */
    const handleAuthAction = async <T extends AuthApiResponseType>(
        action: () => Promise<T>,
        successMsg: string,
    ) => {
        try {
            await action();
            dispatch(
                showSnackbar({
                    message: successMsg,
                    severity: 'success',
                }),
            );
            void navigate(to?.from || ROUTES.HOME, { replace: true });
        } catch (error: unknown) {
            const err = error as AuthApiErrorType;
            const errors = err?.data;
            const errValue = errors ? Object.values(errors)[0] : undefined;
            if (errValue && errValue.length > 0) {
                dispatch(
                    showSnackbar({
                        message: errValue[0],
                        severity: 'error',
                    }),
                );
            } else {
                dispatch(
                    showSnackbar({
                        message: NOTIFICATIONS.ERROR,
                        severity: 'error',
                    }),
                );
            }
        }
    };

    /**
     * Function that handle register action
     * @param data - Request body for the register api
     */
    const handleRegister = async (data: RegisterApiRequestType) => {
        await handleAuthAction(
            () => register(data).unwrap(),
            NOTIFICATIONS.REGISTER_SUCCESS,
        );
    };

    /**
     * Function that handle login action
     * @param data - Request body for the login api
     */
    const handleLogin = async (data: LoginRequestType) => {
        await handleAuthAction(
            () => login(data).unwrap(),
            NOTIFICATIONS.LOGIN_SUCCESS,
        );
    };

    /**
     * Function that trigger user logout
     */
    const handleLogout = async () => {
        try {
            await logout().unwrap();
        } catch {
            dispatch(
                showSnackbar({
                    message: NOTIFICATIONS.ERROR,
                    severity: 'error',
                }),
            );
        }
    };

    return {
        handleRegister,
        registerLoading,
        handleLogin,
        loginLoading,
        handleLogout,
    };
};
