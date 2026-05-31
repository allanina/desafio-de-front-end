import { useQuery } from '@tanstack/react-query'
import { getWeatherByCity } from '../services/weather-api'

export function useWeather(query: string) {
  return useQuery({
    queryKey: ['weather', query],
    queryFn: () => getWeatherByCity(query),
    staleTime: 1000 * 60 * 10,
  })
}