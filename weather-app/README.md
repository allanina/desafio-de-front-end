# Weather App

A responsive weather application built with React, TypeScript and WeatherAPI.

The application allows users to browse a predefined list of cities and view detailed weather information, including current conditions, temperatures throughout the day and additional weather metrics.

A live version of this project can be seen at https://desafio-de-front-end-eight.vercel.app/

---

## Preview

### Home - mobile

<img src="./docs/home-mobile.png" alt="Home mobile screen" width="700"/>

### Home - desktop

<img src="./docs/home-desktop.png" alt="Home desktop screen" width="700"/>

### City Details - mobile

<img src="./docs/city-details-mobile.png" alt="City details mobile screen" width="700"/>

### City Details - desktop

<img src="./docs/city-details-desktop.png" alt="City details desktop screen" width="700"/>

---

The layout was implemented responsively and tested across mobile, tablet and desktop widths.

---

## Test Coverage

Current test coverage:

![Coverage](./docs/coverage.png)

```txt
Statements: 93.18%
Branches:   92.5%
Functions:  96.66%
Lines:      93.1%
```

Tested areas:

- SVG icon components
- WeatherIcon component
- useWeather hook
- Weather API service
- Home page
- City Details page
- Weather utilities
- Temperature period calculations

---

## Features

- Predefined city list
- Weather details page
- Current weather conditions
- Dynamic weather themes
- Temperature periods
  - Dawn
  - Morning
  - Afternoon
  - Night
- Responsive layout
  - Mobile
  - Tablet
  - Desktop
- Accessibility support
- Automated tests

---

## Tech Stack

### Front-end

- React 19
- TypeScript
- Vite
- React Router

### Data Fetching

- TanStack Query

### Testing

- Vitest
- React Testing Library
- Jest DOM

### API

- WeatherAPI

---

## Installation

```bash
npm install
```

---

## Environment Variables

Create a `.env` file:

```env
VITE_WEATHER_API_KEY=your_api_key
```

You can obtain an API key at: https://www.weatherapi.com/ and  to the `.env` file. See `.emv-example` for example.

---

## Running the Application

```bash
npm run dev
```

Application:

```txt
http://localhost:5173
```

---

## Running Tests

Run tests:

```bash
npm run test
```

Run coverage:

```bash
npm run test:coverage
```

Run Vitest UI:

```bash
npm run test:ui
```

---

## Production Build

```bash
npm run build
```

---

## Project Structure

```txt
src/
├── assets/
├── components/
├── data/
├── hooks/
├── pages/
├── routes/
├── services/
├── types/
├── utils/
└── tests/
```

---

## Accessibility

The project follows accessibility best practices:

- Semantic HTML
- Keyboard navigation
- Screen-reader friendly labels
- Accessible navigation links

---

## Architecture Decisions

- React Query for server state management
- Component-based SVG icons
- Responsive design based on Figma specifications
- Utility functions isolated and tested
- Reusable weather icon mapping component

---

## Author

Developed as a Front-end Technical Challenge using React, TypeScript and modern testing practices.