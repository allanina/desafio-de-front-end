import { describe, expect, it } from "vitest";

import { getWeatherTheme } from "../weather-theme";

describe("getWeatherTheme", () => {
  it("should return theme-clear for clear weather", () => {
    expect(
      getWeatherTheme("Clear")
    ).toBe("theme-clear");
  });

  it("should return theme-clear for sunny weather", () => {
    expect(
      getWeatherTheme("Sunny")
    ).toBe("theme-clear");
  });

  it("should return theme-snow for snow weather", () => {
    expect(
      getWeatherTheme("Light snow")
    ).toBe("theme-snow");
  });

  it("should return theme-cloud for cloudy weather", () => {
    expect(
      getWeatherTheme("Partly cloudy")
    ).toBe("theme-cloud");
  });

  it("should return theme-cloud for overcast weather", () => {
    expect(
      getWeatherTheme("Overcast")
    ).toBe("theme-cloud");
  });

  it("should return theme-rain for rain weather", () => {
    expect(
      getWeatherTheme("Moderate rain")
    ).toBe("theme-rain");
  });

  it("should return theme-rain for drizzle weather", () => {
    expect(
      getWeatherTheme("Patchy drizzle")
    ).toBe("theme-rain");
  });

  it("should return theme-default for unknown condition", () => {
    expect(
      getWeatherTheme("Volcanic ash")
    ).toBe("theme-default");
  });
});