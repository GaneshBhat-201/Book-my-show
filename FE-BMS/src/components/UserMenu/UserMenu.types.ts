/**
 * Props of the user menu component
 */
export interface UserMenuProps {
    /**
     * Src of the user avatar
     */
    avatarSrc?: string;
    /**
     * Alt text for the user avatar
     */
    avatarAlt?: string;
    /**
     * Functions triggered on clicking the avatar
     */
    avatarClick: React.MouseEventHandler<HTMLButtonElement>;
    /**
     * It is used to set the position of the menu.
     */
    anchorEl: HTMLElement | null;
    /**
     * Function used to close the user menu
     */
    closeUserMenu: () => void;
    /**
     * Function used to trigger user logout
     */
    handleLogout: () => void;
}
