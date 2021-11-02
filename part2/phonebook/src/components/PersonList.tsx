import React from 'react';

import { Person as PersonType } from '../models/Person';
import Person from './Person';

type Props = {
  persons: PersonType[];
};

const PersonList = ({ persons }: Props) => (
  <ul>
    {persons.map((person) => (
      <Person key={person.name} person={person} />
    ))}
  </ul>
);

export default PersonList;
