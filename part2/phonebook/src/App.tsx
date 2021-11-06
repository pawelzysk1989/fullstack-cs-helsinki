import React, { useEffect, useState } from 'react';

import Notifications from './components/Notifications';
import PersonForm from './components/PersonForm';
import PersonList from './components/PersonList';
import PersonSearch from './components/PersonSearch';
import Section from './components/Section';
import { Notification } from './models/Notification';
import { Person, PersonFormState } from './models/Person';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    personService.getAll().then(setPersons);
  }, []);

  const handleSearchChange = (searchTerm: string) => {
    setSearch(searchTerm);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase()),
  );

  const addNotifiaction = (newNotification: Notification) => {
    setNotifications(notifications.concat(newNotification));
    setTimeout(() => {
      const clearedNotifications = notifications.filter(
        ({ message }) => message !== newNotification.message,
      );
      setNotifications(clearedNotifications);
    }, 5000);
  };

  const deletePerson = (person: Person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .delete(person)
        .then(() => {
          setPersons(persons.filter((per) => per.id !== person.id));
        })
        .catch((error: Error) => {
          addNotifiaction({
            type: 'error',
            message: error.message,
          });
        });
    }
  };

  const addPerson = (personFormState: PersonFormState) => {
    personService.create(personFormState).then((person) => {
      addNotifiaction({
        type: 'success',
        message: `Added ${person.name}`,
      }),
        setPersons(persons.concat(person));
    });
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

  const submitPerson = (personFormState: PersonFormState, resetForm: () => void) => {
    const existingPerson = persons.find((person) => person.name === personFormState.name);

    if (!existingPerson) {
      resetForm();
      addPerson(personFormState);
    } else if (
      window.confirm(
        `${personFormState.name} is already added to Phonebook, replace the old number with the new on`,
      )
    ) {
      resetForm();
      updatePerson({
        ...existingPerson,
        ...personFormState,
      });
    }
  };

  return (
    <>
      {Boolean(notifications.length) && <Notifications notifications={notifications} />}
      <Section title="Phonebook">
        <PersonForm onSubmit={submitPerson} />
      </Section>
      <Section title="Numbers">
        <PersonSearch search={search} onSearchChange={handleSearchChange} />
        <PersonList persons={filteredPersons} onDelete={deletePerson} />
      </Section>
    </>
  );
};

export default App;
