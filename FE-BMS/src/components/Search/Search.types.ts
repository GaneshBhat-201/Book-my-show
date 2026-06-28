/**
 * Type of variant for textField component
 */
export type SearchVariant = 'outlined' | 'standard' | 'filled';

/**
 * Type of size props for textField component
 */
export type SearchSize = 'small' | 'medium';

/**
 * Props for the search component
 */
export interface SearchProps {
    /**
     * Label to be displayed for search component
     */
    label?: string;
    /**
     * Variant of the text field component
     */
    variant?: SearchVariant;
    /**
     * Placeholder that need to be displayed in search box
     */
    placeholder?: string;
    /**
     * Function that trigger api calling
     */
    setData: (value: string) => void;
    /**
     * Size of the textField component
     */
    size?: SearchSize;
}
