interface ImportMetaEnv {
  readonly VITE_WEATHER_API_KEY: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
