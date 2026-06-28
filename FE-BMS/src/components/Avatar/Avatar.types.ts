import { MouseEventHandler } from 'react';

/**
 * Props for the styled avatar.
 */
export interface StyledAvatarProps {
    /**
     * Size prop to change style on different avatar sizes
     */
    size?: number;
}

/**
 * Props for the custom avatar extends the styledAvatar props
 */
export interface CustomAvatarProps extends StyledAvatarProps {
    /**
     * src - url of the image to be displayed
     */
    src: string;
    /**
     * Alt text for the avatar image
     */
    alt?: string;
    /**
     * Tooltip text to display on the hover(optional)
     */
    tooltip?: string | number;
    /**
     * Function that need to be called on clicking the avatar
     */
    onClick?: MouseEventHandler<HTMLButtonElement>;
}
