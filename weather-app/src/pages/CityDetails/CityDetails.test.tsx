import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import { CityDetails } from "./CityDetails";

vi.mock("../../hooks/use-weather", () => ({
  useWeather: vi.fn(),
}));

vi.mock("../../components/WeatherIcon/WeatherIcon", () => ({
  WeatherIcon: () => <div data-testid="weather-icon" />,
}));

vi.mock("../../utils/temperature-periods", () => ({
  getTemperaturePeriods: () => [
    {
      label: "Morning",
      temperature: 25,
      condition: "Sunny",
    },
    {
      label: "Night",
      temperature: 20,
      condition: "Clear",
    },
  ],
}));

vi.mock("../../utils/weather-theme", () => ({
  getWeatherTheme: () => "theme-clear",
}));

import { useWeather } from "../../hooks/use-weather";

describe("CityDetails", () => {
  it("should render loading state", () => {
    vi.mocked(useWeather).mockReturnValue({
      isLoading: true,
    } as never);

    render(
      <MemoryRouter initialEntries={["/city/recife"]}>
        <Routes>
          <Route path="/city/:cityId" element={<CityDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Loading weather...")).toBeInTheDocument();
  });

  it("should render error state", () => {
    vi.mocked(useWeather).mockReturnValue({
      isLoading: false,
      isError: true,
      refetch: vi.fn(),
    } as never);

    render(
      <MemoryRouter initialEntries={["/city/recife"]}>
        <Routes>
          <Route path="/city/:cityId" element={<CityDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      screen.getByText("Unable to load weather data."),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /try again/i,
      }),
    ).toBeInTheDocument();
  });

  it("should render weather information", () => {
    vi.mocked(useWeather).mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        current: {
          temp_c: 28,
          wind_mph: 5.25,
          humidity: 72,
          is_day: 1,
          condition: {
            text: "Sunny",
          },
        },
        forecast: {
          forecastday: [
            {
              day: {
                maxtemp_c: 32,
                mintemp_c: 24,
              },
              astro: {
                sunrise: "05:10 AM",
                sunset: "05:40 PM",
              },
              hour: [],
            },
          ],
        },
      },
    } as never);

    render(
      <MemoryRouter initialEntries={["/city/recife"]}>
        <Routes>
          <Route path="/city/:cityId" element={<CityDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", {
        name: "Recife",
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("Sunny")).toBeInTheDocument();

    expect(screen.getByText("72%")).toBeInTheDocument();

    expect(screen.getByText("05:10 AM")).toBeInTheDocument();

    expect(screen.getByText("05:40 PM")).toBeInTheDocument();

    expect(screen.getAllByTestId("weather-icon")).toHaveLength(3);
  });
});
