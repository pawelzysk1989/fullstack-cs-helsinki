import React from 'react';

import { Person as PersonType } from '../models/Person';

type Props = {
  person: PersonType;
};

const Person = ({ person: { name, number } }: Props) => (
  <li>
    {name}: {number}
  </li>
);

export default Person;
