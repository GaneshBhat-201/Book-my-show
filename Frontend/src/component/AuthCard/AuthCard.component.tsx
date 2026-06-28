import { Typography } from '@mui/material';
import { Box, Stack, useTheme } from '@mui/system';

import { AuthCardContainer, BoxStyled } from './AuthCard.styles';
import { AuthCardProps } from './AuthCard.types';

/**
 * It creates a card which can be reused
 * @param {string} image - image that should be added to top of card
 * @param {string} alt  -alt text for that image
 * @param {string} heading - Heading of card
 * @param {string} subheading - subheading of card
 * @param {Component} children - children of card component
 */
export const AuthCard = ({
    image,
    alt,
    heading,
    subheading,
    children,
}: AuthCardProps) => {
    const theme = useTheme();

    return (
        <AuthCardContainer>
            <Stack
                direction="column"
                alignItems="center"
                gap={theme.spacing(4)}
            >
                <BoxStyled>
                    <img src={image} alt={alt} width="100%" />
                </BoxStyled>
                <Stack
                    direction="column"
                    textAlign="center"
                    alignItems="center"
                    gap={theme.spacing(1)}
                >
                    <Typography variant="h2" color="text.primary">
                        {heading}
                    </Typography>
                    {subheading ? (
                        <Typography variant="subtitle1" color="text.secondary">
                            {subheading}
                        </Typography>
                    ) : null}
                </Stack>
            </Stack>
            <Box width={'100%'}>{children}</Box>
        </AuthCardContainer>
    );
};
