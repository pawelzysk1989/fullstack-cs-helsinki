import React, { useState } from 'react';

import { PersonFormState } from '../models/Person';
import InputField from './InputField';

type Props = {
  onSubmit: (person: PersonFormState, reset: () => void) => void;
};

const PersonForm = ({ onSubmit }: Props) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const personFrom: PersonFormState = {
      name,
      number,
    };
    onSubmit(personFrom, () => {
      setName('');
      setNumber('');
    });
  };

  const isDisabled = !(name && number);

  return (
    <form className="form" onSubmit={submit}>
      <InputField label="name" value={name} onChange={setName} />
      <InputField label="number" value={number} onChange={setNumber} />
      <button type="submit" className="form-button" disabled={isDisabled}>
        add
      </button>
    </form>
  );
};

export default PersonForm;
