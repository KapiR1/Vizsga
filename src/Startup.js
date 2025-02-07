"use client"

import { useState } from "react"
import "./App.css"

const Startup = () => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h1>Üdvözöljük a Nyelvbázison!</h1>
          <p>
            Jelentkezzen be ha már regisztrált 
            <br/>
              Vagy
            <br/>
             Regisztráljon a folytatáshoz!
          </p>
        </div>

        <form>
          <div className="input-group">
            <input type="email" placeholder="Email" />
          </div>

          <div className="input-group">
            <input type={showPassword ? "text" : "password"} placeholder="Jelszó" />
            <button type="button" className="toggle-password" onClick={togglePasswordVisibility}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            </button>
          </div>
          <button type="submit" className="submit-btn">
            Bejelentkezés
          </button>
          <button type="submit" className="submit-btn">
            Regisztráció
          </button>
        </form>
          </div>
        </div>
  )
}

export default Startup

