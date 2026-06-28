import { useState } from 'react';

import { Box, Button, Stack, Typography, useTheme } from '@mui/material';

import { useAppDispatch } from '@app';
import { CarouselCard } from '@component/CarouselCard';
import { Form } from '@component/Form';
import { setServerError } from '@feature';
import { Profile, useEditProfileMutation, useGetProfileQuery } from '@service';
import { ApiError } from '@type';

import { ProfileContainer } from './Profile.styles';
import {
    ProfileEditForm,
    ProfileFormErrorType,
    ProfileServerError,
} from './Profile.types';
import { ProfileInputConfig } from './ProfileConfig';
import { ProfileSkeleton } from './ProfilePage.skeleton';
import { validate } from './ProfileValidation';

export const ProfilePage = () => {
    const theme = useTheme();
    const { data, isFetching } = useGetProfileQuery();
    const [edit, { isLoading }] = useEditProfileMutation();
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const numberCode = '+91';
    const [errors, setErrors] = useState<ProfileFormErrorType>({});
    const dispatch = useAppDispatch();

    const defaultValues = {
        name: data?.name || '',
        gender: data?.gender || '',
        dob: data?.date_of_birth || '',
        phoneNumber: data?.phone_number?.slice(3) || '',
    };

    const handleClick = () => {
        setIsEdit(!isEdit);
    };

    const onSubmit = async (profile: ProfileEditForm) => {
        const validationError = validate(profile);

        if (Object.keys(validationError).length > 0) {
            setErrors(validationError);
            return;
        }
        const { phoneNumber, ...rest } = profile;
        let EditedProfile: Profile = { ...rest, date_of_birth: profile.dob };

        if (Boolean(profile.phoneNumber)) {
            EditedProfile = {
                ...EditedProfile,
                date_of_birth: profile.dob,
                phone_number: numberCode + phoneNumber,
            };
        }

        try {
            await edit(EditedProfile).unwrap();
            setIsEdit(false);
            setErrors({});
        } catch (err) {
            const error = err as ApiError<ProfileServerError>;
            const [key, value] = Object.entries(error.data)[0];
            void key;
            dispatch(setServerError(value[0]));
        }
    };

    return (
        <Box>
            <CarouselCard
                title="Your Profile"
                description="Everything about you"
            />
            <Stack
                width={'100%'}
                height={'100%'}
                justifyContent={'center'}
                alignItems={'center'}
                padding={theme.spacing(8)}
            >
                {isFetching ? (
                    <ProfileSkeleton />
                ) : (
                    <ProfileContainer>
                        <Typography variant="h2">Profile</Typography>
                        <Stack spacing={theme.spacing(2)}>
                            {data ? (
                                isEdit ? (
                                    <Form
                                        errors={errors}
                                        handleSubmit={onSubmit}
                                        inputs={ProfileInputConfig}
                                        button="Save"
                                        isLoading={isLoading}
                                        defaultValues={defaultValues}
                                    />
                                ) : (
                                    Object.entries(data).map(([key, value]) => {
                                        const refactoredKey = key
                                            .split('_')
                                            .join(' ');
                                        const property = `${key.charAt(0).toUpperCase()}${refactoredKey.slice(1)}`;
                                        return value ? (
                                            <Stack
                                                key={key}
                                                direction={'row'}
                                                gap={theme.spacing(2)}
                                            >
                                                <Typography variant="h5">
                                                    {property}:{' '}
                                                </Typography>
                                                <Typography variant="body1">
                                                    {value}
                                                </Typography>
                                            </Stack>
                                        ) : null;
                                    })
                                )
                            ) : null}
                        </Stack>
                        {!isEdit ? (
                            <Button
                                variant="contained"
                                sx={{
                                    width: 'max-content',
                                    position: 'absolute',
                                    top: 20,
                                    right: 20,
                                }}
                                onClick={handleClick}
                            >
                                Edit
                            </Button>
                        ) : null}
                    </ProfileContainer>
                )}
            </Stack>
        </Box>
    );
};
