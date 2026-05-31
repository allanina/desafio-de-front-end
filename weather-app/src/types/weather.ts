export interface WeatherCondition {
  text: string;
  code: number;
}

export interface WeatherHour {
  time: string;
  temp_c: number;
  condition: WeatherCondition;
}

export interface WeatherResponse {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    wind_mph: number;
    humidity: number;
    is_day: number;
    condition: WeatherCondition;
  };
  forecast: {
    forecastday: Array<{
      day: {
        maxtemp_c: number;
        mintemp_c: number;
      };
      astro: {
        sunrise: string;
        sunset: string;
      };
      hour: WeatherHour[];
    }>;
  };
}
