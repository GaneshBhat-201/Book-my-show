import * as React from 'react';

import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { StyledNavLink } from 'styles';

import MenuIcon from '@mui/icons-material/Menu';
import {
    AppBar,
    Box,
    Button,
    Container,
    IconButton,
    Toolbar,
    useMediaQuery,
    useTheme,
} from '@mui/material';

import Logo from '@assets/images/logo.svg';
import { NavMenu, UserMenu } from '@components';
import { ROUTES } from '@constant';
import { useAuth } from '@hooks';
import { RootState } from '@store';

import { navItems } from './Header.config';

/**
 * Container represent the app header
 */
export const Header = () => {
    /** States */
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null,
    );
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null,
    );
    const { handleLogout } = useAuth();
    const { isAuthenticated, user } = useSelector(
        (state: RootState) => state.auth,
    );

    /** Hooks */
    const { breakpoints } = useTheme();
    const isMobile = useMediaQuery(breakpoints.down('sm'));
    const navigate = useNavigate();

    /** Functions */
    /**
     * Function to open nav menu in mobile view
     */
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    /**
     * Function to open user menu
     */
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    /**
     * Function to close nav menu in mobile view
     */
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    /**
     * Function to close user menu
     */
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar color="default">
            <Container maxWidth="xl">
                <Toolbar
                    sx={{ justifyContent: 'space-between' }}
                    disableGutters
                >
                    {/* NavLinks - Mobile View */}
                    <Box display={{ xs: 'flex', md: 'none' }}>
                        <IconButton
                            size="large"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                            aria-label="open navigation menu"
                            aria-controls={
                                anchorElNav ? 'header-nav-menu' : undefined
                            }
                            aria-haspopup="true"
                            aria-expanded={anchorElNav ? 'true' : undefined}
                        >
                            <MenuIcon />
                        </IconButton>
                        <NavMenu
                            id="header-nav-menu"
                            anchorEl={anchorElNav}
                            keepMounted
                            closeNavMenu={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                            navItems={navItems.filter(
                                (item) => !item.requiresAuth || isAuthenticated,
                            )}
                        />
                    </Box>

                    <Link to={ROUTES.HOME}>
                        <img
                            src={Logo}
                            alt="BookMyShow Logo"
                            width={100}
                            fetchPriority="high"
                            draggable="false"
                            style={{ display: 'block' }}
                        />
                    </Link>

                    {/* NavLinks - Desktop View */}
                    <Box
                        flexGrow={1}
                        display={{ xs: 'none', md: 'flex' }}
                        justifyContent="center"
                        gap={8}
                    >
                        {navItems
                            .filter(
                                (item) => !item.requiresAuth || isAuthenticated,
                            )
                            .map((item) => (
                                <StyledNavLink key={item.label} to={item.path}>
                                    {item.label}
                                </StyledNavLink>
                            ))}
                    </Box>

                    {/* User Menu */}
                    <Box>
                        {isAuthenticated && (
                            <UserMenu
                                avatarAlt={user?.name}
                                avatarSrc={user?.avatar}
                                avatarClick={handleOpenUserMenu}
                                anchorEl={anchorElUser}
                                closeUserMenu={handleCloseUserMenu}
                                handleLogout={handleLogout}
                            />
                        )}

                        {!isAuthenticated && (
                            <Box display="flex" gap={2} alignItems="center">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => navigate(ROUTES.LOGIN)}
                                >
                                    Sign in
                                </Button>
                                {!isMobile && (
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() =>
                                            navigate(ROUTES.REGISTER)
                                        }
                                    >
                                        Sign up
                                    </Button>
                                )}
                            </Box>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
