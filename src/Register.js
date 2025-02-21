"use client"
import { useState } from "react"
import "./App.css"
import {useNavigate } from "react-router-dom"
import SHA256 from "crypto-js/sha256";  // Ensure to import SHA256 correctly

// SHA-256 hash function for tmpHash
const createSHA256 = (input) => {
  return SHA256(input).toString();  // Directly use SHA256 and convert to string
};

// Function to generate salt using the same method as in the backend
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
  const navigate = useNavigate()  // Use useNavigate here instead of useHistory

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Jelszavak nem egyeznek meg")
      return
    }

    // Generate salt and hash the password using SHA-256
    const salt = generateSalt()  // Generate salt using backend's method
    const tmpHash = createSHA256(password + salt)  // Combine password with salt and hash it

    const newUser = {
      nev: name,          // User name (nev)
      email: email,       // User email
      salt: salt,         // Generated salt
      hash: tmpHash,      // Hashed password (tmpHash)
      pontszam: 0,        // Default score (pontszam)
      jogosultsag: 0,     // Default permissions (jogosultsag)
      aktiv: 1,           // User is active (aktiv)
      jogosultsagNavigation: {
        id: 0,            // Default role id
        szint: 0,         // Default role level
        nev: "user",      // Default role name
        leiras: "Basic user role"  // Default role description
      }
    }

    try {
      // Send registration request to your backend API
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

      // Redirect user after successful registration
      navigate("/")  // Use navigate here instead of history.push()
    } catch (error) {
      setErrorMessage("Hiba történt a regisztráció során")
    }
  }

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h1>Regisztráció</h1>
          <p>
            Adja meg az adatait majd kattintson a regisztráció gombra!
          </p>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Felhasználónév" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
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
            <button type="button" className="toggle-password" onClick={togglePasswordVisibility}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            </button>
          </div>
          <div className="input-group">
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
        </form>
      </div>
    </div>
  )
}

export default Register