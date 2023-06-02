/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function NavAdmin(props) {
  const navigate = useNavigate();
  function logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("courseId");
    return navigate("/login");
  }

  return (
    <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand ps-5" to="/">
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
          </div>
        </div>
      </div>
    </nav>
  );
}