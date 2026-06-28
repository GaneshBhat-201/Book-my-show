import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Box, Stack, Typography, useTheme } from '@mui/material';

import { hmsToMinutes } from '@utils';

import {
    ButtonStyled,
    CarouselContent,
    PosterContainer,
    StyledBox,
} from './CarouselCard.styles';
import { CarouselCardProps } from './CarouselCard.types';

/**
 * Banner card
 * @param {string} title - Title of the card
 * @param {string} description - Description of the card
 * @param {string} duration - Duration
 * @param {string} poster - poster image url
 * @param {function} handleClick - function to be executed when clicked
 */
export const CarouselCard = ({
    title,
    description,
    duration,
    poster,
    genre,
    language,
    handleClick,
}: CarouselCardProps) => {
    const theme = useTheme();

    return (
        <StyledBox
            sx={
                poster
                    ? {
                          backgroundImage: `linear-gradient(to top,rgba(0,0,0,0.8),rgba(0,0,0,0.6)), url(${poster})`,
                      }
                    : { backgroundColor: theme.palette.primary.main }
            }
        >
            <CarouselContent>
                {poster ? (
                    <PosterContainer>
                        <img src={poster} alt={`${title} poster`} />
                    </PosterContainer>
                ) : null}
                <Stack gap={theme.spacing(4)}>
                    <Typography variant="h1" color="primary.contrastText">
                        {title}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color="primary.contrastText"
                        sx={{
                            ...theme.mixins.lineClamp(3),
                            maxWidth: theme.typography.pxToRem(374),
                        }}
                    >
                        {description}
                    </Typography>
                    <Stack
                        alignItems={'center'}
                        gap={theme.spacing(1)}
                        direction={'row'}
                        color={theme.palette.primary.contrastText}
                    >
                        {duration ? (
                            <AccessTimeIcon
                                sx={{ fontSize: theme.typography.pxToRem(13) }}
                            />
                        ) : null}
                        <Typography variant="subtitle1">
                            <Stack direction={'row'} gap={theme.spacing(4)}>
                                {duration ? (
                                    <Box>{hmsToMinutes(duration)}</Box>
                                ) : null}
                                <Box>{genre?.join(',')}</Box>
                                <Box>{language?.join(',')}</Box>
                            </Stack>
                        </Typography>
                    </Stack>
                    {handleClick ? (
                        <ButtonStyled onClick={() => handleClick(title)}>
                            Book
                        </ButtonStyled>
                    ) : null}
                </Stack>
            </CarouselContent>
        </StyledBox>
    );
};
