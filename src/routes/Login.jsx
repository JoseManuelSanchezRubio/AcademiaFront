import { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../Nav";



export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isProfessor, setIsProfessor] = useState(false);

    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    const [typeInput, setTypeInput] = useState("password");

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
      setEmail(e);
      if (e == "") {
        setErrorEmail("Debes rellenar este campo");
      } else {
        setErrorEmail("");
      }
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
          window.location.href = "/admin";
        } else if (isProfessor) {
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("professor", JSON.stringify(data.professor));
          window.location.href = "/professor";
        } else {
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("user", JSON.stringify(data.user));
          window.location.href = "/user";
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
          fetch("http://127.0.0.1:8000/api/professors/login", requestOptions)
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
          fetch("http://127.0.0.1:8000/api/users/login", requestOptions)
            .then((response) => response.json())
            .then((data) => checkLogin(data));
        }
      }
    }

    let isLogged = false;
    if (sessionStorage.getItem("token")) isLogged = true;
    return (
      <div>
        <Nav isLogged={isLogged} />
        <section className="p-5 container">
          <div>
            <h1 className="mb-4">Iniciar sesión</h1>
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
                      ? "form-control"
                      : "form-control border border-danger shadow-none"
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
                        ? "form-control"
                        : "form-control border border-danger shadow-none"
                    }
                    onChange={(e) => handlePassword(e.target.value)}
                  />
                  <div className="position-absolute top-50 end-0 translate-middle-y pe-2">
                    <img
                      src="src\assets\show-password.png"
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

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="check"
                  onChange={handleCheck}
                />
                <label className="form-check-label mb-3" htmlFor="check">
                  Soy un profesor
                </label>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block mb-4"
                onClick={handleSubmit}
              >
                Iniciar sesión
              </button>

              <div className="text-center">
                <div>
                  ¿No tienes una cuenta? <Link to="/logup">Regístrate</Link>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    );
}