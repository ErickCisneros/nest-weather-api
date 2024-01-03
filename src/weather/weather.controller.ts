import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { DaysManagementDTO } from './dto/days-management.dto';
import { WeatherManagementDTO } from './dto/weather-management.dto';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  /**
   *
   * With this function we will obtain information
   * about the weather with the respective settings
   *
   * @param res allows the API to respond back to the client
   * @param body is the information received from the client
   */
  @Post()
  async postWeather(@Res() res, @Body() body) {
    try {
      const { city } = body;
      const weatherManagement =
        await this.weatherService.getWeatherManagement();
      const daysManagement = await this.weatherService.getDaysManagement();
      const openWeatherAPI = this.weatherService.getWeather(city);
      const currentWeather = await openWeatherAPI.getCurrent({
        units: weatherManagement?.units ?? 'metric',
      });
      const dailyWeather = await openWeatherAPI.getDailyForecast(
        daysManagement?.days ?? 7,
        daysManagement?.includeToday ?? false,
        {
          units: weatherManagement?.units ?? 'metric',
        },
      );
      res.status(HttpStatus.OK).json({ currentWeather, dailyWeather });
    } catch (error) {
      console.error(error);
      res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  /**
   *
   * This function allows us to obtain
   * the configuration related to the weather
   *
   * @param res allows the API to respond back to the client
   */
  @Get('weather-management')
  async getWeatherManagement(@Res() res) {
    try {
      const weatherManagement =
        await this.weatherService.getWeatherManagement();
      res.status(HttpStatus.OK).json(weatherManagement);
    } catch (error) {
      console.error(error);
      res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  /**
   *
   * This function allows us to save
   * the settings related to the weather
   *
   * @param res allows the API to respond back to the client
   * @param weatherManagementDTO is the information received from the client
   */
  @Post('weather-management')
  async postWeatherManagement(
    @Res() res,
    @Body() weatherManagementDTO: WeatherManagementDTO,
  ) {
    try {
      const weatherManagement =
        await this.weatherService.postWeatherManagement(weatherManagementDTO);
      res.status(HttpStatus.OK).json(weatherManagement);
    } catch (error) {
      console.error(error);
      res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  /**
   *
   * This function allows us to obtain the
   * configuration related to the days of the week
   *
   * @param res allows the API to respond back to the client
   */
  @Get('days-management')
  async getDaysManagement(@Res() res) {
    try {
      const daysManagement = await this.weatherService.getDaysManagement();
      res.status(HttpStatus.OK).json(daysManagement);
    } catch (error) {
      console.error(error);
      res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  /**
   *
   * This function allows us to save the
   * configuration related to the days of the week
   *
   * @param res allows the API to respond back to the client
   * @param daysManagementDTO is the information received from the client
   */
  @Post('days-management')
  async postDaysManagement(
    @Res() res,
    @Body() daysManagementDTO: DaysManagementDTO,
  ) {
    try {
      const daysManagement =
        await this.weatherService.postDaysManagement(daysManagementDTO);
      res.status(HttpStatus.OK).json(daysManagement);
    } catch (error) {
      console.error(error);
      res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }
}
