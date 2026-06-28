import { SelectInput } from 'component/SelectInput';
import {
    Controller,
    DefaultValues,
    FieldValues,
    useForm,
} from 'react-hook-form';

import {
    Button,
    CircularProgress,
    FormControl,
    InputAdornment,
    Stack,
    Typography,
} from '@mui/material';

import { theme } from '@theme';

import { InputStyled } from './Form.styles';
import { FormProps, InputConfigType } from './Form.types';

/**
 * A form component which creates form with inputs and submit button
 * @param {InputConfigType} inputs - config for creating input component
 * @param {ErrorState} errors - error state that shall be used for validation error of inputs
 * @param {function} handleSubmit - function that has to be executed when we submit the form
 * @param {string} button - text that should be displayed inside button
 * @param {serverError} serverError - error state of server
 * @param {boolean} isLoading -whether form is in loading state or not
 * @param {FormValueType} defaultValues - default values of form
 */
export const Form = <T extends FieldValues, E>({
    inputs,
    errors,
    handleSubmit: onSubmit,
    button,
    serverError,
    isLoading,
    defaultValues,
}: FormProps<T, E>) => {
    const { control, handleSubmit } = useForm<T>({
        defaultValues: defaultValues as DefaultValues<T>,
    });

    const getCommonSlotProps = (input: InputConfigType<T>) => ({
        input: {
            startAdornment: input.startIcon ? (
                <InputAdornment position="start">
                    {input.startIcon}
                </InputAdornment>
            ) : null,
            endAdornment: input.endIcon ? (
                <InputAdornment position="end">{input.endIcon}</InputAdornment>
            ) : null,
        },
        inputLabel: { shrink: true },
    });

    return (
        <form
            onSubmit={(e) => {
                void handleSubmit(onSubmit)(e);
            }}
        >
            <FormControl
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: theme.spacing(12),
                }}
            >
                {inputs.map((input) => (
                    <Stack justifyContent="flex-end" key={String(input.name)}>
                        <Controller
                            name={input.name}
                            control={control}
                            render={({ field }) => {
                                const commonProps = {
                                    ...field,
                                    label: input.label,
                                    placeholder: input.placeholder,
                                    error: !!errors[input.name]?.length,
                                    helperText: errors[input.name]?.[0],
                                    fullWidth: true,
                                };
                                if (input.type === 'select')
                                    return (
                                        <SelectInput
                                            select
                                            {...commonProps}
                                            slotProps={{
                                                ...getCommonSlotProps(input),
                                                select: { displayEmpty: true },
                                            }}
                                            options={input.options || []}
                                        />
                                    );
                                if (input.type === 'date')
                                    return (
                                        <InputStyled
                                            type={input.type}
                                            {...commonProps}
                                            slotProps={{
                                                ...getCommonSlotProps(input),
                                                htmlInput: { max: input.max },
                                            }}
                                        />
                                    );
                                return (
                                    <InputStyled
                                        type={input.type || 'text'}
                                        {...commonProps}
                                        slotProps={getCommonSlotProps(input)}
                                    />
                                );
                            }}
                        />
                    </Stack>
                ))}
                <Stack gap={theme.spacing(2)}>
                    {serverError ? (
                        <Typography color="error" variant="subtitle2">
                            {String(serverError)}
                        </Typography>
                    ) : null}
                    <Button
                        variant="contained"
                        type="submit"
                        disabled={isLoading}
                        sx={{ height: theme.typography.pxToRem(48) }}
                    >
                        {isLoading ? (
                            <CircularProgress color="primary" size={30} />
                        ) : (
                            button
                        )}
                    </Button>
                </Stack>
            </FormControl>
        </form>
    );
};
