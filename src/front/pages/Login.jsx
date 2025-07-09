import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!resp.ok) throw new Error("Usuario No Registrado")

      const data = await resp.json()
      login(data.token)

      setTimeout(() => {
        navigate("/private")
      }, 150)
    } catch (error) {
      alert("Error de inicio de sesión: " + error.message)
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleLogin()
        }}
        className="bg-white p-5 rounded shadow"
        style={{ minWidth: "300px", maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <div className="form-group mb-3">
          <label>Correo</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-4">
          <label>Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Iniciar sesión
        </button>
      </form>
    </div>
  )
}

export default Login
