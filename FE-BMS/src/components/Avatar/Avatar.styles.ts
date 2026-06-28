import { Avatar, styled } from '@mui/material';

import { StyledAvatarProps } from './Avatar.types';

export const StyledAvatar = styled(Avatar)<StyledAvatarProps>(({
    theme: {
        typography: { pxToRem },
    },
    size = 32,
}) => {
    const avatarSize = pxToRem(size);

    return { width: avatarSize, height: avatarSize };
});
