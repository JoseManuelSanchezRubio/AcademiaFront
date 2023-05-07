/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";



export default function Nav(props) {
    function logout() {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("customer");
        window.location.href = "/";
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand ps-5" to="/">Learning enjoying</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={props.isLogged ? "collapse navbar-collapse visually-hidden" : "collapse navbar-collapse"} id="navbarNav">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/logup">Logup</Link>
                    </li>
                </ul>
            </div>
            <div className={props.isLogged ? "collapse navbar-collapse" : "collapse navbar-collapse visually-hidden"} id="navbarNav">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="/profile">Mi perfil</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/courses">Nuestros cursos</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/events">Eventos</Link>
                    </li>
                </ul>
                <div className="navbar-nav me-5">
                    <a className="nav-link" onClick={logout} style={{ cursor: 'pointer' }}>Cerrar sesión</a>
                </div>
            </div>
        </nav>
    )
}