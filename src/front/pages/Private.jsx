import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"

const Private = () => {
  const { token } = useContext(AuthContext)
  const [msg, setMsg] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/private", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) throw new Error("Token inválido")

        const data = await res.json()
        setMsg(data.msg)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }

    fetchData()
  }, [token])

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p className="text-muted">Cargando contenido privado...</p>
      </div>
    )
  }

  if (!token) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p className="text-danger">Acceso denegado. Debes iniciar sesión para acceder a esta sección.</p>
      </div>
    )
  }

  return (
    <div className="container text-center mt-5">
      <h1 className="display-5 text-success">{msg}</h1>
      <p className="text-muted">Hola!</p>
      <p className="text-muted">Esta es una zona privada accesible solo con sesión activa.</p>
    </div>
  )
}

export default Private
