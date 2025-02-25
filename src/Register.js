"use client"
import { useState } from "react"
import "./App.css"
import {Link, useNavigate } from "react-router-dom"
import SHA256 from "crypto-js/sha256";

const createSHA256 = (input) => {
  return SHA256(input).toString();
};

const generateSalt = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let salt = "";
  for (let i = 0; i < 64; i++) {
    salt += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return salt;
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setErrorMessage("Jelszavak nem egyeznek meg")
      return
    }

    const salt = generateSalt()
    const tmpHash = createSHA256(password + salt)

    const newUser = {
      nev: name,
      email: email,
      salt: salt,
      hash: tmpHash,
      pontszam: 0,
      jogosultsag: 0,
      aktiv: 1,
      jogosultsagNavigation: {
        id: 0,
        szint: 0,
        nev: "user",
        leiras: "Basic user role"
      }
    }

    try {
      const response = await fetch("http://localhost:5271/api/Registry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      })

      if (!response.ok) {
        throw new Error("Registration failed")
      }

      navigate("/")
    } catch (error) {
      setErrorMessage("Hiba történt a regisztráció során")
    }
  }

  return (
    <div>
      <div className="card">
        <div className="header">
          <h1>Regisztráció</h1>
          <p>
            Adja meg az adatait majd kattintson a regisztráció gombra!
          </p>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <input 
              type="text" 
              placeholder="Felhasználónév" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
          <div>
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Jelszó" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <button type="button" className="toggle-password" onClick={togglePasswordVisibility}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            </button>
          </div>
          <div>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Jelszó mégegyszer" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="submit-btn">
            Regisztráció
          </button>

          <Link to="/startup">
            <button className="submit-btn">
              Vissza a bejelentkezéshez
            </button>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Register