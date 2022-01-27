import axios from 'axios';
import { useEffect, useState } from 'react';

import { Country } from '../models/Country';

const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    axios
      .get<Country[]>('https://restcountries.com/v2/all')
      .then((response) => setCountries(response.data));
  }, []);

  return countries;
};

export default useCountries;
