import { Schema, ValidationErrorItem } from "joi";

const joiValidate = (schema: Schema) => (values: Record<string, string>) => {
  const { error } = schema.validate(values, { abortEarly: false });

  if (!error) return undefined;

  return error.details.reduce((acc: Record<string, string>, { path, message }: ValidationErrorItem) => {
    acc[path.join(".")] = message;
    return acc;
  }, {});
};

export default joiValidate;