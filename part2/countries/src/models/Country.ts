export type Country = {
  name: {
    common: string;
    official: string;
  };
  capital: string[];
  population: number;
  languages: Record<string, string>;
  flags: {
    png: string;
    svg: string;
  };
};
