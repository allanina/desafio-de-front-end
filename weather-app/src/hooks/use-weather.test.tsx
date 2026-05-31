import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useWeather } from "./use-weather";
import { getWeatherByCity } from "../services/weather-api";
import type { WeatherResponse } from "../types/weather";

vi.mock("../services/weather-api", () => ({
  getWeatherByCity: vi.fn(),
}));

describe("useWeather", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createWrapper = () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    return function Wrapper({
      children,
    }: {
      children: React.ReactNode;
    }) {
      return (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );
    };
  };

  const mockResponse: WeatherResponse = {
    location: {
      name: "Recife",
      country: "Brazil",
    },
    current: {
      temp_c: 28,
      wind_mph: 5.2,
      humidity: 72,
      is_day: 1,
      condition: {
        text: "Sunny",
        code: 1000,
      },
    },
    forecast: {
      forecastday: [
        {
          day: {
            maxtemp_c: 31,
            mintemp_c: 24,
          },
          astro: {
            sunrise: "05:15 AM",
            sunset: "05:35 PM",
          },
          hour: [],
        },
      ],
    },
  };

  it("should fetch weather data successfully", async () => {
    vi.mocked(getWeatherByCity).mockResolvedValue(
      mockResponse
    );

    const { result } = renderHook(
      () => useWeather("Recife,BR"),
      {
        wrapper: createWrapper(),
      }
    );

    await waitFor(() =>
      expect(result.current.isSuccess).toBe(true)
    );

    expect(getWeatherByCity).toHaveBeenCalledWith(
      "Recife,BR"
    );

    expect(result.current.data).toEqual(
      mockResponse
    );
  });

  it("should handle errors", async () => {
    vi.mocked(getWeatherByCity).mockRejectedValue(
      new Error("API Error")
    );

    const { result } = renderHook(
      () => useWeather("Recife,BR"),
      {
        wrapper: createWrapper(),
      }
    );

    await waitFor(() =>
      expect(result.current.isError).toBe(true)
    );

    expect(getWeatherByCity).toHaveBeenCalledWith(
      "Recife,BR"
    );
  });

  it("should start in pending state", () => {
    vi.mocked(getWeatherByCity).mockImplementation(
      () =>
        new Promise(() => {
        })
    );

    const { result } = renderHook(
      () => useWeather("Recife,BR"),
      {
        wrapper: createWrapper(),
      }
    );

    expect(result.current.isPending).toBe(true);
  });
});