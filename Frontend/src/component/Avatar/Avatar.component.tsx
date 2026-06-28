import { AvatarStyled } from './Avatar.styles';
import { AvatarProps } from './Avatar.types';

/**
 * Avatar component
 * @param {string} imageUrl - image url for avatar
 * @param {string} alt - alternate name for image
 * @param {number} size - size of avatar
 * @returns
 */
export const Avatar = ({ imageUrl, alt, size = 28 }: AvatarProps) => (
    <AvatarStyled alt={alt} src={imageUrl} size={size} />
);
