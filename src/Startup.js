import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Startup() {
  return (
    <div style={{textAlign: "center"}}>
      <h1>Üdvözöljük a Nyelvbázison!</h1>
      <div className="button-container">
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