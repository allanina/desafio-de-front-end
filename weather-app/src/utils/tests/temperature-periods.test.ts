import { describe, expect, it } from "vitest";

import { getTemperaturePeriods } from "../temperature-periods";
import type { WeatherHour } from "../../types/weather";

describe("getTemperaturePeriods", () => {
  it("should return temperatures for Dawn, Morning, Afternoon and Night", () => {
    const hours: WeatherHour[] = [
      {
        time: "2026-05-31 03:00",
        temp_c: 21.4,
        condition: {
          text: "Clear",
          code: 1000,
        },
      },
      {
        time: "2026-05-31 09:00",
        temp_c: 25.6,
        condition: {
          text: "Sunny",
          code: 1000,
        },
      },
      {
        time: "2026-05-31 15:00",
        temp_c: 29.2,
        condition: {
          text: "Partly cloudy",
          code: 1003,
        },
      },
      {
        time: "2026-05-31 21:00",
        temp_c: 23.8,
        condition: {
          text: "Clear",
          code: 1000,
        },
      },
    ];

    expect(getTemperaturePeriods(hours)).toEqual([
      {
        label: "Dawn",
        temperature: 21,
        condition: "Clear",
      },
      {
        label: "Morning",
        temperature: 26,
        condition: "Sunny",
      },
      {
        label: "Afternoon",
        temperature: 29,
        condition: "Partly cloudy",
      },
      {
        label: "Night",
        temperature: 24,
        condition: "Clear",
      },
    ]);
  });

  it("should return fallback values when a period hour is missing", () => {
    const hours: WeatherHour[] = [
      {
        time: "2026-05-31 09:00",
        temp_c: 25,
        condition: {
          text: "Sunny",
          code: 1000,
        },
      },
    ];

    expect(getTemperaturePeriods(hours)).toEqual([
      {
        label: "Dawn",
        temperature: 0,
        condition: "",
      },
      {
        label: "Morning",
        temperature: 25,
        condition: "Sunny",
      },
      {
        label: "Afternoon",
        temperature: 0,
        condition: "",
      },
      {
        label: "Night",
        temperature: 0,
        condition: "",
      },
    ]);
  });

  it("should ignore hours that are not mapped periods", () => {
    const hours: WeatherHour[] = [
      {
        time: "2026-05-31 08:00",
        temp_c: 22,
        condition: {
          text: "Cloudy",
          code: 1006,
        },
      },
      {
        time: "2026-05-31 12:00",
        temp_c: 28,
        condition: {
          text: "Sunny",
          code: 1000,
        },
      },
    ];

    expect(getTemperaturePeriods(hours)).toEqual([
      {
        label: "Dawn",
        temperature: 0,
        condition: "",
      },
      {
        label: "Morning",
        temperature: 0,
        condition: "",
      },
      {
        label: "Afternoon",
        temperature: 0,
        condition: "",
      },
      {
        label: "Night",
        temperature: 0,
        condition: "",
      },
    ]);
  });
});