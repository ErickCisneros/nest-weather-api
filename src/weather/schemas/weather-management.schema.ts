import { Schema } from 'mongoose';

export const WeatherManagementSchema = new Schema({
  units: { type: String, require: true },
  createdAt: { type: Date, default: Date.now },
});
