import { Schema } from 'mongoose';

export const DaysManagementSchema = new Schema({
  days: { type: Number, require: true },
  includeToday: { type: Boolean, require: true },
  createdAt: { type: Date, default: Date.now },
});
