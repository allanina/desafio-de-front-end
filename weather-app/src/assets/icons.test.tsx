import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import GlobeIcon from "./GlobeIcon/GlobeIcon";
import ClearDay from "./weather/ClearDay/ClearDay";
import ClearNight from "./weather/ClearNight/ClearNight";
import Cloudy from "./weather/Cloudy/Cloudy";
import Drizzle from "./weather/Drizzle/Drizzle";
import Fog from "./weather/Fog/Fog";
import Hail from "./weather/Hail/Hail";
import HeavyRain from "./weather/HeavyRain/HeavyRain";
import PartlyCloudyDay from "./weather/PartlyCloudyDay/PartlyCloudyDay";
import PartlyCloudyNight from "./weather/PartlyCloudyNight/PartlyCloudyNight";
import Rain from "./weather/Rain/Rain";
import Snow from "./weather/Snow/Snow";
import Thunderstorm from "./weather/Thunderstorm/Thunderstorm";
import ThunderstormRain from "./weather/ThunderstormRain/ThunderstormRain";
import ArrowUp from "./navigation/ArrowUp";

const icons = [
  ["GlobeIcon", GlobeIcon],
  ["ClearDay", ClearDay],
  ["ClearNight", ClearNight],
  ["Cloudy", Cloudy],
  ["Drizzle", Drizzle],
  ["Fog", Fog],
  ["Hail", Hail],
  ["HeavyRain", HeavyRain],
  ["PartlyCloudyDay", PartlyCloudyDay],
  ["PartlyCloudyNight", PartlyCloudyNight],
  ["Rain", Rain],
  ["Snow", Snow],
  ["Thunderstorm", Thunderstorm],
  ["ThunderstormRain", ThunderstormRain],
  ["ArrowUp", ArrowUp],
] as const;

describe("SVG icons", () => {
  it.each(icons)("should render %s as an SVG", (name, Icon) => {
    render(<Icon data-testid={name} />);

    const icon = screen.getByTestId(name);

    expect(icon).toBeInTheDocument();
    expect(icon.tagName.toLowerCase()).toBe("svg");
  });

  it.each(icons)("should accept custom props for %s", (name, Icon) => {
    render(
      <Icon
        data-testid={name}
        className="custom-icon"
        aria-label={`${name} icon`}
      />
    );

    const icon = screen.getByTestId(name);

    expect(icon).toHaveClass("custom-icon");
    expect(icon).toHaveAttribute("aria-label", `${name} icon`);
  });
});