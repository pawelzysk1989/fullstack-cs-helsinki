export type Country = {
  name: string;
  alpha2Code: string;
};

export type CountryDetails = {
  name: string;
  capital: string;
  latlng: [number, number];
  population: number;
  languages: {
    name: string;
  }[];
  flag: string;
};
