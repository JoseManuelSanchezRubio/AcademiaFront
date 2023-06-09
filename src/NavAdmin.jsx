/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import assets
import moon from "./assets/moon.png";
import sun from "./assets/sun.png";

export default function NavAdmin(props) {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    console.log(theme);
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  function logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("admin");
    sessionStorage.removeItem("courseId");
    return navigate("/");
  }

  return (
    <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand ps-lg-5" to="/">
          Learning Enjoying
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={
            props.isLogged
              ? "collapse navbar-collapse"
              : "collapse navbar-collapse visually-hidden"
          }
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/admin">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/new-course">
                Nuevo curso
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/new-professor">
                Añadir profesor
              </Link>
            </li>
          </ul>
          <div className="navbar-nav me-5">
            <a
              className="nav-link"
              onClick={logout}
              style={{ cursor: "pointer" }}
            >
              Cerrar sesión
            </a>
            <div
              onClick={toggleTheme}
              className="nav-link"
              style={{ cursor: "pointer" }}
            >
              {theme === "light" ? (
                <img src={moon} width="15px"></img>
              ) : (
                <img src={sun} width="15px"></img>
              )}
            </div>
          </div>
        </div>

        <div
          className={
            props.isLogged
              ? "collapse navbar-collapse visually-hidden"
              : "collapse navbar-collapse"
          }
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <div className="navbar-nav me-5">
            <li className="nav-item">
              <Link className="nav-link ps-5" to="/login">
                Acceso
              </Link>
            </li>
            <div
              onClick={toggleTheme}
              className="nav-link"
              style={{ cursor: "pointer" }}
            >
              {theme === "light" ? (
                <img src={moon} width="15px"></img>
              ) : (
                <img src={sun} width="15px"></img>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}