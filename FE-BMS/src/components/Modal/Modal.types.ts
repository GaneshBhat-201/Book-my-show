import { ReactNode } from 'react';

/**
 * Props type of custom modal component
 */
export interface CustomModalProps {
    /**
     * State to track open and close state of modal
     */
    open: boolean;
    /**
     * Function to close modal
     */
    onClose: () => void;
    /**
     * Content to be rendered in modal
     */
    children: ReactNode;
}
