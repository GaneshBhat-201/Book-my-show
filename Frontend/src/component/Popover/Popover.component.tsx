import * as React from 'react';

import { Stack, Typography, useTheme } from '@mui/material';
import Popover from '@mui/material/Popover';

import { Avatar } from '@component/Avatar';

import { ButtonIcon, PopoverNavLink } from './Popover.styles';
import { PopoverProps } from './Popover.types';

/**
 * Popover component
 * @param {string} imageUrl - imageurl that would be passed to avatar
 * @param {Array} links - links that should be displayed when popover is opened
 * @param {ReactNode} children - child component of popover
 */
export const PopoverComponent = ({
    imageUrl,
    links,
    children,
}: PopoverProps) => {
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null,
    );

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <ButtonIcon
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
            >
                <Avatar imageUrl={imageUrl} alt="profile pic"></Avatar>
            </ButtonIcon>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Stack
                    direction="column"
                    gap={theme.spacing(1)}
                    alignItems="center"
                    padding={theme.spacing(2)}
                >
                    {links.map((link) => (
                        <PopoverNavLink
                            to={link.to}
                            key={link.to}
                            onClick={handleClose}
                        >
                            <Typography variant="subtitle1">
                                {link.label}
                            </Typography>
                        </PopoverNavLink>
                    ))}
                    {children}
                </Stack>
            </Popover>
        </div>
    );
};
