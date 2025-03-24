import keyMirror from 'keymirror';

const fieldNames: Record<string, string> = keyMirror({
  firstName: null,
  lastName: null,
  middleName: null,
  IPN: null,
  birthDate: null,
  gender: null,
  birthCountry: null,
  birthPlace: null,
  preferredCommunication: null,
  secretWord: null,
  phoneNumber: null,
  email: null,
  documentType: null,
  documentNumber: null,
  issueDate: null,
  expiryDate: null,
  authority: null,
  recordNumber: null,
});

export default fieldNames;
