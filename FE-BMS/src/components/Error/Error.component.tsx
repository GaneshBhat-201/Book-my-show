import { useNavigate } from 'react-router-dom';

import { Stack, Typography } from '@mui/material';

import { ROUTES } from '@constant';

import { ImageContainer, StyledButton } from './Error.styles';
import { ErrorComponentProps } from './Error.types';

/**
 * Error component which takes props to display the error page
 *
 * @param imgPath - Image to be displayed on error page
 * @param imgAlt - Alt text for image displayed on error page
 * @param title - Title of the error page
 * @param subtitle - Subtitle of the error page
 * @returns Returns error component
 */
export const ErrorComponent = ({
    imgPath,
    imgAlt,
    title,
    subtitle,
}: ErrorComponentProps) => {
    /** Hooks  */
    const navigate = useNavigate();

    return (
        <Stack
            padding={4}
            flex={1}
            alignItems="center"
            justifyContent="center"
            gap={6}
        >
            <ImageContainer>
                <img src={imgPath} alt={imgAlt} height="100%" />
            </ImageContainer>

            <Stack alignItems="center" gap={3}>
                <Typography variant="h1" textAlign="center">
                    {title}
                </Typography>
                {subtitle && (
                    <Typography
                        variant="h4"
                        textAlign="center"
                        maxWidth={400}
                        color="textDisabled"
                    >
                        {subtitle}
                    </Typography>
                )}
                <StyledButton
                    onClick={() => void navigate(ROUTES.HOME)}
                    variant="contained"
                    color="primary"
                >
                    Go back home
                </StyledButton>
            </Stack>
        </Stack>
    );
};
