export function getWeatherTheme(condition: string) {
  const normalized = condition.toLowerCase();

  if (normalized.includes("clear") || normalized.includes("sunny")) {
    return "theme-clear";
  }

  if (normalized.includes("snow")) {
    return "theme-snow";
  }

  if (normalized.includes("cloud") || normalized.includes("overcast")) {
    return "theme-cloud";
  }

  if (normalized.includes("rain") || normalized.includes("drizzle")) {
    return "theme-rain";
  }

  return "theme-default";
}
