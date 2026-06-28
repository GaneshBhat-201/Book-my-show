import { ChangeEvent, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { Edit } from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    IconButton,
    Stack,
    TextField,
    useTheme,
} from '@mui/material';

import { PhoneInput } from '@components';
import { NOTIFICATIONS } from '@constant';
import { showSnackbar } from '@features';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateProfileMutation } from '@services';
import { RootState } from '@store';

import { EditProfileForm, ProfileSchema } from './Profile.schema';

/**
 * This container represent the edit profile form
 * @param closeModal - Function used to close modal
 */
export const EditProfile = ({ handleClose }: { handleClose: () => void }) => {
    /** States */
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [avatar, setAvatar] = useState<File | null>(null);

    /** Hooks */
    const { palette } = useTheme();
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors, dirtyFields },
        control,
    } = useForm<EditProfileForm>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            phone_number: user?.phone_number,
            name: user?.name,
        },
    });
    const [trigger, { isLoading }] = useUpdateProfileMutation();

    /** Functions */
    /**
     * Function trigger when avatar input is changed
     */
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) return;

        setPreviewUrl(URL.createObjectURL(file));
        setAvatar(file);
    };

    /**
     * Function that trigger when form is submitted
     * @param data - It consist of name and phone number
     */
    const onSubmit = async (data: EditProfileForm) => {
        const formData = new FormData();

        if (dirtyFields?.name) {
            formData.append('name', data?.name.trim().replace(/\s+/g, ' '));
        }

        if (dirtyFields?.phone_number) {
            formData.append('phone_number', data?.phone_number);
        }

        if (avatar) {
            formData?.append('avatar', avatar);
        }

        try {
            await trigger(formData).unwrap();
            dispatch(
                showSnackbar({
                    message: NOTIFICATIONS.PROFILE_UPDATE_SUCCESS,
                    severity: 'success',
                }),
            );
            handleClose();
        } catch {
            dispatch(
                showSnackbar({
                    message: NOTIFICATIONS.ERROR,
                    severity: 'error',
                }),
            );
        }
    };

    /** Effects */
    useEffect(() => {
        setPreviewUrl(user?.avatar || '');
    }, [user]);

    useEffect(
        () => () => {
            if (previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
        },
        [previewUrl],
    );

    return (
        <Stack
            onSubmit={handleSubmit(onSubmit)}
            component="form"
            gap={6}
            py={4}
            width={{ xs: 280, sm: 400 }}
            maxWidth="100%"
        >
            <Box
                alignSelf="center"
                position="relative"
                width={100}
                height={100}
            >
                <Avatar
                    src={previewUrl}
                    alt={user?.name}
                    sx={{ height: 100, width: 100 }}
                />
                <IconButton
                    component="label"
                    sx={{ position: 'absolute', bottom: 0, right: -5 }}
                    aria-label="edit avatar"
                >
                    <Edit
                        sx={{
                            background: palette.primary.main,
                            borderRadius: '50%',
                            p: 1,
                        }}
                    />
                    <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </IconButton>
            </Box>
            <TextField
                fullWidth
                label="Full Name"
                {...register('name')}
                autoComplete="name"
                error={!!errors.name}
                helperText={errors.name?.message}
            />
            <PhoneInput name="phone_number" control={control} />
            <Button
                type="submit"
                variant="contained"
                sx={{ py: 3, mt: 3 }}
                disabled={Object.entries(dirtyFields).length === 0 && !avatar}
                loading={isLoading}
            >
                Save
            </Button>
        </Stack>
    );
};
