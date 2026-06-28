import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

import { InputConfigType } from '@component/Form';
import { getToday } from '@utils';

import { SignupFormValues } from './Signup.types';

export const SignupInputConfig: InputConfigType<SignupFormValues>[] = [
    {
        label: 'Full Name',
        placeholder: 'Enter your full name',
        startIcon: <PersonOutlineOutlinedIcon />,
        name: 'name',
    },
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
    {
        name: 'confirmPassword',
        label: 'Confirm Password',
        type: 'password',
        placeholder: 'Confirm Password',
        startIcon: <LockOutlinedIcon />,
    },
    {
        name: 'gender',
        label: 'Gender',
        type: 'select',
        endIcon: <ArrowDropDownOutlinedIcon />,
        options: [
            {
                value: '',
                placeholder: 'Select gender',
            },
            {
                value: 'male',
                placeholder: 'Male',
            },
            {
                value: 'female',
                placeholder: 'Female',
            },
            {
                value: 'others',
                placeholder: 'Others',
            },
        ],
    },
    {
        name: 'dob',
        type: 'date',
        label: 'Date of birth',
        placeholder: 'Select date',
        startIcon: <CalendarTodayOutlinedIcon />,
        max: getToday(),
    },
];
