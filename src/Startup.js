"use client"
import { useState } from "react"
import "./App.css"
import { Link, useNavigate } from "react-router-dom"
import CryptoJS from "crypto-js" // Import the crypto-js library

const Startup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    // Hash the password using SHA-256 (or another hashing algorithm if needed)
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64)

    const loginData = {
      loginName: email,  // assuming loginName is the email
      tmpHash: hashedPassword, // send the hashed password (tmpHash)
    }

    try {
      const response = await fetch("http://localhost:5271/api/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      })

      if (!response.ok) {
        throw new Error("Login failed, please check your credentials.")
      }

      const data = await response.json()

      // Assuming you would store the login token or handle success
      // Example: localStorage.setItem("token", data.token);
      // Navigate to the profile page
      navigate("/profil")
    } catch (error) {
      setError(error.message)
    }
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
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Jelszó"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            </button>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="submit-btn">
            Bejelentkezés
          </button>

          <Link to="/register">
            <button type="button" className="submit-btn">
              Regisztráció
            </button>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Startup