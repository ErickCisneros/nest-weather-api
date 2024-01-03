import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import OpenWeatherAPI from 'openweather-api-node';
import { DaysManagementDTO } from './dto/days-management.dto';
import { WeatherManagementDTO } from './dto/weather-management.dto';
import { DaysManagement } from './interfaces/days-management.interface';
import { WeatherManagement } from './interfaces/weather-management.interface';

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel('WeatherManagement')
    private weatherManagement: Model<WeatherManagement>,
    @InjectModel('DaysManagement')
    private daysManagement: Model<DaysManagement>,
  ) {}

  /**
   *
   * Allows you to create an OpenWeatherAPI instance
   *
   * @param location is the name of a city
   * @returns OpenWeatherAPI
   */
  getWeather(location?: string) {
    return new OpenWeatherAPI({
      key: '74495b4272599faefc36d5d8d57a27c0',
      locationName: location ?? 'Quito',
      units: 'metric',
    });
  }

  /**
   *
   * This function allows us to obtain
   * the configuration related to the weather
   *
   * @returns Promise<WeatherManagement>
   */
  async getWeatherManagement(): Promise<WeatherManagement> {
    return await this.weatherManagement.findOne();
  }

  /**
   *
   * This function allows us to save
   * the settings related to the weather
   *
   * @param weatherManagementDTO weather settings
   * @returns Promise<WeatherManagement>
   */
  async postWeatherManagement(
    weatherManagementDTO: WeatherManagementDTO,
  ): Promise<WeatherManagement> {
    const weather = await this.weatherManagement.findOne();
    if (weather?.id) {
      return await this.weatherManagement.findByIdAndUpdate(
        weather.id,
        weatherManagementDTO,
        { new: true },
      );
    } else {
      const weatherManagement = await new this.weatherManagement(
        weatherManagementDTO,
      );
      return await weatherManagement.save();
    }
  }

  /**
   *
   * This function allows us to obtain the
   * configuration related to the days of the week
   *
   * @return Promise<DaysManagement>
   */
  async getDaysManagement(): Promise<DaysManagement> {
    return await this.daysManagement.findOne();
  }

  /**
   *
   * This function allows us to save the
   * configuration related to the days of the week
   *
   * @param daysManagementDTO days settings
   * @return Promise<DaysManagement>
   */
  async postDaysManagement(
    daysManagementDTO: DaysManagementDTO,
  ): Promise<DaysManagement> {
    const days = await this.daysManagement.findOne();
    if (days?.id) {
      return await this.daysManagement.findByIdAndUpdate(
        days.id,
        daysManagementDTO,
        { new: true },
      );
    } else {
      const daysManagement = await new this.daysManagement(daysManagementDTO);
      return await daysManagement.save();
    }
  }
}
