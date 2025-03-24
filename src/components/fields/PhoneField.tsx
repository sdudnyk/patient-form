import { FC } from 'react';
import InputMask from 'react-input-mask';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Field } from 'react-final-form';

export interface PhoneFieldProps {
  name: string,
  label: string,
}

const PhoneField: FC<PhoneFieldProps> = ({ name, label }) => (
  <Field name={name}>
    {({ input, meta }) => (
      <InputMask
        mask="+38 (099) 999-99-99"
        value={input.value}
        onChange={input.onChange}
      >
        {(props: TextFieldProps) => (
          <TextField
            {...props}
            fullWidth
            variant="standard"
            label={label}
            error={Boolean(meta.error && meta.touched)}
            helperText={meta.touched && meta.error}
            placeholder="+38 (0__) ___-__-__"
            slotProps={
              {
                inputLabel: { shrink: true },
                formHelperText: {
                  sx: { textAlign: 'right' },
                },
              }
            }
          />
        )}
      </InputMask>
    )}
  </Field>
);

export default PhoneField;
