import React from "react"
import { BrowserRouter } from "react-router-dom"
import RoutesApp from "./routes"
import Navbar from "./components/Navbar"
import { AuthProvider } from "./context/AuthContext"
import injectContext from "./store/appContext"

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Navbar />
      <RoutesApp />
    </AuthProvider>
  </BrowserRouter>
)

export default injectContext(App)
