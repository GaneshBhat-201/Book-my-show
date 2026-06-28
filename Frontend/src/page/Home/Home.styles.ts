import { Stack, styled } from '@mui/material';

export const MovieListContainer = styled(Stack)(({ theme: { spacing } }) => ({
    padding: spacing(8, 4),
    alignItems: 'center',
    justifyContent: 'center',
}));
