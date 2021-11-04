import React from 'react';

import { Country as CountryType } from '../models/Country';
import Weather from './Weather';

type Props = {
  country: CountryType;
};

const Country = ({ country: { name, capital, population, languages, flags } }: Props) => (
  <div>
    <h2>{name.common}</h2>
    <div>
      capital: <strong>{capital.join(', ')}</strong>
    </div>
    <div>
      population: <strong>{population}</strong>
    </div>
    <div>
      <h3>Spoken languages</h3>
      <ul>
        {Object.values(languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
    </div>
    <img src={flags.png} alt="country flag" />

    {capital.map((location) => (
      <Weather key={location} location={location} />
    ))}
  </div>
);

export default Country;
