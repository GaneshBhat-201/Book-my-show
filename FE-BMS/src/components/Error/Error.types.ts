/**
 * Props for the `Error` component.
 * Taking imgPath, imgAlt, title and subtitle as props
 */
export interface ErrorComponentProps {
    /**
     * Path of the image to be displayed on errorpage
     */
    imgPath: string;
    /**
     * Alt text of the image to be displayed on error page
     */
    imgAlt: string;
    /**
     * Title of the error page
     */
    title: string;
    /**
     * Subtitle of the error page
     */
    subtitle?: string;
}
