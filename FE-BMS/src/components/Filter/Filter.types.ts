/**
 * Type of the items displayed in the component
 */
export interface ListItemTypes {
    /**
     * Unique identifier of the item
     */
    id: number;
    /**
     * Label of the item
     */
    label: string;
}

/**
 * Base of the filter component props type
 */
export type BaseProps = {
    /**
     * Label of the filter field
     */
    label: string;
    /**
     * Items that need to be displayed as filter option
     */
    listItems: ListItemTypes[];
    /**
     * Loading state of the filter options
     */
    onLoading?: boolean;
    /**
     * Text to be displayed if no option present for search result
     */
    noOptionsText?: string;
};

/**
 * Props if the filter is single select value
 */
export type SingleSelectProps = {
    /**
     * To track whether the field is multiselect or not
     */
    isMultiple: false;
    /**
     * Value of the selected item
     */
    value: ListItemTypes | null;
    /**
     * Function to set the value of filter item
     */
    setValue: (value: ListItemTypes | null) => void;
};

/**
 * Props if the filter is multiselect
 */
export type MultiSelectProps = {
    /**
     * To track whether the field is multiselect or not
     */
    isMultiple: true;
    /**
     * Value of the selected item
     */
    value: ListItemTypes[];
    /**
     * Function to set the value of filter item
     */
    setValue: (value: ListItemTypes[]) => void;
};

/**
 * Props of the filter component
 */
export type FilterProps = BaseProps & (SingleSelectProps | MultiSelectProps);
