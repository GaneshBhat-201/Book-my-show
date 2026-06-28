import { StyledNavLink } from 'container/Header/Header.styles';

import { Button, styled } from '@mui/material';

export const ButtonIcon = styled(Button)(() => ({
    backgroundColor: 'transparent',
    boxShadow: 'none',
    minWidth: '0',
    padding: '0',
    borderRadius: '100%',
}));

export const PopoverNavLink = styled(StyledNavLink)(() => ({
    width: '100%',
}));
