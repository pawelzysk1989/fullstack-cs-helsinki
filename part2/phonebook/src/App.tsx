import React, { useState } from 'react';

import Person from './components/Person';
import { Person as PersonType } from './models/Person';

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

const App = () => {
  const [persons, setPersons] = useState<PersonType[]>([
    { name: 'Arto Hellas', number: '123-456-789' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNumber(event.target.value);
  };

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
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <Person key={person.name} person={person} />
        ))}
      </ul>
    </div>
  );
};

export default App;
