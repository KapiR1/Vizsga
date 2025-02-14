import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";
import LogoTongue from "./img/LogoTongue.png";

export default function Navbar() {
  return (
    <header className="navbar-header">
      <nav className="navbar-nav">
        <div className="navbar-container">
          <ul className="navbar-list">
            <li>
              <Link className="nav-link" to="/profil">Profil</Link>
            </li>
            <li>
              <Link className="nav-link" to="/szavakmondatok">Szavak és Mondatok</Link>
            </li>
            <li>
              <Link className="nav-link" to="/vizsga">Vizsga</Link>
            </li>
          </ul>
          <div className="navbar-right">
            <img src={LogoTongue} alt="Logo" className="navbar-image" />
            <span className="navbar-text">Nyelvbázis</span>
          </div>
        </div>
      </nav>
    </header>
  );
}