import React from 'react';

import { Person as PersonType } from '../types/Person';
import Person from './Person';

type Props = {
  persons: PersonType[];
  onDelete: (preson: PersonType) => void;
};

const PersonList = ({ persons, onDelete }: Props) => (
  <table className="table">
    <thead>
      <tr>
        <th className="table-hd-cell">Name</th>
        <th className="table-hd-cell">Number</th>
      </tr>
    </thead>
    <tbody>
      {persons.map((person) => (
        <Person key={person.id} person={person} onDelete={() => onDelete(person)} />
      ))}
    </tbody>
  </table>
);

export default PersonList;
