import { Link, useParams } from "react-router-dom";

import { WeatherIcon } from "../../components/WeatherIcon/WeatherIcon";
import { cities } from "../../data/cities";
import { useWeather } from "../../hooks/use-weather";
import { getTemperaturePeriods } from "../../utils/temperature-periods";
import { getWeatherTheme } from "../../utils/weather-theme";

import "./styles.css";
import { Arrow } from "../../assets/navigation/Arrow";

export function CityDetails() {
  const { cityId } = useParams();

  const city = cities.find((item) => item.id === cityId);

  if (!city) {
    return (
      <main className="city-details-page theme-default">
        <section className="city-feedback">
          <p>City not found.</p>
          <Link to="/">Back</Link>
        </section>
      </main>
    );
  }

  const { data, isLoading, isError, refetch } = useWeather(city.query);

  if (isLoading) {
    return (
      <main className="city-details-page theme-default">
        <section className="city-feedback">
          <p>Loading weather...</p>
        </section>
      </main>
    );
  }

  if (isError || !data) {
    return (
      <main className="city-details-page theme-default">
        <section className="city-feedback">
          <p>Unable to load weather data.</p>

          <button type="button" onClick={() => refetch()}>
            Try again
          </button>
        </section>
      </main>
    );
  }

  const forecastDay = data.forecast.forecastday[0];
  const periods = getTemperaturePeriods(forecastDay.hour);

  const theme = getWeatherTheme(data.current.condition.text);

  const isDay = Boolean(data.current.is_day);

  return (
    <main className={`city-details-page ${theme}`}>
      <Link className="back-link" to="/" aria-label="Back to city list">
        <Arrow direction="left" className="back-icon" />
      </Link>

      <section className="city-details-container">
        <header className="city-weather-header">
          <h1>{city.name}</h1>

          <p>{data.current.condition.text}</p>
        </header>

        <section
          className="temperature-section"
          aria-label="Current temperature"
        >
          <div className="temperature-wrapper">
            <strong>{Math.round(data.current.temp_c)}</strong>

            <div className="temperature-details">
              <span className="temperature-unit">°c</span>

              <div className="temperature-min-max">
                <div className="temperature-range">
                  <Arrow direction="up" className="temperature-arrow" />

                  <span>{Math.round(forecastDay.day.maxtemp_c)}°</span>
                </div>

                <div className="temperature-range">
                  <Arrow direction="down" className="temperature-arrow" />

                  <span>{Math.round(forecastDay.day.mintemp_c)}°</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <WeatherIcon
          condition={data.current.condition.text}
          isDay={isDay}
          className="main-weather-icon"
        />

        <section className="period-list" aria-label="Daily temperature periods">
          {periods.map((period) => (
            <article key={period.label} className="period-item">
              <h2>{period.label}</h2>

              <WeatherIcon
                condition={period.condition || period.label}
                isDay={period.label !== "Night"}
                className="period-weather-icon"
              />

              <p>{period.temperature}°C</p>
            </article>
          ))}
        </section>

        <section
          className="weather-info-list"
          aria-label="Additional weather information"
        >
          <article className="weather-info-item">
            <h2>Wind speed</h2>

            <p>{data.current.wind_mph.toFixed(2)} m/s</p>
          </article>

          <article className="weather-info-item">
            <h2>Sunrise</h2>

            <p>{forecastDay.astro.sunrise}</p>
          </article>

          <article className="weather-info-item">
            <h2>Sunset</h2>

            <p>{forecastDay.astro.sunset}</p>
          </article>

          <article className="weather-info-item">
            <h2>Humidity</h2>

            <p>{data.current.humidity}%</p>
          </article>
        </section>
      </section>
    </main>
  );
}
