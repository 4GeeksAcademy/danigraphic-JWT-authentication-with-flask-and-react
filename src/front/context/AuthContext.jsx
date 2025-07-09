import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedToken = sessionStorage.getItem("token")
    if (savedToken) {
      setToken(savedToken)
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  const login = (newToken) => {
    sessionStorage.setItem("token", newToken)
    setToken(newToken)
    setIsAuthenticated(true)
  }

  const logout = () => {
    sessionStorage.removeItem("token")
    setToken(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
