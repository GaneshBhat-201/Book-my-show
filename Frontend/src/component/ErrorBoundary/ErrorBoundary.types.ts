import { ReactNode } from 'react';

export type ErrorProps = {
    children: ReactNode;
    fallback: ReactNode;
};

export type ErrorState = {
    hasError: boolean;
};
