import { FeelsLike } from './feels-like.interface';
import { Icon } from './icon.interface';
import { Temp } from './temp.interface';
import { Wind } from './wind.interface';

export interface Weather {
  temp: Temp;
  feelsLike: FeelsLike;
  pressure: number;
  humidity: number;
  clouds: number;
  visibility: number;
  wind: Wind;
  rain: number;
  snow: number;
  conditionId: number;
  main: string;
  description: string;
  icon: Icon;
}
