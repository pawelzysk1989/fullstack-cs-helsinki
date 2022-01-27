import React, { useState } from 'react';

import Country from './components/Country';
import Expandable from './components/Expandable';
import Info from './components/Info';
import useCountries from './hooks/useCountries';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const countries = useCountries();

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const searchedCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const searchedCountriesView = (): React.ReactNode => {
    switch (true) {
      case !searchTerm:
        return null;
      case searchedCountries.length > 10:
        return <Info message="Too many matches, specity another filter" />;
      case searchedCountries.length > 1:
        return searchedCountries.map((country) => (
          <Expandable key={country.name} title={country.name}>
            <Country code={country.alpha2Code} />
          </Expandable>
        ));
      case searchedCountries.length === 1:
        return <Country code={searchedCountries[0].alpha2Code} />;

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
