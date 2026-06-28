import { Skeleton, Stack, Typography, useTheme } from '@mui/material';

import { ProfileContainer } from './Profile.styles';

export const ProfileSkeleton = () => {
    const theme = useTheme();

    return (
        <ProfileContainer>
            <Typography variant="h2">Profile</Typography>
            <Stack spacing={theme.spacing(2)}>
                <Skeleton width={'60%'} />
                <Skeleton width={'60%'} />
                <Skeleton width={'60%'} />
                <Skeleton width={'60%'} />
                <Skeleton width={'60%'} />
            </Stack>
            <Skeleton width={'20%'} />
        </ProfileContainer>
    );
};
