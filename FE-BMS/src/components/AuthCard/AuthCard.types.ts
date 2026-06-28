import { ReactNode } from 'react';

/**
 * Props for the auth card component
 */
export interface AuthCardProps {
    /**
     * Title to be shown in card
     */
    title: string;
    /**
     * Subtitle to be shown in card
     */
    subtitle: string;
    /**
     * Children element that need to be displayed in card
     */
    children: ReactNode;
}
