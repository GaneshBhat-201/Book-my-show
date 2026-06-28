import { styled, Typography } from '@mui/material';

export const StyledTypography = styled(Typography)(() => ({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
}));
