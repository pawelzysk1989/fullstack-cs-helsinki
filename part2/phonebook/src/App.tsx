import React, { useState } from 'react';

import PersonForm from './components/PersonForm';
import PersonList from './components/PersonList';
import PersonSearch from './components/PersonSearch';
import { Person as PersonType } from './models/Person';

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

  const addPerson = (newPerson: PersonType) => {
    setPersons(persons.concat(newPerson));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm persons={persons} onSubmit={addPerson} />
      <h2>Numbers</h2>
      <PersonSearch search={search} onSearchChange={handleSearchChange} />
      <PersonList persons={filteredPersons} />
    </div>
  );
};

export default App;
