import { useState, useRef } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import emailjs from "@emailjs/browser";

export default function ForgotPassword() {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const form = useRef();
  const password = generatePass();

  const [errorEmail, setErrorEmail] = useState("");
  const [errorDni, setErrorDni] = useState("");

  const toggle = () => setModal(!modal);

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
  function generatePass() {
    let pass = "";
    let str =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789@#$";

    for (let i = 1; i <= 8; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

    return pass;
  }

  const sendEmail = (e) => {
    e.preventDefault();
    let error = false;
    if (email == "") {
      setErrorEmail("Debes rellenar este campo");
      error = true;
    }
    if (dni == "") {
      setErrorDni("Debes rellenar este campo");
      error = true;
    }
    if (!error && errorDni == "" && errorEmail == "") {
      console.log(form.current);
      alert("falta comprobar que coincida el mail con el dni");
      /* emailjs
      .sendForm(
        "service_oju08vw",
        "template_5ld661l",
        form.current,
        "jhDO1MAWQEsaXebL0"
      )
      .then(
        (result) => {
          alert("Correo electrónico enviado");
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      ); */
    }
  };

  return (
    <div>
      <div className="text-primary text-decoration-underline">
        <span onClick={toggle} style={{ cursor: "pointer" }}>
          ¿Has olvidado la contraseña?
        </span>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Recuperación de contraseña</ModalHeader>
        <ModalBody>
          <div className="mb-3">
            Si has olvidado tu contraseña te enviaremos un correo electrónico
            con una nueva. Recuerda cambiarla cuando inicies sesión.
          </div>
          <form ref={form} onSubmit={sendEmail}>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="emailForm">
                Email
              </label>
              <input
                type="email"
                id="emailForm"
                name="to_email"
                className={
                  errorEmail == ""
                    ? "form-control"
                    : "form-control border border-danger shadow-none"
                }
                onChange={(e) => handleEmail(e.target.value)}
              />
              <div className="text-danger fst-italic small">{errorEmail}</div>
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
            <input
              type="hidden"
              name="password"
              defaultValue={password}
            ></input>

            <input
              type="submit"
              className="btn btn-primary"
              value="Enviar"
            ></input>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
