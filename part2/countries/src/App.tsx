import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Country from './components/Country';
import Expandable from './components/Expandable';
import Info from './components/Info';
import { Country as CountryType } from './models/Country';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState<CountryType[]>([]);

  useEffect(() => {
    axios
      .get<CountryType[]>('https://restcountries.com/v3.1/all')
      .then((response) => setCountries(response.data));
  }, []);

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
        return <Info message="Too many matches, specity another filter" />;
      case searchedCountries.length > 1:
        return searchedCountries.map((country) => (
          <Expandable key={country.name.common} title={country.name.common}>
            <Country country={country} />
          </Expandable>
        ));
      case searchedCountries.length === 1:
        return <Country country={searchedCountries[0]} />;

      default:
        return <Info message="Zero matches, specity another filter" />;
    }
  };

  return (
    <div>
      <span>find countries</span>
      <input value={searchTerm} onChange={handleSearchTermChange} />
      <div>{searchedCountriesView()}</div>
    </div>
  );
}

export default App;
