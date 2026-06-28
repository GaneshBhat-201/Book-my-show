import { useState } from 'react';

import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Paper,
    Skeleton,
    Stack,
    Typography,
} from '@mui/material';

import { CustomModal } from '@components';
import { EditProfile } from '@containers/EditProfile';
import { useProfileQuery } from '@services';

/**
 * This container used to display user details
 */
export const ProfileContainer = () => {
    /** States */
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    /** Hooks */
    const { data, isLoading, isError, refetch } = useProfileQuery();

    /**
     * Functions
     */
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    /** Loading state */
    if (isLoading) {
        return (
            <Stack flex={1} alignItems="center" justifyContent="center">
                <Skeleton
                    variant="rounded"
                    sx={{ width: { xs: '100%', md: 500 } }}
                    height={500}
                />
            </Stack>
        );
    }

    /** Error state */
    if (isError || !data) {
        return (
            <Stack flex={1} gap={2} justifyContent="center" alignItems="center">
                <Typography variant="h4" color="error" textAlign="center">
                    Failed to load user details. Please try again.
                </Typography>
                <Button variant="contained" onClick={() => refetch()}>
                    Retry
                </Button>
            </Stack>
        );
    }

    return (
        <Stack flex={1} justifyContent="center" alignItems="center">
            <Card sx={{ minWidth: { xs: '100%', md: 500 }, borderRadius: 2 }}>
                <CardContent>
                    <Stack gap={6} alignItems="center">
                        <Box
                            width="100%"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography variant="h2">Profile</Typography>
                            <Button
                                variant="text"
                                color="error"
                                onClick={handleOpen}
                            >
                                Edit
                            </Button>
                        </Box>
                        <Avatar
                            src={data.avatar ?? ''}
                            alt={data.name}
                            sx={{ height: 100, width: 100 }}
                        />

                        <Stack gap={4} width="100%">
                            <Typography variant="h3">
                                Account Details
                            </Typography>
                            <Paper
                                variant="outlined"
                                sx={{
                                    p: 2,
                                    width: '100%',
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    color="textDisabled"
                                >
                                    Full Name:
                                </Typography>
                                <Typography>{data.name}</Typography>
                            </Paper>

                            <Paper
                                variant="outlined"
                                sx={{
                                    p: 2,
                                    width: '100%',
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    color="textDisabled"
                                >
                                    Email:
                                </Typography>
                                <Typography>{data.email}</Typography>
                            </Paper>

                            <Paper
                                variant="outlined"
                                sx={{
                                    p: 2,
                                    width: '100%',
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    color="textDisabled"
                                >
                                    Phone:
                                </Typography>
                                <Typography>{data.phone_number}</Typography>
                            </Paper>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
            <CustomModal open={modalOpen} onClose={handleClose}>
                <EditProfile handleClose={handleClose} />
            </CustomModal>
        </Stack>
    );
};
