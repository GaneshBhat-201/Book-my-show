import { useNavigate } from 'react-router-dom';

import {
    Card,
    CardActionArea,
    CardContent,
    Stack,
    Tooltip,
} from '@mui/material';

import { CINEMA_CARD_MIN_HEIGHT, ROUTES } from '@constant';
import { CinemaType } from '@services';

import { StyledTypography } from './CinemaCard.styles';

/**
 * This component is used to display cinema details in the card
 *
 * @param cinema - Cinema data object containing id, name, and location
 */
export const CinemaCard = ({ cinema }: { cinema: CinemaType }) => {
    /** Hooks */
    const navigate = useNavigate();

    /** Functions */
    /**
     * This function handle navigation when clicking the card
     */
    const handleNavigation = () => {
        void navigate(`${ROUTES.CINEMAS}/${cinema.id}`);
    };

    return (
        <Card sx={{ width: '100%' }}>
            <CardActionArea onClick={handleNavigation}>
                <CardContent>
                    <Stack gap={1} minHeight={CINEMA_CARD_MIN_HEIGHT}>
                        <Tooltip title={cinema.name}>
                            <StyledTypography variant="h4">
                                {cinema.name}
                            </StyledTypography>
                        </Tooltip>
                        <Tooltip title={cinema.location}>
                            <StyledTypography variant="h5" color="textDisabled">
                                {cinema.location}
                            </StyledTypography>
                        </Tooltip>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
