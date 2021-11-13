import React from 'react';

import { Person as PersonType } from '../types/Person';

type Props = {
  person: PersonType;
  onDelete: () => void;
};

const Person = ({ person: { name, number }, onDelete }: Props) => (
  <tr className="table-row">
    <td className="table-cell">{name}</td>
    <td className="table-cell">{number}</td>
    <td className="table-cell">
      <button onClick={onDelete}>delete</button>
    </td>
  </tr>
);

export default Person;
