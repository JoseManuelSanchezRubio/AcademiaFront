import { useEffect, useState } from "react";
import Nav from "../Nav";
//import assets
import send from "../assets/send.png";
import nothing from "../assets/nothing.png";


export default function Forum() {
  //const [messages, setMessages] = useState([]);
  const messages = [
    {
      id: 1,
      body: "ghostwhite",
      user_id: 1,
      created_at: "01/01/2000",
      user: { id: 1, name: "Carlos", surname: "Martínez" },
    },
    {
      id: 2,
      body: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      user_id: 3,
      created_at: "01/01/2000",
      user: { id: 3, name: "Pedro", surname: "López" },
    },
    {
      id: 3,
      body: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      user_id: 2,
      created_at: "01/01/2000",
      user: { id: 2, name: "María", surname: "Sánchez" },
    },
    {
      id: 4,
      body: "lorem ipsum lorem ipsum lorem ipsum",
      user_id: 1,
      created_at: "01/01/2000",
      user: { id: 1, name: "Carlos", surname: "Martínez" },
    },
    {
      id: 5,
      body: "aliceblue",
      user_id: 1,
      created_at: "01/01/2000",
      user: { id: 1, name: "Carlos", surname: "Martínez" },
    },
    {
      id: 6,
      body: "lorem ipsum lorem ipsum lorem ipsum",
      user_id: 2,
      created_at: "01/01/2000",
      user: { id: 2, name: "María", surname: "Sánchez" },
    },
    {
      id: 7,
      body: "lorem ipsum",
      user_id: 4,
      created_at: "01/01/2000",
      user: { id: 4, name: "Ana", surname: "Rodríguez" },
    },
    {
      id: 8,
      body: "lorem ipsum lorem ipsum lorem ipsum",
      user_id: 1,
      created_at: "01/01/2000",
      user: { id: 1, name: "Carlos", surname: "Martínez" },
    },
    {
      id: 9,
      body: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      user_id: 1,
      created_at: "01/01/2000",
      user: { id: 1, name: "Carlos", surname: "Martínez" },
    },
    {
      id: 10,
      body: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      user_id: 2,
      created_at: "01/01/2000",
      user: { id: 2, name: "María", surname: "Sánchez" },
    },
  ];
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

  //if (!isLogged) return (window.location.href = "/login");

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
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="fw-bold">
                      {message.user.name} {message.user.surname}
                    </div>
                    <div className="small">{message.created_at}</div>
                  </div>
                  <div className="float-start">{message.body}</div>
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