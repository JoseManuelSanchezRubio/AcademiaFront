import { useState, useRef } from "react";
import NavAdmin from "../NavAdmin";
import emailjs from "@emailjs/browser";

export default function NewProfessor() {
  const form = useRef();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dni, setDni] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const sendEmail = () => {
    emailjs
      .sendForm(
        "service_oju08vw",
        "template_5t6uelo",
        form.current,
        "jhDO1MAWQEsaXebL0"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  function checkLogup(data) {
    if (data.status) {
      alert("Profesor añadido correctamente");
      sendEmail();
      window.location.href = "/admin";
    } else {
      alert(data.message);
    }
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
    fetch("http://127.0.0.1:8000/api/professors", requestOptions)
      .then((response) => response.json())
      .then((data) => checkLogup(data));
  }

  let isLogged = false;
  if (sessionStorage.getItem("token") && sessionStorage.getItem("admin"))
    isLogged = true;

  if (!isLogged) return (window.location.href = "/login");

  return (
    <div>
      <NavAdmin isLogged={isLogged} />
      <section className="d-flex justify-content-center p-5">
        <div>
          <h1 className="mb-4">Añadir profesor</h1>
          <form ref={form}>
            <div className="row">
              <div className="form-outline mb-4 col">
                <label className="form-label" htmlFor="name">
                  Nombre
                </label>
                <input
                  type="text"
                  name="to_name"
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
                  onChange={(e) => setDni(e.target.value)}
                />
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
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="to_email"
                id="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="password">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
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
              Añadir
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
