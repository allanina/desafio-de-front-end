import { beforeEach, describe, expect, it, vi } from "vitest";

import { getWeatherByCity } from "./weather-api";

describe("getWeatherByCity", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should throw when api key is missing", async () => {
    vi.stubEnv("VITE_WEATHER_VITE_WEATHER_API_KEY", "");

    await expect(getWeatherByCity("London")).rejects.toThrow(
      "Missing WeatherAPI key",
    );
  });

  it("should call weather api with correct url", async () => {
    vi.stubEnv("VITE_WEATHER_VITE_WEATHER_API_KEY", "fake-api-key");

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        location: {
          name: "London",
        },
        current: {
          temp_c: 19,
        },
        forecast: {
          forecastday: [],
        },
      }),
    });

    vi.stubGlobal("fetch", fetchMock);

    await getWeatherByCity("London");

    expect(fetchMock).toHaveBeenCalledTimes(1);

    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.weatherapi.com/v1/forecast.json?key=fake-api-key&q=London&days=1&aqi=no&alerts=no",
    );
  });

  it("should return weather data", async () => {
    vi.stubEnv("VITE_WEATHER_VITE_WEATHER_API_KEY", "fake-api-key");

    const responseData = {
      location: {
        name: "London",
      },
      current: {
        temp_c: 19,
      },
      forecast: {
        forecastday: [],
      },
    };

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(responseData),
      }),
    );

    const result = await getWeatherByCity("London");

    expect(result).toEqual(responseData);
  });

  it("should throw when api returns error", async () => {
    vi.stubEnv("VITE_WEATHER_VITE_WEATHER_API_KEY", "fake-api-key");

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
      }),
    );

    await expect(getWeatherByCity("London")).rejects.toThrow(
      "Unable to fetch weather data",
    );
  });
});
