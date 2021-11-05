import React, { useEffect, useState } from 'react';

import PersonForm from './components/PersonForm';
import PersonList from './components/PersonList';
import PersonSearch from './components/PersonSearch';
import Section from './components/Section';
import { NewPerson, Person } from './models/Person';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState<Person[]>([]);

  useEffect(() => {
    personService.getAll().then(setPersons);
  }, []);

  const [search, setSearch] = useState('');

  const handleSearchChange = (searchTerm: string) => {
    setSearch(searchTerm);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase()),
  );

  const addPerson = (newPerson: NewPerson) => {
    personService.create(newPerson).then((person) => setPersons(persons.concat(person)));
  };

  const deletePerson = ({ id, name }: Person) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.delete(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  return (
    <>
      <Section title="Phonebook">
        <PersonForm persons={persons} onSubmit={addPerson} />
      </Section>
      <Section title="Numbers">
        <PersonSearch search={search} onSearchChange={handleSearchChange} />
        <PersonList persons={filteredPersons} onDelete={deletePerson} />
      </Section>
    </>
  );
};

export default App;
