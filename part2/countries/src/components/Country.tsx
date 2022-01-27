import React from 'react';

import useCountry from '../hooks/useCountry';
import Weather from './Weather';

type Props = {
  code: string;
};

const Country = ({ code }: Props) => {
  const country = useCountry(code);

  if (!country) {
    return null;
  }

  return (
    <div>
      <h2>{country.name}</h2>
      <div>
        capital: <strong>{country.capital}</strong>
      </div>
      <div>
        population: <strong>{country.population}</strong>
      </div>
      <div>
        <h3>Spoken language</h3>
        <ul>
          {country.languages.map((lang) => (
            <li key={lang.name}>{lang.name}</li>
          ))}
        </ul>
      </div>
      <img src={country.flag} alt="country flag" />

      <Weather location={country.capital} latlng={country.latlng} />
    </div>
  );
};

export default Country;
