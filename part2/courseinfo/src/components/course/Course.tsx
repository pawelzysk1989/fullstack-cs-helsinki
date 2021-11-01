import React from 'react';

import { Course as CourseType } from '../../models/course';
import Content from './Content';
import Header from './Header';
import Total from './Total';

type CourseProps = {
  course: CourseType;
};

const Course = ({ course }: CourseProps) => (
  <div>
    <Header title={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);

export default Course;
