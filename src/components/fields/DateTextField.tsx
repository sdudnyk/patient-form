import { FC } from 'react';
import InputMask from 'react-input-mask';
import { Field } from 'react-final-form';
import TextField, { TextFieldProps } from '@mui/material/TextField';

type DateTextFieldProps = Omit<TextFieldProps, 'name'> & Required<Pick<TextFieldProps, 'name'>>;

const DateTextField: FC<DateTextFieldProps> = ({ name, ...restInputProps }) => (
  <Field name={name}>
    {({ input, meta }) => (
      <InputMask
        mask="99.99.9999"
        value={input.value}
        onChange={input.onChange}
      >
        {(props: TextFieldProps) => (
          <TextField
            {...props}
            {...restInputProps}
            fullWidth
            variant="standard"
            error={Boolean(meta.error && meta.touched)}
            helperText={meta.touched && meta.error}
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

export default DateTextField;
