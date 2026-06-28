import { ReactNode } from 'react';

import { SelectOptions } from 'component/Form/Form.types';

import { TextFieldProps } from '@mui/material';

export type SelectInputProps = TextFieldProps & {
    options: SelectOptions[];
    startIcon?: ReactNode;
    endIcon?: ReactNode;
};
