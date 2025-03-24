import dayjs, { Dayjs } from "dayjs";
import { CustomHelpers } from "joi";

const customDateValidation =
  (minDate: Dayjs | string, maxDate: Dayjs | string) => (value: string, helpers: CustomHelpers) => {
    const date = dayjs(value, 'DD.MM.YYYY', true);

    if (!date.isValid()) return helpers.error('any.invalid');
    if (date.isBefore(minDate)) return helpers.error('date.min');
    if (date.isAfter(maxDate)) return helpers.error('date.max');

    return value;
  };

export default customDateValidation;