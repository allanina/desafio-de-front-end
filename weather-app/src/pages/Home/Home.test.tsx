import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import { Home } from "./Home";
import { cities } from "../../data/cities";

vi.mock("../../assets/GlobeIcon/GlobeIcon", () => ({
  default: () => (
    <div data-testid="globe-icon" />
  ),
}));

describe("Home", () => {
  it("should render page title", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", {
        name: "Weather",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText("Select a city")
    ).toBeInTheDocument();
  });

  it("should render globe icon", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(
      screen.getByTestId("globe-icon")
    ).toBeInTheDocument();
  });

  it("should render all cities", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    cities.forEach((city) => {
      expect(
        screen.getByText(city.name)
      ).toBeInTheDocument();
    });
  });

  it("should render links for all cities", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const links = screen.getAllByRole("link");

    expect(links).toHaveLength(
      cities.length
    );

    cities.forEach((city) => {
      expect(
        screen.getByRole("link", {
          name: city.name,
        })
      ).toHaveAttribute(
        "href",
        `/city/${city.id}`
      );
    });
  });
});