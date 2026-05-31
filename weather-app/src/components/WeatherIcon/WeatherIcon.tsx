import ClearDay from "../../assets/weather/ClearDay/ClearDay";
import ClearNight from "../../assets/weather/ClearNight/ClearNight";
import Drizzle from "../../assets/weather/Drizzle/Drizzle";
import Fog from "../../assets/weather/Fog/Fog";
import Cloudy from "../../assets/weather/Cloudy/Cloudy";
import Hail from "../../assets/weather/Hail/Hail";
import HeavyRain from "../../assets/weather/HeavyRain/HeavyRain";
import PartlyCloudyDay from "../../assets/weather/PartlyCloudyDay/PartlyCloudyDay";
import PartlyCloudyNight from "../../assets/weather/PartlyCloudyNight/PartlyCloudyNight";
import Rain from "../../assets/weather/Rain/Rain";
import Snow from "../../assets/weather/Snow/Snow";
import Thunderstorm from "../../assets/weather/Thunderstorm/Thunderstorm";
import ThunderstormRain from "../../assets/weather/ThunderstormRain/ThunderstormRain";


interface WeatherIconProps {
  condition: string;
  isDay?: boolean;
  className?: string;
}

export function WeatherIcon({
  condition,
  isDay = true,
  className,
}: WeatherIconProps) {
  const normalized = condition.toLowerCase();

  let Icon = isDay ? ClearDay : ClearNight;

  if (normalized.includes("thunder") && normalized.includes("rain")) {
    Icon = ThunderstormRain;
  } else if (normalized.includes("thunder")) {
    Icon = Thunderstorm;
  } else if (
    normalized.includes("heavy rain") ||
    normalized.includes("torrential")
  ) {
    Icon = HeavyRain;
  } else if (normalized.includes("rain") || normalized.includes("shower")) {
    Icon = Rain;
  } else if (normalized.includes("drizzle")) {
    Icon = Drizzle;
  } else if (normalized.includes("snow") || normalized.includes("blizzard")) {
    Icon = Snow;
  } else if (
    normalized.includes("hail") ||
    normalized.includes("sleet") ||
    normalized.includes("ice pellets")
  ) {
    Icon = Hail;
  } else if (
    normalized.includes("fog") ||
    normalized.includes("mist") ||
    normalized.includes("haze")
  ) {
    Icon = Fog;
  } else if (normalized.includes("partly cloudy")) {
    Icon = isDay ? PartlyCloudyDay : PartlyCloudyNight;
  } else if (normalized.includes("cloud") || normalized.includes("overcast")) {
    Icon = Cloudy;
  } else if (normalized.includes("clear") || normalized.includes("sunny")) {
    Icon = isDay ? ClearDay : ClearNight;
  }

  return <Icon className={className} aria-hidden />;
}
