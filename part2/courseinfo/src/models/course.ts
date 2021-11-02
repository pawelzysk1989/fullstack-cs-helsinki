export type Part = {
  id: number;
  name: string;
  exercises: number;
};

export type Course = {
  id: number;
  name: string;
  parts: Part[];
};
