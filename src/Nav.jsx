/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Pomodoro from "./Pomodoro";

export default function Nav(props) {
  function logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("courseId");
    window.location.href = "/";
  }

  if (props.isLogged) {
    return (
      <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary navbar-dark bg-dark">
        <div className="container-fluid">
          <Link
            aria-label="link-to-main-page"
            className="navbar-brand ps-5"
            to="/"
          >
            Learning enjoying
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar-logged"
            aria-controls="navbar-logged"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbar-logged">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  aria-label="link-to-profile"
                  className="nav-link"
                  to="/user"
                >
                  Mis cursos
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  aria-label="link-to-buy-courses"
                  className="nav-link"
                  to="/courses"
                >
                  Comprar cursos
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  aria-label="link-to-events"
                  className="nav-link"
                  to="/events"
                >
                  Eventos
                </Link>
              </li>
              <li className="nav-item">
                <div className="nav-link" style={{ cursor: "pointer" }}>
                  <Pomodoro />
                </div>
              </li>
            </ul>
            <div className="navbar-nav me-5">
              <div
                className="nav-link"
                onClick={logout}
                style={{ cursor: "pointer" }}
              >
                Cerrar sesión
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary navbar-dark bg-dark">
        <div className="container-fluid">
          <Link
            aria-label="link-to-main-page"
            className="navbar-brand ps-5"
            to="/"
          >
            Learning enjoying
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar-not-logged"
            aria-controls="navbar-not-logged"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbar-not-logged">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <div className="navbar-nav me-5">
              <li className="nav-item">
                <Link
                  aria-label="link-to-login"
                  className="nav-link ps-5"
                  to="/login"
                >
                  Acceso
                </Link>
              </li>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
