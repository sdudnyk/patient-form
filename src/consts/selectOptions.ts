const docTypeOptions: Record<string, string> = {
  grantedProtection: 'Посвідчення особи, яка потребує додаткового захисту',
  passportIdCard: 'Паспорт (ID-картка)',
  passportBooklet: 'Паспорт (книжечка)',
  permanentResidencePermit: 'Посвідка на постійне проживання в Україні',
  refugeeCertificate: 'Посвідка біженця',
  temporaryResidencePermit: 'Посвідка на проживання',
  temporaryCitizenCertificate: 'Тимчасове посвідчення громадянина України',
};

const genderOptions: Record<string, string> = {
  male: 'Чоловіча',
  female: 'Жіноча',
};

const preferredCommunicationOptions: Record<string, string> = {
  email: 'Електронною поштою',
  phone: 'Телефоном',
}

export { docTypeOptions, genderOptions, preferredCommunicationOptions };
