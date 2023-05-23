import { useEffect, useState } from "react";
import Nav from "../Nav";


export default function Forum() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const forum_id = window.location.pathname.split("/")[2];
  const userId = JSON.parse(sessionStorage.getItem("user")).id;

  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        forum_id: forum_id,
      }),
    };
    fetch("http://127.0.0.1:8000/api/messages/forum", requestOptions)
      .then((response) => response.json())
      .then((data) => setMessages(data));
  }, []);

  async function saveMessage(e) {
    if (message == "") return alert("Debes escribir un mensaje");
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: message,
        forum_id: forum_id,
        user_id: userId,
      }),
    };
    await fetch("http://127.0.0.1:8000/api/messages/", requestOptions);
    window.location.reload();
  }

  let isLogged = false;
  if (sessionStorage.getItem("token")) isLogged = true;

  if (!isLogged) return (window.location.href = "/login");

  return (
    <div>
      <Nav isLogged={isLogged}></Nav>
      <h1>Mensajes del foro</h1>
      <div>
        {messages.map((message) => (
          <div
            key={message.id}
            className={message.user_id == userId ? "text-end" : ""}
          >
            {message.body} ({message.user.name})
          </div>
        ))}
      </div>
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="msg"
            placeholder="Mensaje"
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        {message == "" ? (
          <button
            type="submit"
            className="btn btn-primary"
            disabled
            onClick={(e) => saveMessage(e)}
          >
            Enviar
          </button>
        ) : (
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => saveMessage(e)}
          >
            Enviar
          </button>
        )}
      </form>
    </div>
  );
}