import './App.css';
import React, { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("Sikeres bejelentkezés!");
      } else {
        setMessage(data.message || "Sikertelen bejelentkezés!");
      }
    } catch (error) {
      setMessage("Egy hiba merült fel. Próbálja újra.");
    }
  };

  return (
    <div>
      <h1>Bejelentkezés</h1>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Bejelentkezés</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default App;