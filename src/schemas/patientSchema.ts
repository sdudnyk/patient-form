import Joi from 'joi';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { docTypeOptions, genderOptions, preferredCommunicationOptions, fieldNames } from '../consts';
import { customDateValidation } from '../utils';

dayjs.extend(customParseFormat);

const patientSchema = Joi.object()
  .keys({
    [fieldNames.lastName]: Joi.string().min(2).required().messages({
      "any.required": "Поле не може бути пустим",
      "string.min": "Поле має містити щонайменше 2 символи",
    }),
    [fieldNames.firstName]: Joi.string().min(2).required().messages({
      "any.required": "Поле не може бути пустим",
      "string.min": "Поле має містити щонайменше 2 символи",
    }),
    [fieldNames.middleName]: Joi.string().min(3).required().messages({
      "any.required": "Поле не може бути пустим",
      "string.min": "Поле має містити щонайменше 3 символи",
    }),
    [fieldNames.IPN]: Joi.string().regex(/^\d+$/).length(10).required().messages({
      "any.required": "Поле не може бути пустим",
      "string.base": "Поле повинно містити лише цифри",
      "string.pattern.base": "Поле повинно містити лише цифри",
      "string.length": "Поле має містити рівно 10 символів",
    }),
    [fieldNames.birthDate]: Joi.string()
      .pattern(/^\d{2}\.\d{2}\.\d{4}$/)
      .custom(customDateValidation('1900-01-01', dayjs()))
      .required()
      .messages({
        "any.required": "Поле не може бути пустим",
        "string.pattern.base": "Невірний формат дати",
        "any.invalid": "Некоректна дата",
        "date.min": "Дата не може бути раніше 01.01.1900",
        "date.max": "Дата не може бути пізніше поточної",
      }),
    [fieldNames.gender]: Joi.string()
      .valid(...Object.keys(genderOptions))
      .required()
      .messages({
        "any.required": "Поле не може бути пустим",
      }),
    [fieldNames.birthCountry]: Joi.string().min(3).required().messages({
      "any.required": "Поле не може бути пустим",
      "string.min": "Поле має містити щонайменше 3 символи",
    }),
    [fieldNames.birthPlace]: Joi.string().min(3).required().messages({
      "any.required": "Поле не може бути пустим",
      "string.min": "Поле має містити щонайменше 3 символи",
    }),
    [fieldNames.preferredCommunication]: Joi.string()
      .valid(...Object.keys(preferredCommunicationOptions))
      .required()
      .messages({
        "any.required": "Поле не може бути пустим",
      }),
    [fieldNames.secretWord]: Joi.string().min(6).required().messages({
      "any.required": "Поле не може бути пустим",
      "string.min": "Поле має містити щонайменше 6 символів",
    }),
    [fieldNames.phoneNumber]: Joi.string()
      .pattern(/^\+38 \(0\d{2}\) \d{3}-\d{2}-\d{2}$/)
      .when(fieldNames.preferredCommunication, {
        is: "phone",
        then: Joi.required(),
      })
      .messages({
        "string.pattern.base": "Номер має бути у форматі +38 (0XX) XXX-XX-XX",
        "any.required": "Бажаний спосіб зв'язку має бути заповнений",
      }),
    [fieldNames.email]: Joi.string()
      .email({ tlds: { allow: false } })
      .when(fieldNames.preferredCommunication, {
        is: "email",
        then: Joi.required(),
      })
      .messages({
        "string.email": "Введіть коректний імейл",
        "any.required": "Бажаний спосіб зв'язку має бути заповнений",
      }),
    [fieldNames.documentType]: Joi.string()
      .valid(...Object.keys(docTypeOptions))
      .required()
      .messages({
        "any.required": "Поле не може бути пустим",
      }),
    [fieldNames.documentNumber]: Joi.string()
      .required()
      .when(fieldNames.documentType, {
        is: "passportIdCard",
        then: Joi.string()
          .pattern(/^\d{9}$/)
          .messages({
            "string.pattern.base": "Номер ID-картки має містити 9 цифр",
          }),
      })
      .when("documentType", {
        is: "passportBooklet",
        then: Joi.string()
          .pattern(/^[А-ЯІЇЄҐа-яіїєґ]{2}\s?\d{6}$/)
          .messages({
            "string.pattern.base": "Серія і номер паспорту-книжечки має містити 2 укр. букви і 6 цифр",
          }),
      })
      .when("documentType", {
        is: Joi.not("passportIdCard", "passportBooklet"),
        then: Joi.string()
          .pattern(/^[А-ЯІЇЄҐа-яіїєґ]{3}\s?\d{5,9}$/)
          .messages({
            "string.pattern.base": "Поле повинно містити 3 літери українською та від 5 до 9 цифр",
          }),
      })
      .messages({
        "any.required": "Поле не може бути пустим",
      }),
    [fieldNames.issueDate]: Joi.string()
      .pattern(/^\d{2}\.\d{2}\.\d{4}$/)
      .custom(customDateValidation('1900-01-01', dayjs()))
      .required()
      .messages({
        "any.required": "Поле не може бути пустим",
        "string.pattern.base": "Невірний формат дати",
        "any.invalid": "Некоректна дата",
        "date.min": "Дата не може бути раніше 01.01.1900",
        "date.max": "Дата не може бути пізніше поточної",
      }),
    [fieldNames.expiryDate]: Joi.string()
      .pattern(/^\d{2}\.\d{2}\.\d{4}$/)
      .custom(customDateValidation('1900-01-01', '2100-01-01'))
      .messages({
        "string.pattern.base": "Невірний формат дати",
        "any.invalid": "Некоректна дата",
        "date.min": "Дата не може бути раніше 01.01.1900",
        "date.max": "Дата не може бути пізніше 01.01.2100",
      }),
    [fieldNames.authority]: Joi.string().min(3).required().messages({
      "any.required": "Поле не може бути пустим",
      "string.min": "Поле має містити щонайменше 3 символи",
    }),
    [fieldNames.recordNumber]: Joi.string()
      .pattern(/^\d{8}-\d{5}$/)
      .custom((value, helpers) => {
        const [datePart, idPart] = value.split("-");

        if (!datePart || !idPart || datePart.length !== 8 || idPart.length !== 5) {
          return helpers.error("any.invalid");
        }

        const day = datePart.slice(0, 2);
        const month = datePart.slice(2, 4);
        const year = datePart.slice(4);

        const date = dayjs(`${year}.${month}.${day}`, "YYYY.MM.DD", true);

        if (!date.isValid()) {
          // TODO: check if date is same to birthDate, check min and max values
          return helpers.error("string.date");
        }

        return value;
      })
      .messages({
        "string.pattern.base": "УНЗР має формат ДДММРРРР-ххххх.",
        "any.invalid": "УНЗР має формат ДДММРРРР-ххххх.",
        "string.date": "Дата у складі УНЗР є невалідною.",
      }),
  }).unknown(true);

export default patientSchema;
