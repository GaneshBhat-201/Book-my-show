import ErrorImage from '@assets/images/server-error.webp';
import { ErrorComponent } from '@components';

/**
 * Error page.
 * Displayed when any error occurs.
 * @returns Returns error page for errors
 */
export const ErrorPage = () => (
    <ErrorComponent
        imgPath={ErrorImage}
        imgAlt="Something went wrong"
        title="Something has gone seriously wrong"
        subtitle="An unexpected error occurred. Please try again or return to the homepage."
    />
);
