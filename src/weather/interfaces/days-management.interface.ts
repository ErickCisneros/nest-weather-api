import { Document } from 'mongoose';

export interface DaysManagement extends Document {
  readonly days: number;
  readonly includeToday: boolean;
}
