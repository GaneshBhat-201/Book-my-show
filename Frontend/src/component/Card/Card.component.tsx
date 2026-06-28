import { Stack, Typography, useTheme } from '@mui/material';

import { CardStyled, PosterContainer } from './Card.styles';
import { CardProps } from './Card.types';

export const Card = ({ children, title, poster }: CardProps) => {
    const theme = useTheme();

    return (
        <CardStyled>
            {poster ? (
                <PosterContainer>
                    <img
                        src={poster}
                        alt="poster"
                        width={'100%'}
                        height={'100%'}
                    />
                </PosterContainer>
            ) : null}

            <Stack sx={{ padding: theme.spacing(3) }} gap={theme.spacing(1)}>
                <Typography variant="h5" sx={theme.mixins.lineClamp(1)}>
                    {title}
                </Typography>
                {children}
            </Stack>
        </CardStyled>
    );
};
