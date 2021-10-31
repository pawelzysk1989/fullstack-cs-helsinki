import React from 'react';

import Part from './Part';

type TotalProps = {
  parts: CoursePart[];
};

const Total = ({ parts }: TotalProps) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <strong>
      <Part name="Number of exercises" exercises={total} />
    </strong>
  );
};

export default Total;
