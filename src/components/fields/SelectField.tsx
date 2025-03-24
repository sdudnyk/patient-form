import { FC } from 'react';
import { Field } from 'react-final-form';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

export interface SelectFieldProps {
  name: string,
  label: string,
  required?: boolean,
  options: Record<string, string>,
}

const SelectField: FC<SelectFieldProps> = ({ name, label, options, required }) => (
  <Field name={name}>
    {({ input, meta }) => (
      <FormControl fullWidth variant="standard" error={meta.touched && Boolean(meta.error)}>
        <InputLabel required={required} shrink id={`${name}-label`}>{label}</InputLabel>
        <Select
          {...input}
          variant="standard"
          labelId={`${name}-label`}
          value={input.value || ""}
          displayEmpty
          sx={{
            textAlign: "left",
          }}
        >
          <MenuItem value="" disabled>-- Вибрати --</MenuItem>
          {Object.entries(options).map(([key, value], i) => (
            <MenuItem value={key} key={`${key}_${i}`}>{value}</MenuItem>
          ))}
        </Select>
        {meta.touched && meta.error &&
          <FormHelperText sx={{ textAlign: "right" }}>{meta.error}</FormHelperText>
        }
      </FormControl>
    )}
  </Field>
);

export default SelectField;
