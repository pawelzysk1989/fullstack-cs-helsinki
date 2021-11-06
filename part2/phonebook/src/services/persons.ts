import axios, { AxiosError } from 'axios';

import { Person, PersonFormState } from '../models/Person';

const baseUrl = 'http://localhost:8080/persons';

const getAll = () => {
  const request = axios.get<Person[]>(baseUrl);
  return request.then(({ data }) => data);
};

const create = (personFormState: PersonFormState) => {
  const request = axios.post<Person>(baseUrl, personFormState);
  return request.then(({ data }) => data);
};

const update = (person: Person) => {
  const request = axios.put<Person>(`${baseUrl}/${person.id}`, person);
  return request.then(({ data }) => data);
};

const remove = (person: Person) => {
  const request = axios.delete<Person>(`${baseUrl}/${person.id}`);
  return request
    .then(({ data }) => data)
    .catch((error: AxiosError) => {
      throw Error(
        error.response?.status === 404
          ? `Person ${person.name} was already removed from the server`
          : error.message,
      );
    });
};

export default {
  getAll,
  create,
  update,
  delete: remove,
};
