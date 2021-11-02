import React from 'react';

import Course from './components/course/Course';
import { Course as CourseType } from './models/course';

const COURSES: CourseType[] = [
  {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4,
      },
    ],
  },
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1,
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2,
      },
    ],
  },
];

const App = () => {
  return (
    <div>
      <h1>Web development cirriculum</h1>
      {COURSES.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
};

export default App;
