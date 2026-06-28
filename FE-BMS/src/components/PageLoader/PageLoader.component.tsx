import { CircularProgress, Stack } from '@mui/material';

export const PageLoader = () => (
    <Stack height="100dvh" alignItems="center" justifyContent="center">
        <CircularProgress aria-label="Loading page" />
    </Stack>
);
