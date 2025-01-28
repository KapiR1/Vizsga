import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
      <div>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Pizza Oldal</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <Link class="nav-link" to="/">Profil</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/szavakmondatok">Szavak/Mondatok</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/vizsga">Vizsga</Link>
        </li>
      </ul>
    </div>
  </nav>
      </div>
    )
}