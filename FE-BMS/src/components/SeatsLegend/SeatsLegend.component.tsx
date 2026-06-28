import { useMemo } from 'react';

import { Box, Stack, Typography, useTheme } from '@mui/material';

/**
 * This component displays the info about the seats layout
 */
export const SeatsLegend = () => {
    /** Hooks */
    const { palette } = useTheme();

    /** Constants */
    const seatsLegend = useMemo(
        () => [
            {
                label: 'Available',
                color: palette.primary.main,
                variant: 'outlined',
            },
            {
                label: 'Selected',
                color: palette.success.main,
                variant: 'contained',
            },
            {
                label: 'Sold',
                color: palette.action.disabledBackground,
                variant: 'contained',
            },
        ],
        [
            palette.primary.main,
            palette.success.main,
            palette.action.disabledBackground,
        ],
    );

    return (
        <Stack direction="row" alignSelf="center" gap={4}>
            {seatsLegend.map((item, index) => (
                <Box key={index} display="flex" alignItems="center" gap={1}>
                    <Box
                        sx={{
                            width: 20,
                            height: 20,
                            borderRadius: 1,
                            background:
                                item.variant === 'contained'
                                    ? item.color
                                    : 'transparent',
                            border: `1px solid ${item.color}`,
                        }}
                    />
                    <Box height={20} display="flex" alignItems="center">
                        <Typography variant="caption" lineHeight={1}>
                            {item.label}
                        </Typography>
                    </Box>
                </Box>
            ))}
        </Stack>
    );
};
