import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

import { InputConfigType } from '@component/Form';
import { getToday } from '@utils';

import { ProfileEditForm } from './Profile.types';

export const ProfileInputConfig: InputConfigType<ProfileEditForm>[] = [
    {
        label: 'Full Name',
        placeholder: 'Enter your full name',
        startIcon: <PersonOutlineOutlinedIcon />,
        name: 'name',
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
    {
        name: 'phoneNumber',
        label: 'Phone number',
        type: 'tel',
        placeholder: 'Enter your phone number',
        startIcon: <LocalPhoneIcon />,
    },
];
