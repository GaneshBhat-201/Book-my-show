import { Fragment, useMemo, useState } from 'react';

import {
    Button,
    Card,
    CardContent,
    Collapse,
    Divider,
    Grid2,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';

import { SlotDataType } from '@services';
import { formatDate } from '@utils';

import { MovieSlotProps } from './MovieSlot.types';
import { RenderDateRow } from './RenderDateRow';

/**
 * This component display the slots of the movie
 */
export const MovieSlot = (props: MovieSlotProps) => {
    /** Props */
    const { title, subtitle, slots, navigation } = props;

    /** States */
    const [open, setOpen] = useState<boolean>(false);
    const { palette } = useTheme();

    /** Hooks */
    const dateSlotMap = useMemo(
        () =>
            slots.reduce<Record<string, SlotDataType[]>>((acc, slot) => {
                const date = formatDate({
                    date: slot.date_time,
                    options: { weekday: 'short' },
                });

                if (!acc[date]) {
                    acc[date] = [];
                }

                acc[date].push(slot);

                return acc;
            }, {}),
        [slots],
    );

    /** Constants */
    const entries = Object.entries(dateSlotMap);
    const firstItem = entries[0];
    const remainingItem = entries.slice(1);

    return (
        <Card>
            <CardContent sx={{ '&:last-child': { pb: 4 } }}>
                <Stack gap={4}>
                    <Stack>
                        <Typography variant="h4">{title}</Typography>
                        <Typography variant="caption" color="textDisabled">
                            {subtitle}
                        </Typography>
                    </Stack>
                    <Divider />

                    <Grid2 container spacing={4} alignItems="center">
                        {firstItem && (
                            <>
                                <RenderDateRow
                                    date={firstItem[0]}
                                    slotsArr={firstItem[1]}
                                    handleOnClick={navigation}
                                />
                                {remainingItem.length > 0 && (
                                    <Grid2 flex={1}>
                                        <Divider />
                                    </Grid2>
                                )}
                            </>
                        )}
                        <Collapse
                            in={open}
                            timeout="auto"
                            unmountOnExit
                            sx={{ width: '100%' }}
                        >
                            <Stack spacing={4}>
                                {remainingItem.map(([date, slotsArr]) => (
                                    <Fragment key={date}>
                                        <RenderDateRow
                                            date={date}
                                            slotsArr={slotsArr}
                                            navigation={navigation}
                                        />
                                        <Grid2 flex={1}>
                                            <Divider />
                                        </Grid2>
                                    </Fragment>
                                ))}
                            </Stack>
                        </Collapse>
                    </Grid2>
                    {remainingItem.length > 0 && (
                        <Button
                            variant="text"
                            color="inherit"
                            sx={{
                                width: 'fit-content',
                                alignSelf: 'center',
                                color: palette.text.disabled,
                            }}
                            onClick={() => setOpen(!open)}
                        >
                            {open ? 'Show Less' : 'Show All'}
                        </Button>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
};
