import axios from 'axios';
import React, { useEffect, useState } from 'react';

import PersonForm from './components/PersonForm';
import PersonList from './components/PersonList';
import PersonSearch from './components/PersonSearch';
import { Person as PersonType } from './models/Person';

const App = () => {
  const [persons, setPersons] = useState<PersonType[]>([]);

  useEffect(() => {
    axios
      .get<PersonType[]>('http://localhost:8080/persons')
      .then((response) => setPersons(response.data));
  }, []);

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
