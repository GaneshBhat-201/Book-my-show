import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { InputConfigType } from '@component/Form';

import { LoginFormValues } from './Login.types';

export const LoginInputConfig: InputConfigType<LoginFormValues>[] = [
    {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        placeholder: 'Enter your email',
        startIcon: <EmailOutlinedIcon />,
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Enter your password',
        startIcon: <LockOutlinedIcon />,
    },
];
