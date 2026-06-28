import { Avatar, styled } from '@mui/material';

import { AvatarStyleProps } from './Avatar.types';

export const AvatarStyled = styled(Avatar)<AvatarStyleProps>(
    ({ theme: { typography }, size }) => ({
        maxWidth: typography.pxToRem(size),
        maxHeight: typography.pxToRem(size),
    }),
);
