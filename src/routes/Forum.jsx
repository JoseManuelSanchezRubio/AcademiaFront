import { useEffect, useState } from "react";
import Nav from "../Nav";
//import assets
import nothing from "../assets/nothing.png";
import send from "../assets/send.png";
import { URL } from "../url";


export default function Forum() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const forum_id = window.location.pathname.split("/")[3];
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
    fetch(`${URL}/messages/forum`, requestOptions)
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
    await fetch(`${URL}/messages/`, requestOptions);
    window.location.reload();
  }
  let isLogged = false;
  if (sessionStorage.getItem("token")) isLogged = true;

  if (!isLogged) return (window.location.href = "/login");

  return (
    <div>
      <Nav isLogged={isLogged}></Nav>
      <div className="container">
        <div className="py-3">
          <h1 className="mb-4">Mensajes del foro</h1>
          <div className="forum-background rounded p-3">
            <div>
              {messages.length == 0 && (
                <div className="no-messages">
                  <img src={nothing} width="200px" />
                  <br></br>
                  <label className="py-4">
                    Vaya... parece que todavía no hay ningún mensaje...
                  </label>
                </div>
              )}
            </div>
            <div>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={
                    message.user_id == userId
                      ? "msg-right m-1 p-2"
                      : "msg-left m-1 p-2"
                  }
                >
                  {message.user_id != userId && (
                    <div className="fw-bold">
                      {message.user.name} {message.user.surname}
                    </div>
                  )}
                  <div className="float-start">{message.body}</div>
                  <div className="msg-date mt-3">{message.created_at}</div>
                </div>
              ))}
            </div>
            <div style={{ clear: "both" }}></div>
          </div>
          <form>
            <div className="form-group d-flex pt-4">
              <input
                type="text"
                className="form-control me-2 rounded-pill"
                id="msg"
                placeholder="Mensaje"
                onChange={(e) => setMessage(e.target.value)}
              />
              {message == "" ? (
                <button
                  type="submit"
                  className="rounded-circle btn border border-white"
                  disabled
                  onClick={(e) => saveMessage(e)}
                >
                  <img src={send} width="25px"></img>
                </button>
              ) : (
                <button
                  type="submit"
                  className="rounded-circle btn"
                  onClick={(e) => saveMessage(e)}
                >
                  <img src={send} width="25px"></img>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}