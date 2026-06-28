import { Card, CardMedia, styled } from '@mui/material';

export const StyledAuthCard = styled(Card)(
    ({
        theme: {
            typography: { pxToRem },
            spacing,
            shadows,
            breakpoints,
        },
    }) => ({
        width: '100%',
        minHeight: pxToRem(400),
        display: 'flex',
        alignItems: 'stretch',
        gap: spacing(2),
        padding: spacing(2),
        boxShadow: shadows[2],
        borderRadius: pxToRem(12),

        [breakpoints.up('sm')]: {
            width: '80%',
        },

        [breakpoints.up('lg')]: {
            width: '60%',
            minHeight: pxToRem(700),
        },
    }),
);

export const StyledAuthCardMedia = styled(CardMedia)(
    ({
        theme: {
            typography: { pxToRem },
            breakpoints,
        },
    }) => ({
        borderRadius: pxToRem(12),
        width: '50%',
        aspectRatio: 1,
        display: 'none',

        [breakpoints.up('md')]: {
            display: 'block',
        },
    }),
);
