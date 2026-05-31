import { Link } from "react-router-dom";

import GlobeIcon from "../../assets/GlobeIcon/GlobeIcon";
import { cities } from "../../data/cities";

import "./styles.css";

export function Home() {
  return (
    <main className="home-page">
      <section className="home-container" aria-labelledby="home-title">
        <header className="home-header">
          <h1 id="home-title">Weather</h1>
          <p>Select a city</p>
        </header>

        <div className="home-globe">
          <GlobeIcon className="home-globe-icon" aria-hidden />
        </div>

        <nav className="city-list" aria-label="Available cities">
          {cities.map((city) => (
            <Link key={city.id} to={`/city/${city.id}`} className="city-link">
              {city.name}
            </Link>
          ))}
        </nav>
      </section>
    </main>
  );
}