"use client"
import { useState } from "react"
import "./App.css"
import { Link, useNavigate } from "react-router-dom"
import CryptoJS from "crypto-js" // Import the crypto-js library
import axios from "axios" // Import axios

const Startup = () => {
  const [LoginName, setLoginName] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")

    const trimmedLogin = LoginName.trim()
    const trimmedPassword = password.trim()
    
    if (!trimmedLogin || !trimmedPassword) {
      throw new Error("Felhasználónév és jelszó megadása kötelező!")
    }
  
    try {
      const saltResponse = await axios.post(`http://localhost:5271/api/Login/GetSalt/${trimmedLogin}`)
      
      const salt = saltResponse.data;
  
      const passwordWithSalt = trimmedPassword + salt;
      const hashedPassword = CryptoJS.SHA256(passwordWithSalt).toString();
      console.log(salt);
      console.log(hashedPassword);
      console.log(CryptoJS.SHA256(hashedPassword).toString(CryptoJS.enc.Base64));
      
      const loginDTO = {
        LoginName: trimmedLogin,
        TmpHash: hashedPassword,
      }
  
      const response = await axios.post("http://localhost:5271/api/Login", loginDTO, {
        headers: {
          "Content-Type": "application/json",
        },
      })
  
      if (response.status !== 200) {
        throw new Error("Sikertelen bejelentkezés, ellenőrizze adatait.");
      }

      const { token, nev, email} = response.data
      localStorage.setItem("token", token);
      localStorage.setItem("name", nev);
      localStorage.setItem("email", email);
      

      navigate("/profil")
    } catch (error) {
      setError(error?.response?.data?.message || "Hiba történt a bejelentkezés során.")
    }
  }

  return (
    <div>
      <div className="card">
        <div className="header">
          <h1>
            Jelentkezzen be ha már regisztrált 
            <br/>
              vagy
            <br/>
             Regisztráljon a folytatáshoz!
          </h1>
        </div>
        <form onSubmit={handleLogin}>
          <div>
            <input
              type="text"
              placeholder="Felhasználónév"
              value={LoginName}
              onChange={(e) => setLoginName(e.target.value)}
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
              aria-label="Jelszó megjelenítése/elrejtése"
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