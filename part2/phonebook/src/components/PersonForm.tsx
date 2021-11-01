import React, { useState } from 'react';

import { Person as PersonType } from '../models/Person';

type Props = {
  onSubmit: (person: PersonType, reset: () => void) => void;
};

const PersonForm = ({ onSubmit }: Props) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const addPerson = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newPerson: PersonType = {
      name: newName,
      number: newNumber,
    };

    onSubmit(newPerson, () => {
      setNewName('');
      setNewNumber('');
    });
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
