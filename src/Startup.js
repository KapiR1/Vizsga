import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Startup() {
  return (
    <div>
      <h1>Üdvözöljük!</h1>
      <div>
        <Link to="/register">
          <button>Regisztráció</button>
        </Link>
        <br />
        <Link to="/login">
          <button>Bejelentkezés</button>
        </Link>
      </div>
    </div>
  );
}

export default Startup;