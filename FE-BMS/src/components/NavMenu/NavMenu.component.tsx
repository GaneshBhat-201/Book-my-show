import { StyledNavLink } from 'styles';

import { Menu, MenuItem } from '@mui/material';

import { NavMenuProps } from './NavMenu.types';

/**
 * Component used to display menu in the application
 *
 * @param id - Unique identifier of the component
 * @param anchorEl - It's used to set the position of the menu.
 * @param anchorOrigin - This is the point on the anchor where the popover's anchorEl will attach to
 * @param transformOrigin - This is the point on the popover which will attach to the anchor's origin.
 * @param closeNavMenu - void function used to close the menu
 * @param sx - Additional styles to the component
 * @param navItems - Menu items that need to be display in the component
 */
export const NavMenu = (props: NavMenuProps) => {
    /** Props */
    const {
        id,
        anchorEl,
        anchorOrigin = {
            vertical: 'bottom',
            horizontal: 'left',
        },
        transformOrigin = {
            vertical: 'top',
            horizontal: 'left',
        },
        closeNavMenu,
        sx,
        navItems,
        keepMounted,
    } = props;

    return (
        <Menu
            id={id}
            anchorEl={anchorEl}
            anchorOrigin={anchorOrigin}
            keepMounted={keepMounted}
            transformOrigin={transformOrigin}
            open={Boolean(anchorEl)}
            onClose={closeNavMenu}
            sx={sx}
        >
            {navItems.map((item) => (
                <MenuItem
                    component={StyledNavLink}
                    to={item?.path}
                    key={item.label}
                    onClick={closeNavMenu}
                >
                    {item.label}
                </MenuItem>
            ))}
        </Menu>
    );
};
