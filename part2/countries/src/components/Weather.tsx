import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { Weather as WeatherType } from '../models/Weather';
import WeatherDetails from './WeatherDetails';

const access_key = import.meta.env.VITE_WEATHER_API_KEY;

type Props = {
  location: string;
  latlng: [number, number];
};

const Weather = ({ location, latlng }: Props) => {
  const [weatherInfo, setWeatherInfo] = useState<WeatherType | undefined>(undefined);

  useEffect(() => {
    axios
      .get<WeatherType>('http://api.weatherstack.com/current', {
        params: {
          access_key,
          query: latlng.join(','),
        },
      })
      .then((response) => {
        setWeatherInfo(response.data);
      })
      .catch(console.error);
  }, [location]);

  return (
    <div>
      <h3>Weather in {location}</h3>
      {weatherInfo && <WeatherDetails weather={weatherInfo} />}
    </div>
  );
};

export default Weather;
