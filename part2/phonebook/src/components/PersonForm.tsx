import React, { useState } from 'react';

import { NewPerson, Person } from '../models/Person';

const validatePersonName = (persons: Person[], newPerson: NewPerson): string | null => {
  return persons.find(({ name }) => name === newPerson.name)
    ? `${newPerson.name} already added to the phonebook`
    : null;
};

const validatePerson = (persons: Person[], newPerson: NewPerson): string[] => {
  const validators = [validatePersonName];
  return validators.reduce((errors, validator) => {
    const error = validator(persons, newPerson);
    return error ? errors.concat(error) : errors;
  }, [] as string[]);
};

type Props = {
  persons: Person[];
  onSubmit: (person: NewPerson) => void;
};

const PersonForm = ({ persons, onSubmit }: Props) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const addPerson = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newPerson: NewPerson = {
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

  const isDisabled = !(newName && newNumber);

  return (
    <form className="form" onSubmit={addPerson}>
      <label className="form-field">
        <span className="form-field__label">name</span>
        <input
          className="form-field__control"
          value={newName}
          onChange={handleNameChange}
        />
      </label>

      <label className="form-field">
        <span className="form-field__label">number</span>
        <input
          className="form-field__control"
          value={newNumber}
          onChange={handleNumberChange}
        />
      </label>

      <button className="form-button" disabled={isDisabled} type="submit">
        add
      </button>
    </form>
  );
};

export default PersonForm;
