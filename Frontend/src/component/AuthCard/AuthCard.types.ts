import { ReactNode } from 'react';

export type AuthCardProps = {
    image: string;
    heading: string;
    subheading?: string;
    children: ReactNode;
    alt: string;
};
