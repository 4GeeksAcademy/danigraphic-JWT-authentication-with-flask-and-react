import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const Navbar = () => {
  const { isAuthenticated, logout, loading } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  if (loading) return null

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link className="navbar-brand" to="/">Mi App</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav ms-auto">
          {!isAuthenticated && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Iniciar Sesión</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">Registrarse</Link>
              </li>
            </>
          )}
          {isAuthenticated && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/private">Zona Privada</Link>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="btn btn-outline-danger ms-3">Cerrar Sesión</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
