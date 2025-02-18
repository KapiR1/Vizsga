import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

export default function Profil() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({ name: "", email: "" });
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!token) {
      navigate("/"); // Ha nincs token, átnavigál a bejelentkezési oldalra
    } else {
      setUser({
        name: localStorage.getItem("name") || "Név nincs megadva",
        email: localStorage.getItem("email") || "Email nincs megadva"
      });
    }
  }, [token, navigate]);
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    navigate("/");
  };

  return (
    <div>
      <Navbar />
      {token ? (
        <div>
          <h1>Felhasználói Profil</h1>
          <h2>{user.name}</h2>
          <h2>{user.email}</h2>
          <button onClick={handleLogout} className="logout-btn">Kijelentkezés</button>
        </div>
      ) : (
        <h1>Nincs megjeleníthető adat</h1>
      )}
    </div>
  );
}