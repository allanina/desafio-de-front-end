import type { WeatherHour } from '../types/weather'

const periods = [
  { label: 'Dawn', hour: 3 },
  { label: 'Morning', hour: 9 },
  { label: 'Afternoon', hour: 15 },
  { label: 'Night', hour: 21 },
]

export function getTemperaturePeriods(hours: WeatherHour[]) {
  return periods.map((period) => {
    const hourData = hours.find((item) => {
      const hour = Number(item.time.split(' ')[1].split(':')[0])
      return hour === period.hour
    })

    return {
      label: period.label,
      temperature: Math.round(hourData?.temp_c ?? 0),
      condition: hourData?.condition.text ?? '',
    }
  })
}