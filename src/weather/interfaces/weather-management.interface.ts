import { Document } from 'mongoose';

export interface WeatherManagement extends Document {
  readonly units: 'metric' | 'standard' | 'imperial';
}
