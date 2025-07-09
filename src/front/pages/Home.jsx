import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import { Context } from "../store/appContext";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { store, actions } = useContext(Context);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/hello");
        const data = await resp.json();
        actions.set_hello(data.message);
      } catch (err) {
        console.error("Error:", err);
      }
    };
    fetchMessage();
  }, []);

  return (
    <div className="text-center mt-5">
      <h1>¡Bienvenid@!</h1>
      <img
        src={rigoImageUrl}
        className="rounded-circle"
        alt="Rigo Baby"
        style={{ maxWidth: "200px" }}
      />
      <p className="mt-4">{store.message || "Cargando..."}</p>

      {isAuthenticated ? (
        <button className="btn btn-success" onClick={() => navigate("/private")}>
          Ir a zona privada
        </button>
      ) : (
        <button className="btn btn-primary" onClick={() => navigate("/signup")}>
          Comenzar
        </button>
      )}
    </div>
  );
};

export default Home;
