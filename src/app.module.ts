import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [
    WeatherModule,
    MongooseModule.forRoot('mongodb://localhost/weather-app'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
