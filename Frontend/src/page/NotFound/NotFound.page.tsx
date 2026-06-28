import { useNavigate } from 'react-router';

import Logo from '@assets/images/logo2.webp';
import { FallbackComponent } from '@component/Fallback';

export const NotFound = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        void navigate('/');
    };

    return (
        <FallbackComponent
            image={Logo}
            alt="CineBook logo"
            heading="404"
            subheading="Page Not Found"
            description="Oops! The page you're looking for doesn't exist. It might have been moved or deleted."
            buttonCtaText="Back to home"
            handleClick={handleClick}
        />
    );
};
