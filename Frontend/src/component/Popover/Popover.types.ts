import { ReactNode } from 'react';

export type PopoverLinks = {
    label: string;
    to: string;
};

export type PopoverProps = {
    imageUrl: string;
    links: PopoverLinks[];
    children: ReactNode;
};
