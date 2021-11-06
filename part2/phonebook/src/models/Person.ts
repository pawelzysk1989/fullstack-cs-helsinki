export type Person = {
  id: number;
  name: string;
  number: string;
};

export type PersonFormState = Omit<Person, 'id'>;
