import React from 'react';

import { Country as CountryType } from '../models/Country';

type Props = {
  country: CountryType;
};

const Country = ({ country }: Props) => {
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
};

export default Country;
