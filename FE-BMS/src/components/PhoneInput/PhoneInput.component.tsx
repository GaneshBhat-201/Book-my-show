import { MuiTelInput } from 'mui-tel-input';
import { Controller, FieldValues } from 'react-hook-form';

import { PhoneInputProps } from './PhoneInput.types';

/**
 * This component uses MuiTelInput to display phone input with country code.
 * It is a controlled component that can be use with react hook form
 *
 * @param control - Object that allow react hook form to manage component
 * @param name - Name of the input field
 */
export const PhoneInput = <T extends FieldValues>({
    control,
    name,
    countryCode = 'IN',
}: PhoneInputProps<T>) => (
    <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
            <MuiTelInput
                {...field}
                defaultCountry={countryCode}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
            />
        )}
    />
);
