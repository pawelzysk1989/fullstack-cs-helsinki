import axios from 'axios';

import { NewPerson, Person } from '../models/Person';

const baseUrl = 'http://localhost:8080/persons';

const getAll = () => {
  const request = axios.get<Person[]>(baseUrl);
  return request.then(({ data }) => data);
};

const create = (person: NewPerson) => {
  const request = axios.post<Person>(baseUrl, person);
  return request.then(({ data }) => data);
};

const update = (id: number, person: Person) => {
  const request = axios.put<Person>(`${baseUrl}/${id}`, person);
  return request.then(({ data }) => data);
};

const remove = (id: number) => {
  const request = axios.delete<Person>(`${baseUrl}/${id}`);
  return request.then(({ data }) => data);
};

export default {
  getAll,
  create,
  update,
  delete: remove,
};
