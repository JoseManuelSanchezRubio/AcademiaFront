import emailjs from "@emailjs/browser";
import { useRef } from "react";

export default function Email() {
  const form = useRef();
  const send = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_oju08vw",
        "template_5t6uelo",
        form.current,
        "jhDO1MAWQEsaXebL0"
      )
      .then(
        (result) => {
          alert("message sent successfully...");
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <form onSubmit={send} ref={form}>
      <label>Enviar a:</label>
      <input type="text" name="to_name" />
      <label>De:</label>
      <input type="text" name="from_name" />
      <label>Correo Electrónico</label>
      <input type="text" name="to_email" />
      <label>Asunto</label>
      <input type="text" name="message" />
      <button className="btn btn-primary" type="submit">
        Enviar Mensaje
      </button>
    </form>
  );
}
