import { CustomAvatar } from 'components/Avatar';
import { StyledNavLink } from 'styles';

import { Logout } from '@mui/icons-material';
import { Box, Menu, MenuItem, Typography } from '@mui/material';

import { ROUTES } from '@constant';

import { UserMenuProps } from './UserMenu.types';

/**
 * This component display avatar and menu when clicking on user avatar
 *
 * @param avatarAlt - Alt text for avatar
 * @param avatarSrc - Src of the avatar
 * @param avatarClick - Function which trigger when clicking the avatar
 * @param anchorEl - Used to set the position of the menu
 * @param closeUserMenu - Function to close the user menu
 * @param handleLogout - Function to trigger user logout
 */
export const UserMenu = (props: UserMenuProps) => {
    /** Props */
    const {
        avatarAlt,
        avatarSrc,
        avatarClick,
        anchorEl,
        closeUserMenu,
        handleLogout,
    } = props;

    return (
        <>
            <CustomAvatar
                src={avatarSrc || ''}
                alt={avatarAlt}
                onClick={avatarClick}
                size={42}
            />

            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={closeUserMenu}
            >
                <MenuItem
                    component={StyledNavLink}
                    to={ROUTES.PROFILE}
                    onClick={closeUserMenu}
                >
                    Profile
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        closeUserMenu();
                        handleLogout();
                    }}
                    sx={{ color: 'error.main' }}
                >
                    <Box display="flex" gap={2} alignItems="center">
                        <Typography>Logout</Typography>
                        <Logout fontSize="small" />
                    </Box>
                </MenuItem>
            </Menu>
        </>
    );
};
