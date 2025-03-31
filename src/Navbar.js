import { Link, useLocation } from "react-router-dom"
import "./Navbar.css"
import LogoTongue from "./img/LogoTongue.png"

export default function Navbar() {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <header className="navbar-header">
      <nav className="navbar-nav">
        <div className="navbar-container">
          <ul className="navbar-list">
            <li>
              <Link
                className={`nav-link ${currentPath === "/profil" || currentPath === "/profilstatisztika" ? "active" : ""}`}
                to="/profil"
              >
                Profil
              </Link>
            </li>
            <li>
              <Link className={`nav-link ${currentPath === "/szavakmondatok" ? "active" : ""}`} to="/szavakmondatok">
                Szavak és Mondatok
              </Link>
            </li>
            <li>
              <Link className={`nav-link ${currentPath === "/vizsga" ? "active" : ""}`} to="/vizsga">
                Vizsga
              </Link>
            </li>
          </ul>
          <div className="navbar-right">
            <img src={LogoTongue || "/placeholder.svg"} alt="Logo" className="navbar-image" />
            <span className="navbar-text">Nyelvbázis</span>
          </div>
        </div>
      </nav>
    </header>
  )
}

