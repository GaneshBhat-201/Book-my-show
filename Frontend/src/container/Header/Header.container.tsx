import { useNavigate } from 'react-router';

import LogoutIcon from '@mui/icons-material/Logout';
import { CircularProgress, Stack, Typography } from '@mui/material';

import { useAppSelector } from '@app';
import Logo from '@assets/images/logo1.webp';
import ProfileImage from '@assets/images/profile_image.webp';
import { PopoverComponent } from '@component/Popover';
import { ROUTE } from '@constant';
import { useLogoutMutation } from '@service';
import { theme } from '@theme';

import { HeaderLinks } from './Header.config';
import {
    ButtonStyled,
    LogoContainer,
    NavLogoContainer,
    StyledAppBar,
    StyledNavLink,
} from './Header.styles';

export const Header = () => {
    const isAuthenticated = useAppSelector((state) => state.auth.accessToken);
    const navigate = useNavigate();
    const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();

    const handleClick = (to: string) => {
        void navigate(to);
    };

    const handleLogout = () => {
        void logout();
    };

    return (
        <StyledAppBar elevation={1}>
            <Stack
                direction={'row'}
                height={'100%'}
                width={'100%'}
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <NavLogoContainer to={ROUTE.HOME}>
                    <Stack
                        direction={'row'}
                        gap={theme.spacing(2)}
                        alignItems={'flex-end'}
                    >
                        <LogoContainer>
                            <img src={Logo} alt="CineBook logo" />
                        </LogoContainer>
                        <Typography
                            variant="h3"
                            component="h1"
                            color="text.primary"
                        >
                            CineBook
                        </Typography>
                    </Stack>
                </NavLogoContainer>
                <Stack
                    direction={'row'}
                    gap={theme.spacing(3)}
                    alignItems={'center'}
                >
                    <StyledNavLink to={'/theater'}>
                        <Typography variant="subtitle1">Theater</Typography>
                    </StyledNavLink>
                    {isAuthenticated ? (
                        <PopoverComponent
                            imageUrl={ProfileImage}
                            links={HeaderLinks}
                        >
                            <ButtonStyled
                                color="error"
                                fullWidth
                                onClick={handleLogout}
                                disabled={isLogoutLoading}
                            >
                                {isLogoutLoading ? (
                                    <CircularProgress />
                                ) : (
                                    <Stack
                                        direction={'row'}
                                        gap={theme.spacing(2)}
                                        alignItems={'center'}
                                    >
                                        <LogoutIcon
                                            sx={{
                                                fontSize:
                                                    theme.typography.pxToRem(
                                                        18,
                                                    ),
                                            }}
                                        />
                                        <Typography
                                            color="error"
                                            variant="subtitle1"
                                        >
                                            Logout
                                        </Typography>
                                    </Stack>
                                )}
                            </ButtonStyled>
                        </PopoverComponent>
                    ) : (
                        <Stack direction={'row'} gap={theme.spacing(2)}>
                            <ButtonStyled
                                onClick={() => handleClick('/login')}
                                sx={{
                                    backgroundColor: theme.palette.primary.main,
                                    color: theme.palette.primary.contrastText,
                                }}
                            >
                                Login
                            </ButtonStyled>
                        </Stack>
                    )}
                </Stack>
            </Stack>
        </StyledAppBar>
    );
};
