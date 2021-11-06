import React, { useState } from 'react';

import { NewPerson, Person } from '../models/Person';
import personService from '../services/persons';

type Props = {
  persons: Person[];
  setPersons: (value: React.SetStateAction<Person[]>) => void;
};

const PersonForm = ({ persons, setPersons }: Props) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

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

  const submitPerson = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newPerson: NewPerson = {
      name: newName,
      number: newNumber,
    };

    const duplicatedPerson = persons.find((person) => person.name === newPerson.name);

    if (!duplicatedPerson) {
      setNewName('');
      setNewNumber('');
      addPerson(newPerson);
    } else if (
      window.confirm(
        `${newPerson.name} is already added to Phonebook, replace the old number with the new on`,
      )
    ) {
      setNewName('');
      setNewNumber('');
      updatePerson({
        ...duplicatedPerson,
        ...newPerson,
      });
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
    <form className="form" onSubmit={submitPerson}>
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
