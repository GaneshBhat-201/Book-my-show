import { SlotDataType } from '@services';

/**
 * Props type of movie slot component
 */
export interface MovieSlotProps {
    /**
     * Title to be displayed in the component
     */
    title: string;
    /**
     * Subtitle to be displayed in the component
     */
    subtitle: string;
    /**
     * Slots details to be displayed
     */
    slots: SlotDataType[];
    /**
     * Function to handle navigation on clicking the slots
     */
    navigation: (id: number) => void;
}
/**
 * Props of the RenderDateRow component
 */
export interface RenderDateRowProps {
    /**
     * Date of the slot
     */
    date: string;
    /**
     * Slots at particular date
     */
    slotsArr: SlotDataType[];
    /**
     * Function to handle navigation on clicking the slot
     */
    handleOnClick: (id: number) => void;
}
