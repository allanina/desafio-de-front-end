import type { WeatherResponse } from '../types/weather'

const BASE_URL = 'https://api.weatherapi.com/v1'

export async function getWeatherByCity(query: string): Promise<WeatherResponse> {
  const apiKey = import.meta.env.VITE_WEATHER_VITE_WEATHER_API_KEY

  if (!apiKey) {
    throw new Error('Missing WeatherAPI key')
  }

  const response = await fetch(
    `${BASE_URL}/forecast.json?key=${apiKey}&q=${query}&days=1&aqi=no&alerts=no`
  )

  if (!response.ok) {
    throw new Error('Unable to fetch weather data')
  }

  return response.json()
}