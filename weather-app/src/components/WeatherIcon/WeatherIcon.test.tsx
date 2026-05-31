import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { WeatherIcon } from "./WeatherIcon";

vi.mock("../../assets/weather/ClearDay/ClearDay", () => ({
  default: () => <div data-testid="clear-day" />,
}));

vi.mock("../../assets/weather/ClearNight/ClearNight", () => ({
  default: () => <div data-testid="clear-night" />,
}));

vi.mock("../../assets/weather/Cloudy/Cloudy", () => ({
  default: () => <div data-testid="cloudy" />,
}));

vi.mock("../../assets/weather/Drizzle/Drizzle", () => ({
  default: () => <div data-testid="drizzle" />,
}));

vi.mock("../../assets/weather/Fog/Fog", () => ({
  default: () => <div data-testid="fog" />,
}));

vi.mock("../../assets/weather/Hail/Hail", () => ({
  default: () => <div data-testid="hail" />,
}));

vi.mock("../../assets/weather/HeavyRain/HeavyRain", () => ({
  default: () => <div data-testid="heavy-rain" />,
}));

vi.mock("../../assets/weather/PartlyCloudyDay/PartlyCloudyDay", () => ({
  default: () => <div data-testid="partly-cloudy-day" />,
}));

vi.mock("../../assets/weather/PartlyCloudyNight/PartlyCloudyNight", () => ({
  default: () => <div data-testid="partly-cloudy-night" />,
}));

vi.mock("../../assets/weather/Rain/Rain", () => ({
  default: () => <div data-testid="rain" />,
}));

vi.mock("../../assets/weather/Snow/Snow", () => ({
  default: () => <div data-testid="snow" />,
}));

vi.mock("../../assets/weather/Thunderstorm/Thunderstorm", () => ({
  default: () => <div data-testid="thunderstorm" />,
}));

vi.mock("../../assets/weather/ThunderstormRain/ThunderstormRain", () => ({
  default: () => <div data-testid="thunderstorm-rain" />,
}));

describe("WeatherIcon", () => {
  it("should render ClearDay for sunny conditions during the day", () => {
    render(
      <WeatherIcon
        condition="Sunny"
        isDay
      />
    );

    expect(
      screen.getByTestId("clear-day")
    ).toBeInTheDocument();
  });

  it("should render ClearNight for clear conditions at night", () => {
    render(
      <WeatherIcon
        condition="Clear"
        isDay={false}
      />
    );

    expect(
      screen.getByTestId("clear-night")
    ).toBeInTheDocument();
  });

  it("should render PartlyCloudyDay", () => {
    render(
      <WeatherIcon
        condition="Partly cloudy"
        isDay
      />
    );

    expect(
      screen.getByTestId("partly-cloudy-day")
    ).toBeInTheDocument();
  });

  it("should render PartlyCloudyNight", () => {
    render(
      <WeatherIcon
        condition="Partly cloudy"
        isDay={false}
      />
    );

    expect(
      screen.getByTestId("partly-cloudy-night")
    ).toBeInTheDocument();
  });

  it("should render Rain", () => {
    render(
      <WeatherIcon
        condition="Patchy rain nearby"
      />
    );

    expect(
      screen.getByTestId("rain")
    ).toBeInTheDocument();
  });

  it("should render HeavyRain", () => {
    render(
      <WeatherIcon
        condition="Heavy rain"
      />
    );

    expect(
      screen.getByTestId("heavy-rain")
    ).toBeInTheDocument();
  });

  it("should render Snow", () => {
    render(
      <WeatherIcon
        condition="Blizzard"
      />
    );

    expect(
      screen.getByTestId("snow")
    ).toBeInTheDocument();
  });

  it("should render Fog", () => {
    render(
      <WeatherIcon
        condition="Mist"
      />
    );

    expect(
      screen.getByTestId("fog")
    ).toBeInTheDocument();
  });

  it("should render ThunderstormRain", () => {
    render(
      <WeatherIcon
        condition="Thunder rain"
      />
    );

    expect(
      screen.getByTestId("thunderstorm-rain")
    ).toBeInTheDocument();
  });

  it("should fallback to ClearDay", () => {
    render(
      <WeatherIcon
        condition="Unknown weather"
      />
    );

    expect(
      screen.getByTestId("clear-day")
    ).toBeInTheDocument();
  });
});