import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Private from "./pages/Private"
import PrivateRoute from "./components/PrivateRoute"

function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/private" element={
        <PrivateRoute>
          <Private />
        </PrivateRoute>
      } />
    </Routes>
  )
}

export default RoutesApp
