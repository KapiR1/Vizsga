{
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
              placeholder="Név" 
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