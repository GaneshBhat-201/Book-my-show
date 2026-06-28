import { Button, Grid2, Stack, Typography } from '@mui/material';

import { formatAmount, formatTime } from '@utils';

import { RenderDateRowProps } from './MovieSlot.types';

/**
 * Component to render date and its slot row
 * @param date - Date of the slot
 * @param slotsArr - Different slots at particular date
 * @param handleOnClick - Function to handle navigation on clicking the slot
 */
export const RenderDateRow = ({
    date,
    slotsArr,
    handleOnClick,
}: RenderDateRowProps) => (
    <Grid2 container size={12} alignItems="center">
        <Grid2 size={{ xs: 12, md: 2 }}>
            <Typography>{date}</Typography>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 10 }}>
            <Stack direction="row" gap={2} flexWrap="wrap">
                {slotsArr.map((slot) => (
                    <Button
                        key={slot.id}
                        variant="outlined"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            borderColor: 'GrayText',
                        }}
                        onClick={() => handleOnClick(slot.id)}
                    >
                        <Typography variant="caption">
                            {formatTime(slot.date_time)}
                        </Typography>
                        <Typography variant="caption">
                            {formatAmount(parseFloat(slot.price) || 0)}
                        </Typography>
                    </Button>
                ))}
            </Stack>
        </Grid2>
    </Grid2>
);
