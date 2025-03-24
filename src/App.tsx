import { useState } from 'react';
import { Box, Button, Grid2 as Grid, Typography } from '@mui/material';
import { Form } from 'react-final-form'
import { DateTextField, EmailField, PhoneField, SelectField, TextField } from './components';
import { docTypeOptions, genderOptions, preferredCommunicationOptions,  fieldNames } from './consts';
import { patientSchema } from './schemas';
import { filterNonDigitsInput, joiValidate } from './utils';

function App() {
  const [results, setResults] = useState<object | null>(null);

  const onSubmit = (values: object) => {
    console.log(values); // intentional
    setResults(values);
  };

  return (
    <>
      <Form
        onSubmit={onSubmit}
        validate={joiValidate(patientSchema)}
        render={({ handleSubmit, form,  /*submitting, pristine, values */ }) => (
          <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={3}>
                <Grid size={12}>
                  <Typography variant="h5" align="left">
                    Дані пацієнта
                  </Typography>
                </Grid>
                <Grid size={4}>
                  <TextField
                    name={fieldNames.lastName}
                    label="Прізвище"
                    required
                  />
                </Grid>
                <Grid size={4}>
                  <TextField
                    name={fieldNames.firstName}
                    label="Ім'я"
                    required
                  />
                </Grid>
                <Grid size={4}>
                  <TextField
                    name={fieldNames.middleName}
                    label="По батькові"
                    required
                    slotProps={
                      {
                        htmlInput: { style: { paddingRight: '80px' } },
                      }
                    }
                  />
                </Grid>

                <Grid size={4}>
                  <TextField
                    name={fieldNames.IPN}
                    label="РНОКПП (ІПН)"
                    required
                    slotProps={
                      {
                        htmlInput: {
                          style: { paddingRight: '80px' },
                          maxLength: 10,
                          pattern: "[0-9]*",
                        },
                      }
                    }
                    onInput={filterNonDigitsInput}
                  />
                </Grid>
                <Grid size={4}>
                  <DateTextField required name={fieldNames.birthDate} label="Дата народження" placeholder="31.12.1971" />
                </Grid>
                <Grid size={4}>
                  <SelectField
                    name={fieldNames.gender}
                    label="Стать"
                    options={genderOptions}
                    required
                  />
                </Grid>

                <Grid size={6}>
                  <TextField
                    name={fieldNames.birthCountry}
                    label="Країна народження"
                    required
                    slotProps={{
                      inputLabel: { shrink: undefined },
                    }}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    name={fieldNames.birthPlace}
                    label="Місце народження"
                    required
                    slotProps={{
                      inputLabel: { shrink: undefined },
                    }}
                  />
                </Grid>

                <Grid size={6}>
                  <SelectField
                    name={fieldNames.preferredCommunication}
                    label="Бажаний спосіб зв'язку із пацієнтом"
                    required
                    options={preferredCommunicationOptions}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    name={fieldNames.secretWord}
                    label="Секретне слово (не менше 6 символів)"
                    required
                    slotProps={{
                      inputLabel: { shrink: undefined },
                    }}
                  />
                </Grid>

                <Grid size={6}>
                  <PhoneField name="phoneNumber" label="Контактний номер телефону" />
                </Grid>
                <Grid size={6}>
                  <EmailField name="email" label="Адреса електронної пошти" />
                </Grid>

                <Grid size={12}>
                  <Typography variant="h5" align="left">
                    Документ, що посвідчує особу
                  </Typography>
                </Grid>

                <Grid size={6}>
                  <SelectField
                    name="documentType"
                    label="Тип документу"
                    required
                    options={docTypeOptions}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    name={fieldNames.documentNumber}
                    label="Серія (за наявності), номер"
                    required
                    slotProps={{
                      inputLabel: { shrink: undefined },
                    }}
                  />
                </Grid>

                <Grid size={6}>
                  <DateTextField name="issueDate" label="Коли видано" placeholder="31.12.1971" required />
                </Grid>
                <Grid size={6}>
                  <DateTextField name="expiryDate" label="Діє до" placeholder="31.12.1971" />
                </Grid>

                <Grid size={6}>
                  <TextField
                    name={fieldNames.authority}
                    label="Ким видано"
                    multiline
                    required
                    slotProps={{
                      inputLabel: { shrink: undefined },
                      htmlInput: { style: { resize: 'vertical' } },
                    }}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    name={fieldNames.recordNumber}
                    label="Запис № (УНЗР)"
                    placeholder="РРРММДД-XXXXX"
                  />
                </Grid>

                <Grid size={12} container spacing={2} justifyContent="flex-end">
                  <Button
                    variant="contained"
                    color="secondary"
                    type="reset"
                    onClick={() => {
                      form.restart();
                      setResults(null);
                    }}
                  >
                    Скинути
                  </Button>
                  <Button variant="contained" color="primary" type="submit">
                    Зберегти
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </form>
        )}
      />

      {results &&
        <Box>
          <pre>
            {JSON.stringify(results, null, 2) }
          </pre>
        </Box>
      }
    </>
  )
}

export default App;
