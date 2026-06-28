import PageNotFound from '@assets/images/404-Error.webp';
import { ErrorComponent } from '@components';

/**
 * Not Found page.
 * If there occur any broken navigation this page shown as fallback.
 * @returns Returns Not found page
 */
export const NotFoundPage = () => (
    <ErrorComponent
        imgPath={PageNotFound}
        imgAlt="404 - Page Not Found"
        title="Oops! Page Not Found"
        subtitle="The page you are looking for doesn't exist. Click button below to go to the homepage"
    />
);
