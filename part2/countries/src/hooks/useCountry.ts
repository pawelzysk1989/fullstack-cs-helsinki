import axios from 'axios';
import { useEffect, useState } from 'react';

import { CountryDetails } from '../models/Country';

const useCountry = (code: string) => {
  const [country, setCountry] = useState<CountryDetails | null>(null);

  useEffect(() => {
    axios
      .get<CountryDetails>(`https://restcountries.com/v2/alpha/${code}`)
      .then((response) => setCountry(response.data));
  }, [code]);

  return country;
};

export default useCountry;
