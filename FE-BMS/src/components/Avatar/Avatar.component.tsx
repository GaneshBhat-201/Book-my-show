import { IconButton, Tooltip } from '@mui/material';

import { StyledAvatar } from './Avatar.styles';
import { CustomAvatarProps } from './Avatar.types';

/**
 * This component display avatar image.
 *
 * @param tooltip - Tooltip to show on hovering the avatar
 * @param src - Src of the avatar
 * @param alt - Alt text to be displayed if image not load
 * @param size - Size variant for different sizes of avatar
 * @param onClick - Action perform on click of avatar
 */
export const CustomAvatar = (props: CustomAvatarProps) => {
    /** Props */
    const { tooltip, src, alt, size, onClick } = props;

    return (
        <Tooltip title={tooltip}>
            <IconButton onClick={onClick} aria-label={alt}>
                <StyledAvatar src={src} alt={alt} size={size} />
            </IconButton>
        </Tooltip>
    );
};
