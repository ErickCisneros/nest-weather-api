import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DaysManagementSchema } from './schemas/days-management.schema';
import { WeatherManagementSchema } from './schemas/weather-management.schema';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'WeatherManagement', schema: WeatherManagementSchema },
      { name: 'DaysManagement', schema: DaysManagementSchema },
    ]),
  ],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
