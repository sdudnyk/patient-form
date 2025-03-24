import { FormEvent } from 'react';

const filterNonDigitsInput = (e: FormEvent<HTMLInputElement>) => {
  const target = e.target as HTMLInputElement;

  target.value = target.value.replace(/\D/g, "");
}

export default filterNonDigitsInput;
