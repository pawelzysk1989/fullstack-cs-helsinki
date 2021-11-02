import React from 'react';

type PartProps = {
  name: string;
  exercises: number;
};

const Part = ({ name, exercises }: PartProps) => (
  <p>
    {name} {exercises}
  </p>
);

export default Part;
