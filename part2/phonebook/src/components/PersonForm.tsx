import React, { useState } from 'react';

import { Person as PersonType } from '../models/Person';

const validatePersonName = (
  persons: PersonType[],
  newPerson: PersonType,
): string | null => {
  return persons.find(({ name }) => name === newPerson.name)
    ? `${newPerson.name} already added to the phonebook`
    : null;
};

const validatePerson = (persons: PersonType[], newPerson: PersonType): string[] => {
  const validators = [validatePersonName];
  return validators.reduce((errors, validator) => {
    const error = validator(persons, newPerson);
    return error ? errors.concat(error) : errors;
  }, [] as string[]);
};

type Props = {
  persons: PersonType[];
  onSubmit: (person: PersonType) => void;
};

const PersonForm = ({ persons, onSubmit }: Props) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const addPerson = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newPerson: PersonType = {
      name: newName,
      number: newNumber,
    };

    const errors = validatePerson(persons, newPerson);

    if (errors.length) {
      alert(errors.join('\n'));
    } else {
      onSubmit(newPerson);
      setNewName('');
      setNewNumber('');
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNumber(event.target.value);
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
