import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import "./App.css";

export default function Profil() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({ name: "", email: "" });
  const [score, setScore] = useState();  // State for storing score
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!token) {
      navigate("/"); // Redirect if no token is found
    } else {
      setUser({
        name: localStorage.getItem("name") || "Név nincs megadva",
        email: localStorage.getItem("email") || "Email nincs megadva",
      });
      
      // Fetching the user's score
      fetch(`http://localhost:5271/api/User/GetScore?uId=${token}&Nev=${localStorage.getItem("name")}`)
        .then(response => response.json())
        .then(data => {
          // Assuming 'score' is a property in the returned data
          setScore(data || 0);  // Default to 0 if score is not available
        })
        .catch(error => {
          console.error("Nem sikerült a pontszám lekérése:", error);
          setScore(0);  // In case of error, default to 0
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
        <div className="card">
          <h1>Felhasználói Profil</h1>
          <h2 className="nevemail">Felhasználónév: {user.name}</h2>
          <h2 className="nevemail">Felhasználói email: {user.email}</h2>
          <h2 className="nevemail">Legnagyobb pontszám: {score != null ? score : "Pontszám betöltése..."}</h2>
          <button type="submit" className="submit-btn" onClick={handleLogout}>Kijelentkezés</button>
        </div>
      ) : (
        <h1>Nincs megjeleníthető adat</h1>
      )}
    </div>
  );
}