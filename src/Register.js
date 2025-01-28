import './App.css';
import React, { useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("Sikeres regisztráció!");
      } else {
        setMessage(data.message || "Sikertelen regisztráció!");
      }
    } catch (error) {
      setMessage("Egy hiba merült fel. Próbálja újra.");
    }
  };

  return (
    <div>
      <h1>Regisztráció</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Felhasználónév"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Jelszó"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Regisztráció</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Register;