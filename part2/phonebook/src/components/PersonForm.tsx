import React, { useState } from 'react';

import { NewPerson, Person } from '../models/Person';
import personService from '../services/persons';
import InputField from './InputField';

type Props = {
  persons: Person[];
  setPersons: (value: React.SetStateAction<Person[]>) => void;
};

const PersonForm = ({ persons, setPersons }: Props) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const addPerson = (newPerson: NewPerson) => {
    personService.create(newPerson).then((person) => setPersons(persons.concat(person)));
  };

  const updatePerson = (changedPerson: Person) => {
    personService.update(changedPerson).then((returnedPerson) => {
      setPersons(
        persons.map((person) =>
          person.id !== returnedPerson.id ? person : returnedPerson,
        ),
      );
    });
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  const submitPerson = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newPerson: NewPerson = {
      name,
      number,
    };

    const existingPerson = persons.find((person) => person.name === newPerson.name);

    if (!existingPerson) {
      resetForm();
      addPerson(newPerson);
    } else if (
      window.confirm(
        `${newPerson.name} is already added to Phonebook, replace the old number with the new on`,
      )
    ) {
      resetForm();
      updatePerson({
        ...existingPerson,
        ...newPerson,
      });
    }
  };

  const isDisabled = !(name && number);

  return (
    <form className="form" onSubmit={submitPerson}>
      <InputField label="name" value={name} onChange={setName} />
      <InputField label="number" value={number} onChange={setNumber} />
      <button type="submit" className="form-button" disabled={isDisabled}>
        add
      </button>
    </form>
  );
};

export default PersonForm;
