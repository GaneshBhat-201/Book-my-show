import { useNavigate } from 'react-router';

import Logo from '@assets/images/logo2.webp';
import { FallbackComponent } from '@component/Fallback';

export const ErrorPage = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        void navigate('/');
    };

    return (
        <FallbackComponent
            image={Logo}
            alt="CineBook logo"
            heading="ERROR"
            subheading="Something went wrong!"
            description="It’s always time for a coffee break We should be back by the time you finish your coffee."
            buttonCtaText="Back to home"
            handleClick={handleClick}
        />
    );
};
