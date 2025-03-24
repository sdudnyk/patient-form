import { FC } from 'react';
import TextField from "@mui/material/TextField";
import { Field } from "react-final-form";

export interface EmailFieldProps {
  name: string,
  label: string,
}

const EmailField: FC<EmailFieldProps> = ({ name, label }) => (
  <Field name={name}>
    {({ input, meta }) => (
      <TextField
        {...input}
        fullWidth
        variant="standard"
        label={label}
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error}
        slotProps={
          {
            inputLabel: { shrink: true },
            formHelperText: {
              sx: { textAlign: 'right' },
            },
          }
        }
        type="email"
        placeholder="example@example.com"
      />
    )}
  </Field>
);

export default EmailField;
