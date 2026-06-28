import { Stack, Tooltip, Typography, useTheme } from '@mui/material';

import { formatToTime } from '@utils';

import { SlotContainer, SlotLink } from './Slot.styles';
import { SlotProps } from './Slot.types';

export const Slot = (props: SlotProps) => {
    const theme = useTheme();

    return (
        <>
            {Object.entries(props).map(([theater, slots]) => (
                <SlotContainer key={theater}>
                    <Stack>
                        <Typography variant="h4">{theater}</Typography>
                        {/* <Typography variant="subtitle1" color="text.secondary">Banglore</Typography> */}
                    </Stack>
                    <Stack direction={'row'} gap={theme.spacing(3)}>
                        {slots?.map((slot) => (
                            <Tooltip
                                key={slot.id}
                                arrow
                                title={`Rs.${slot.price}`}
                                placement="top"
                            >
                                <SlotLink to={`/slot/${slot.id}`}>
                                    {formatToTime(slot?.start_time)}
                                </SlotLink>
                            </Tooltip>
                        ))}
                    </Stack>
                </SlotContainer>
            ))}
        </>
    );
};
