import React from 'react';

import { Weather } from '../models/Weather';

type Props = {
  weather: Weather;
};

const WeatherDetails = ({
  weather: {
    current: { temperature, weather_icons, wind_speed, wind_dir },
  },
}: Props) => {
  return (
    <div>
      <span>
        <strong>temperature:</strong> {temperature} Celcius
      </span>
      <div>
        {weather_icons.map((src) => (
          <img key={src} src={src} alt="weather icon" />
        ))}
      </div>
      <span>
        <strong>wind:</strong> {wind_speed} kph direction {wind_dir}
      </span>
    </div>
  );
};

export default WeatherDetails;
