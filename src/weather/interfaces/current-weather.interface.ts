import { Astronomical } from './astronomical.interface';
import { Weather } from './weather.interface';

export interface CurrentWeather {
  lat: number;
  lon: number;
  dt: string;
  dtRaw: number;
  timezoneOffset: number;
  astronomical: Astronomical;
  weather: Weather;
}
