import React, { useState } from 'react';

import PersonForm from './components/PersonForm';
import PersonList from './components/PersonList';
import PersonSearch from './components/PersonSearch';
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
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);

  const [search, setSearch] = useState('');

  const handleSearchChange = (searchTerm: string) => {
    setSearch(searchTerm);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase()),
  );

  const addPerson = (newPerson: PersonType, resetForm: () => void) => {
    const errors = validatePerson(persons, newPerson);

    if (errors.length) {
      alert(errors.join('\n'));
    } else {
      setPersons(persons.concat(newPerson));
      resetForm();
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm onSubmit={addPerson} />
      <h2>Numbers</h2>
      <PersonSearch search={search} onSearchChange={handleSearchChange} />
      <PersonList persons={filteredPersons} />
    </div>
  );
};

export default App;
