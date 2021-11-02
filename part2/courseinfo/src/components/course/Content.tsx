import React from 'react';

import { Part as CoursePart } from '../../models/course';
import Part from './Part';

type ContentProps = {
  parts: CoursePart[];
};

const Content = ({ parts }: ContentProps) => (
  <>
    {parts.map(({ id, name, exercises }) => (
      <Part key={id} name={name} exercises={exercises} />
    ))}
  </>
);

export default Content;
