import axios from 'axios';
import React, { useEffect, useState } from 'react';

type Country = {
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

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState<Country[]>([]);

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const searchedCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const searchedCountriesView = (): React.ReactNode => {
    switch (true) {
      case !searchTerm:
        return null;
      case searchedCountries.length > 10:
        return 'Too many matches, specity another filter';
      case searchedCountries.length > 1:
        return searchedCountries.map((country) => (
          <div key={country.name.common}>{country.name.common}</div>
        ));
      case searchedCountries.length === 1: {
        const [country] = searchedCountries;
        return (
          <div>
            <h2>{country.name.common}</h2>
            <div>
              capital: <strong>{country.capital.join(', ')}</strong>
            </div>
            <div>
              population: <strong>{country.population}</strong>
            </div>
            <div>
              <h3>languages</h3>
              <ul>
                {Object.values(country.languages).map((lang) => (
                  <li key={lang}>{lang}</li>
                ))}
              </ul>
            </div>

            <img src={country.flags.png} alt="country flag" />
          </div>
        );
      }

      default:
        return 'Zero matches, specity another filter';
    }
  };

  useEffect(() => {
    axios
      .get<Country[]>('https://restcountries.com/v3.1/all')
      .then((response) => setCountries(response.data));
  }, []);
  return (
    <div>
      <span>find countries</span>
      <input value={searchTerm} onChange={handleSearchTermChange} />
      <div>{searchedCountriesView()}</div>
    </div>
  );
}

export default App;
