import { ReactNode } from 'react';

import { FieldValues, Path } from 'react-hook-form';

export type SelectOptions = {
    value: string;
    placeholder: string;
};

export type InputConfigType<T> = {
    name: Path<T>;
    label: string;
    placeholder?: string;
    type?: string;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    max?: string;
    options?: SelectOptions[];
};

export type FormProps<T extends FieldValues, E> = {
    inputs: InputConfigType<T>[];
    serverError?: E;
    errors: Partial<Record<keyof T, string[]>>;
    handleSubmit: (data: T) => void | Promise<void>;
    button: string;
    isLoading: boolean;
    defaultValues: T;
};
