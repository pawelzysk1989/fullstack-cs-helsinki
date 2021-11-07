export type Weather = {
  location: {
    name: string;
  };
  current: {
    temperature: number;
    weather_icons: string[];
    wind_speed: number;
    wind_dir: string;
  };
};
