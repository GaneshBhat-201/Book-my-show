import { CardContent, Stack, Typography } from '@mui/material';

import AuthBanner from '@assets/images/authbanner.webp';
import Logo from '@assets/images/logo.svg';

import { StyledAuthCard, StyledAuthCardMedia } from './AuthCard.styles';
import { AuthCardProps } from './AuthCard.types';

/**
 * This component uses mui card to display authentication form init.
 *
 * @param title - Title of the form which displayed in card
 * @param subtitle - Subtitle of the form which displayed in card
 * @param children - Child element which displayed in the card
 */
export const AuthCard = ({ title, subtitle, children }: AuthCardProps) => (
    <StyledAuthCard>
        <StyledAuthCardMedia image={AuthBanner} />
        <CardContent sx={{ flex: 1, p: { xs: 2, md: 8 } }}>
            <Stack height="100%">
                <img
                    src={Logo}
                    alt="BookMyShow Logo"
                    width={80}
                    fetchPriority="high"
                    draggable="false"
                />
                <Stack flex={1} gap={1} py={4} justifyContent="center">
                    <Typography variant="h3">{title}</Typography>
                    <Typography variant="h5" color="textDisabled">
                        {subtitle}
                    </Typography>
                    {children}
                </Stack>
            </Stack>
        </CardContent>
    </StyledAuthCard>
);
