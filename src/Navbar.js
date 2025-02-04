import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // A navbarhoz tartozó stílusokat külön CSS fájlba érdemes tenni

export default function Navbar() {
  const [scrolling, setScrolling] = useState(false); // Állapot a görgetés figyelésére

  // Ezt az effektust használjuk, hogy figyeljük a görgetést
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {  // Ha 100px-nél többet görgettünk lefelé
        setScrolling(true);  // A navbar eltűnik
      } else {
        setScrolling(false); // Ha a tetejére érünk, visszajön
      }
    };

    window.addEventListener('scroll', handleScroll); // A scroll esemény figyelése

    // Cleanup funkció, hogy eltávolítsuk az eseményfigyelőt
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg navbar-light ${scrolling ? 'navbar-hidden' : 'navbar-visible'}`}>
      <a className="navbar-brand" href="#">Nyelvbázis</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/profil">Profil</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/szavakmondatok">Szavak/Mondatok</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/vizsga">Vizsga</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
