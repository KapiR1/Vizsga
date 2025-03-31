"use client"

import { useEffect, useState } from "react"
import Navbar from "./Navbar"
import { useNavigate } from "react-router-dom"
import "./Profil.css"
import "./App.css"

export default function Profil() {
  const token = localStorage.getItem("token")
  const [user, setUser] = useState({ name: "", email: "" })
  const [score, setScore] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate("/")
    } else {
      setUser({
        name: localStorage.getItem("name") || "Név nincs megadva",
        email: localStorage.getItem("email") || "Email nincs megadva",
      })

      fetch(`http://localhost:5271/api/User/GetScore?uId=${token}&Nev=${localStorage.getItem("name")}`)
        .then((response) => response.json())
        .then((data) => {
          setScore(data || 0)
        })
        .catch((error) => {
          console.error("Nem sikerült a pontszám lekérése:", error)
          setScore(0)
        })
    }
  }, [token, navigate])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("name")
    localStorage.removeItem("email")
    navigate("/")
  }

  const navigateToStatistics = () => {
    navigate("/profilstatisztika")
  }

  return (
    <div className="profile-wrapper">
      <Navbar />
      {token ? (
        <div className="card2">
          <h2>FELHASZNÁLÓI PROFIL</h2>

          <div className="profile-info">
            <div className="profile-avatar">{user.name.charAt(0).toUpperCase()}</div>

            <div className="profile-details">
              <div className="info-item">
                <div className="info-label">Felhasználónév:</div>
                <div className="info-value">{user.name}</div>
              </div>

              <div className="info-item">
                <div className="info-label">Felhasználói email:</div>
                <div className="info-value">{user.email}</div>
              </div>

              <div className="info-item">
                <div className="info-label">Legnagyobb pontszám:</div>
                <div className="info-value">{score != null ? score : "Pontszám betöltése..."}</div>
              </div>
            </div>
          </div>

          <div className="stats-section">
            <h3>Tanulási előrehaladás</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">{score}</div>
                <div className="stat-label">Megtanult szavak/mondatok</div>
              </div>
            </div>
          </div>

          <div className="profile-actions">
            <button type="button" className="submit-btn" onClick={handleLogout}>
              Kijelentkezés
            </button>
          </div>
        </div>
      ) : (
        <div className="card2">
          <h2>Nincs megjeleníthető adat</h2>
          <p>Kérjük jelentkezzen be a profil megtekintéséhez</p>
          <button type="button" className="submit-btn" onClick={() => navigate("/")}>
            Bejelentkezés
          </button>
        </div>
      )}
    </div>
  )
}

