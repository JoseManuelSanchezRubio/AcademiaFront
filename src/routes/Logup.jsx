import { useState } from "react";
import Nav from "../Nav";

export default function Logup() {

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dni, setDni] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorDni, setErrorDni] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

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

  function handleSubmit(e) {
    e.preventDefault();

    if (
      name == "" ||
      surname == "" ||
      dni == "" ||
      email == "" ||
      address == "" ||
      phone == "" ||
      password == "" ||
      confirmPassword == ""
    )
      return alert("Todos los campos son obligatorios");
    if (password !== confirmPassword)
      return alert("Las contraseñas no coinciden");

    /* const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                surname: surname,
                dni: dni,
                address: address,
                phone: phone,
                email: email,
                password: password
            })
        };
        fetch('http://127.0.0.1:8000/api/users', requestOptions)
            .then(response => response.json())
            .then(data => checkLogup(data)
            ); */
  }

  let isLogged = false;
  if (sessionStorage.getItem("token")) isLogged = true;

  return (
    <div>
      <Nav isLogged={isLogged} />
      <section className="d-flex justify-content-center p-5">
        <div>
          <h1 className="mb-4">Crear cuenta</h1>
          <form>
            <div className="row">
              <div className="form-outline mb-4 col">
                <label className="form-label" htmlFor="name">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-outline mb-4 col">
                <label className="form-label" htmlFor="surname">
                  Apellidos
                </label>
                <input
                  type="text"
                  id="surname"
                  className="form-control"
                  onChange={(e) => setSurname(e.target.value)}
                />
              </div>
              <div className="form-outline mb-4 col">
                <label className="form-label" htmlFor="dni">
                  DNI
                </label>
                <input
                  type="text"
                  id="dni"
                  className="form-control"
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
                  className="form-control"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="form-outline mb-4 col">
                <label className="form-label" htmlFor="phone">
                  Teléfono
                </label>
                <input
                  type="text"
                  id="phone"
                  className="form-control"
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
                className="form-control"
                onChange={(e) => handleEmail(e.target.value)}
              />
              <div className="text-danger fst-italic small">{errorEmail}</div>
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="password">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                onChange={(e) => handlePassword(e.target.value)}
              />
              <div className="text-danger fst-italic small">
                {password == "" ? (
                  errorPassword
                ) : (
                  <div>
                    {errorPassword}
                    <span className="ms-2">
                      <img
                        id="info"
                        src="src\assets\info.png"
                        style={{ width: "15px" }}
                      ></img>
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="confirmPass">
                Repite contraseña
              </label>
              <input
                type="password"
                id="confirmPass"
                className="form-control"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
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