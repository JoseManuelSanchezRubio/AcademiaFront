import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ForgotPassword from "../ForgotPassword";
import Nav from "../Nav";
import NavAdmin from "../NavAdmin";
import NavProfessor from "../NavProfessor";
//assets imports
import showPassword from "../assets/show-password.png";
import { URL } from "../url";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isProfessor, setIsProfessor] = useState(false);

  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const [typeInput, setTypeInput] = useState("password");

  useEffect(() => {
    if (
      sessionStorage.getItem("token") != null &&
      sessionStorage.getItem("user") != null
    )
      return navigate("/user");
    if (
      sessionStorage.getItem("token") != null &&
      sessionStorage.getItem("professor") != null
    )
      return navigate("/professor");
    if (
      sessionStorage.getItem("token") != null &&
      sessionStorage.getItem("admin") != null
    )
      return navigate("/admin");
  }, []);

  function setInputTypeToText() {
    setTypeInput("text");
  }
  function setInputTypeToPassword() {
    setTypeInput("password");
  }

  function handleCheck() {
    if (isProfessor) {
      setIsProfessor(false);
    } else {
      setIsProfessor(true);
    }
  }
  function handleEmail(e) {
    let emailRegex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    setEmail(e);
    if (!emailRegex.test(e)) {
      setErrorEmail("El email introducido no es válido");
    } else {
      setErrorEmail("");
    }
    if (e == "") setErrorEmail("Debes rellenar este campo");
  }
  function handlePassword(e) {
    setPassword(e);
    if (e == "") {
      setErrorPassword("Debes rellenar este campo");
    } else {
      setErrorPassword("");
    }
  }

  function checkLogin(data) {
    if (data.status) {
      if (email == "admin@learningenjoying.com") {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("admin", JSON.stringify(data.user));
        navigate("/admin");
      } else if (isProfessor) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("professor", JSON.stringify(data.professor));
        navigate("/professor");
      } else {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        navigate("/user");
      }
    } else {
      alert(data.message);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    let error = false;
    if (email == "") {
      setErrorEmail("Debes rellenar este campo");
      error = true;
    }
    if (password == "") {
      setErrorPassword("Debes rellenar este campo");
      error = true;
    }
    if (!error && errorEmail == "" && errorPassword == "") {
      if (isProfessor) {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };
        fetch(`${URL}/professors/login`, requestOptions)
          .then((response) => response.json())
          .then((data) => checkLogin(data));
      } else {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };
        fetch(`${URL}/users/login`, requestOptions)
          .then((response) => response.json())
          .then((data) => checkLogin(data));
      }
    }
  }

  return (
    <div>
      {sessionStorage.getItem("user") && (
        <Nav
          isLogged={
            sessionStorage.getItem("token") != null &&
            sessionStorage.getItem("user") != null
          }
        ></Nav>
      )}
      {sessionStorage.getItem("professor") && (
        <NavProfessor
          isLogged={
            sessionStorage.getItem("token") != null &&
            sessionStorage.getItem("professor") != null
          }
        ></NavProfessor>
      )}
      {sessionStorage.getItem("admin") && (
        <NavAdmin
          isLogged={
            sessionStorage.getItem("token") != null &&
            sessionStorage.getItem("admin") != null
          }
        ></NavAdmin>
      )}
      {sessionStorage.getItem("user") == null &&
        sessionStorage.getItem("professor") == null &&
        sessionStorage.getItem("admin") == null && (
          <Nav
            isLogged={
              sessionStorage.getItem("token") != null &&
              sessionStorage.getItem("user") != null
            }
          ></Nav>
        )}
      <section className="login container py-md-5 p-4">
        <div>
          <h1 className="mb-4 fw-bold">Iniciar sesión</h1>
          <form>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="emailForm">
                Email
              </label>
              <input
                type="email"
                id="emailForm"
                className={
                  errorEmail == ""
                    ? "form-control input-darktheme"
                    : "form-control border border-danger shadow-none input-darktheme"
                }
                onChange={(e) => handleEmail(e.target.value)}
              />
              <div className="text-danger fst-italic small">{errorEmail}</div>
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="passwordForm">
                Contraseña
              </label>
              <div className="position-relative">
                <input
                  type={typeInput}
                  id="passwordForm"
                  className={
                    errorPassword == ""
                      ? "form-control input-darktheme"
                      : "form-control border border-danger shadow-none input-darktheme"
                  }
                  onChange={(e) => handlePassword(e.target.value)}
                />
                <div className="position-absolute top-50 end-0 translate-middle-y pe-2">
                  <img
                    src={showPassword}
                    width="20px"
                    style={{ cursor: "pointer" }}
                    onMouseDown={setInputTypeToText}
                    onMouseUp={setInputTypeToPassword}
                    onMouseLeave={setInputTypeToPassword}
                  ></img>
                </div>
              </div>
              <div className="text-danger fst-italic small">
                {errorPassword}
              </div>
            </div>

            <div className="d-flex justify-content-between">
              <div className="form-check col-6">
                <input
                  className="form-check-input input-darktheme"
                  type="checkbox"
                  value=""
                  id="check"
                  onChange={handleCheck}
                />
                <label className="form-check-label mb-3" htmlFor="check">
                  Soy un profesor
                </label>
              </div>
              <ForgotPassword />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block mb-4"
              onClick={handleSubmit}
            >
              Iniciar sesión
            </button>

            <div className="text-center">
              <div className="text-secondary">
                ¿No tienes una cuenta? <Link to="/logup">Regístrate</Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
