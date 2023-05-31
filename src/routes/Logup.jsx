import { useState } from "react";
import { Tooltip } from "reactstrap";
import Nav from "../Nav";
//assets imports
import info from "../assets/info.png";
import showPassword from "../assets/show-password.png";
import { URL } from "../url";

export default function Logup() {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dni, setDni] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorName, setErrorName] = useState("");
  const [errorSurname, setErrorSurname] = useState("");
  const [errorDni, setErrorDni] = useState("");
  const [errorAddress, setErrorAddress] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

  const [typeInputPassword, setTypeInputPassword] = useState("password");
  const [typeInputConfirmPassword, setTypeInputConfirmPassword] =
    useState("password");

  function setInputTypeToText(e) {
    if (e == "password") {
      setTypeInputPassword("text");
    } else {
      setTypeInputConfirmPassword("text");
    }
  }
  function setInputTypeToPassword(e) {
    if (e == "password") {
      setTypeInputPassword("password");
    } else {
      setTypeInputConfirmPassword("password");
    }
  }

  function checkLogup(data) {
    if (data.status) {
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      alert("Cuenta creada correctamente");
      window.location.href = "/login";
    } else {
      alert(data.message);
    }
  }

  function handleName(e) {
    setName(e);
    if (e == "") {
      setErrorName("Debes rellenar este campo");
    } else {
      setErrorName("");
    }
  }
  function handleSurname(e) {
    setSurname(e);
    if (e == "") {
      setErrorSurname("Debes rellenar este campo");
    } else {
      setErrorSurname("");
    }
  }
  function handleDni(e) {
    let dniRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
    setDni(e);
    if (!dniRegex.test(e)) {
      setErrorDni("El DNI introducido no es válido");
    } else {
      setErrorDni("");
    }
    if (e == "") setErrorDni("Debes rellenar este campo");
  }
  function handleAddress(e) {
    setAddress(e);
    if (e == "") {
      setErrorAddress("Debes rellenar este campo");
    } else {
      setErrorAddress("");
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
  function handlePhone(e) {
    let phoneRegex = /^([0-9]{9}$)/;
    setPhone(e);
    if (!phoneRegex.test(e)) {
      setErrorPhone("El teléfono introducido no es válido");
    } else {
      setErrorPhone("");
    }
    if (e == "") setErrorPhone("Debes rellenar este campo");
  }
  function handlePassword(e) {
    let passwordRegex = /([a-zA-Z0-9_.-]{4,})/;
    setPassword(e);
    if (!passwordRegex.test(e)) {
      setErrorPassword("La contraseña introducida no es válida.");
    } else {
      setErrorPassword("");
    }
    if (e == "") setErrorPassword("Debes rellenar este campo");
  }
  function handleConfirmPassword(e) {
    setConfirmPassword(e);
    if (password != e) {
      setErrorConfirmPassword("Las contraseñas no coinciden.");
    } else {
      setErrorConfirmPassword("");
    }
    if (e == "") setErrorConfirmPassword("Debes rellenar este campo");
  }

  function handleSubmit(e) {
    e.preventDefault();
    let error = false;
    if (name == "") {
      setErrorName("Debes rellenar este campo");
      error = true;
    }
    if (surname == "") {
      setErrorSurname("Debes rellenar este campo");
      error = true;
    }
    if (dni == "") {
      setErrorDni("Debes rellenar este campo");
      error = true;
    }
    if (address == "") {
      setErrorAddress("Debes rellenar este campo");
      error = true;
    }
    if (phone == "") {
      setErrorPhone("Debes rellenar este campo");
      error = true;
    }
    if (email == "") {
      setErrorEmail("Debes rellenar este campo");
      error = true;
    }
    if (password == "") {
      setErrorPassword("Debes rellenar este campo");
      error = true;
    }
    if (confirmPassword == "") {
      setErrorConfirmPassword("Debes rellenar este campo");
      error = true;
    }

    if (password != confirmPassword) {
      setErrorConfirmPassword("Las contraseñas no coinciden");
      error = true;
    }
    if (
      !error &&
      errorDni == "" &&
      errorPhone == "" &&
      errorEmail == "" &&
      errorPassword == "" &&
      errorConfirmPassword == ""
    ) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          surname: surname,
          dni: dni,
          address: address,
          phone: phone,
          email: email,
          password: password,
        }),
      };
      fetch(`${URL}/api/users`, requestOptions)
        .then((response) => response.json())
        .then((data) => checkLogup(data));
    }
  }

  let isLogged = false;
  if (sessionStorage.getItem("token")) isLogged = true;

  return (
    <div>
      <Nav isLogged={isLogged} />
      <br></br>
      <section className="d-flex justify-content-center p-5">
        <div>
          <h1 className="mb-4 fw-bold">Crear cuenta</h1>
          <form>
            <div className="row">
              <div className="form-outline mb-4 col">
                <label className="form-label" htmlFor="name">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  className={
                    errorName == ""
                      ? "form-control"
                      : "form-control border border-danger shadow-none"
                  }
                  onChange={(e) => handleName(e.target.value)}
                />
                <div className="text-danger fst-italic small">{errorName}</div>
              </div>
              <div className="form-outline mb-4 col">
                <label className="form-label" htmlFor="surname">
                  Apellidos
                </label>
                <input
                  type="text"
                  id="surname"
                  className={
                    errorSurname == ""
                      ? "form-control"
                      : "form-control border border-danger shadow-none"
                  }
                  onChange={(e) => handleSurname(e.target.value)}
                />
                <div className="text-danger fst-italic small">
                  {errorSurname}
                </div>
              </div>
              <div className="form-outline mb-4 col">
                <label className="form-label" htmlFor="dni">
                  DNI
                </label>
                <input
                  type="text"
                  id="dni"
                  className={
                    errorDni == ""
                      ? "form-control"
                      : "form-control border border-danger shadow-none"
                  }
                  onChange={(e) => handleDni(e.target.value)}
                />
                <div className="text-danger fst-italic small">
                  {errorDni != "" && errorDni}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="form-outline mb-4 col">
                <label className="form-label" htmlFor="address">
                  Dirección
                </label>
                <input
                  type="text"
                  id="address"
                  className={
                    errorAddress == ""
                      ? "form-control"
                      : "form-control border border-danger shadow-none"
                  }
                  onChange={(e) => handleAddress(e.target.value)}
                />
                <div className="text-danger fst-italic small">
                  {errorAddress}
                </div>
              </div>

              <div className="form-outline mb-4 col">
                <label className="form-label" htmlFor="phone">
                  Teléfono
                </label>
                <input
                  type="text"
                  id="phone"
                  className={
                    errorPhone == ""
                      ? "form-control"
                      : "form-control border border-danger shadow-none"
                  }
                  onChange={(e) => handlePhone(e.target.value)}
                />
                <div className="text-danger fst-italic small">{errorPhone}</div>
              </div>
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
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
              <label className="form-label" htmlFor="password">
                Contraseña
              </label>
              <div className="position-relative">
                <input
                  type={typeInputPassword}
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
                    src={showPassword}
                    width="20px"
                    style={{ cursor: "pointer" }}
                    id="password"
                    onMouseDown={(e) => setInputTypeToText(e.target.id)}
                    onMouseUp={(e) => setInputTypeToPassword(e.target.id)}
                    onMouseLeave={(e) => setInputTypeToPassword(e.target.id)}
                  ></img>
                </div>
              </div>
              <div className="text-danger fst-italic small">
                {password == "" || errorPassword == "" ? (
                  errorPassword
                ) : (
                  <div>
                    {errorPassword}
                    <span style={{ cursor: "pointer" }} className="ms-2">
                      <img id="info" src={info} style={{ width: "15px" }}></img>

                      <Tooltip
                        placement="bottom"
                        isOpen={popoverOpen}
                        target="info"
                        toggle={() => {
                          setPopoverOpen(!popoverOpen);
                        }}
                      >
                        La contraseña debe tener al menos cuatro carácteres. Los
                        carácteres especiales permitidos son: punto ( . ), guion
                        ( - ) y guión bajo ( _ )
                      </Tooltip>
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="confirmPass">
                Repite contraseña
              </label>
              <div className="position-relative">
                <input
                  type={typeInputConfirmPassword}
                  id="confirmPasswordForm"
                  className={
                    errorPassword == ""
                      ? "form-control"
                      : "form-control border border-danger shadow-none"
                  }
                  onChange={(e) => handleConfirmPassword(e.target.value)}
                />
                <div className="position-absolute top-50 end-0 translate-middle-y pe-2">
                  <img
                    src={showPassword}
                    width="20px"
                    style={{ cursor: "pointer" }}
                    id="confirmPassword"
                    onMouseDown={(e) => setInputTypeToText(e.target.id)}
                    onMouseUp={(e) => setInputTypeToPassword(e.target.id)}
                    onMouseLeave={(e) => setInputTypeToPassword(e.target.id)}
                  ></img>
                </div>
              </div>
              <div className="text-danger fst-italic small">
                {errorConfirmPassword}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block mb-4"
              onClick={handleSubmit}
            >
              Crear cuenta
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}