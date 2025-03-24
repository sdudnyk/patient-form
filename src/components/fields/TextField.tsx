import { FC } from 'react';
import { TextField as MUITextField, TextFieldProps as MUITextFieldProps } from '@mui/material';
import { Field } from 'react-final-form';
import deepmerge from 'deepmerge';

type TextFieldProps = Omit<MUITextFieldProps, 'name'> & Required<Pick<MUITextFieldProps, 'name'>>;

const baseSlotProps: TextFieldProps['slotProps'] = {
  inputLabel: { shrink: true },
  formHelperText: {
    sx: { textAlign: 'right' },
  },
};

const mergeSlotProps =
  (customProps: TextFieldProps['slotProps']) =>
    deepmerge(baseSlotProps, customProps ?? {});

const TextField: FC<TextFieldProps> = ({ name, slotProps, ...restInputProps }) => (
  <Field name={name}>
    {({ input, meta }) => (
      <MUITextField
        {...input}
        {...restInputProps}
        fullWidth
        variant="standard"
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error}
        slotProps={mergeSlotProps(slotProps)}
      />
    )}
  </Field>
);

export default TextField;
