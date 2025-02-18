import React from 'react';
import Navbar from './Navbar';

export default function Profil() {
  const token = localStorage.getItem("token");

  return (
    <div>
      <Navbar />
      {token !== "" ? (
        <div>
          <h1>Felhasználói Profil</h1>
          <h2>{localStorage.getItem("name")}</h2>
          <h2>{localStorage.getItem("email")}</h2>
        </div>
      ) : (
        <h1>Nincs megjeleníthető adat</h1>
      )}
    </div>
  );
}