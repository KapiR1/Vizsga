import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // A navbarhoz tartozó stílusokat külön CSS fájlba érdemes tenni
export default function Navbar() {
  

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Nyelvbázis</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
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

