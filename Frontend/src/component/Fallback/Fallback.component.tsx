import { Button, Typography } from '@mui/material';

import {
    FallbackHead,
    FallbackIntro,
    ImageContainer,
    StackStyled,
} from './Fallback.styles';
import { FallbackComponentProps } from './Fallback.type';

/**
 * It is a card which can be used to display any message
 * @param {string} image - image that should be added to top of card
 * @param {string} alt - alt text for that image
 * @param {string} heading - Heading of card
 * @param {string} subheading - subheading of card
 * @param {string} description - description of card
 * @param {string} buttonCtaText - Text that should be displayed inside button
 * @param {function} handleClick - function that should be called when button is clicked
 */
export const FallbackComponent = ({
    image,
    alt,
    heading,
    subheading,
    description,
    buttonCtaText,
    handleClick,
}: FallbackComponentProps) => (
    <StackStyled direction="column">
        <ImageContainer>
            <img
                src={image}
                alt={alt}
                width="100%"
                height="100%"
                loading="lazy"
            />
        </ImageContainer>
        <FallbackHead>
            <FallbackIntro>
                <Typography variant="h1" color="text.primary" component="h6">
                    {heading}
                </Typography>
                <Typography variant="h2" color="text.primary" component="h6">
                    {subheading}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {description}
                </Typography>
            </FallbackIntro>
            <Button onClick={handleClick} color="primary" variant="contained">
                {buttonCtaText}
            </Button>
        </FallbackHead>
    </StackStyled>
);
