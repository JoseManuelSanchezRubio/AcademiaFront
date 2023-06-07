import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav";
//import assets
import nothing from "../assets/nothing.png";
import send from "../assets/send.png";
import { URL } from "../url";

export default function Forum() {
  const navigate = useNavigate();
  let isLogged = false;
  //const [messages, setMessages] = useState([]);
  const messages = [
    {
      id: 1,
      body: "asdf",
      created_at: new Date(),
      user_id: 1,
      user: { id: 1, name: "Iván", surname: "Pérez" },
    },
    {
      id: 2,
      body: "asasdfafdf erghwerghwe rger poaogaogv ogbiaeobiaobi roigboerboeb opfbipobh aobiaobihao aorbhaòbih aoivbaobiaòbih arbiar",
      created_at: new Date(),
      user_id: 2,
      user: { id: 2, name: "Iván", surname: "Pérez" },
    },
    {
      id: 3,
      body: "añsldfgj ñgeorijherop werogpoeruh eropgheopuh epohpeothu eroihjepohi sdf",
      created_at: new Date(),
      user_id: 1,
      user: { id: 1, name: "Iván", surname: "Pérez" },
    },
    {
      id: 4,
      body: "asdf",
      created_at: new Date(),
      user_id: 2,
      user: { id: 2, name: "Iván", surname: "Pérez" },
    },
    {
      id: 5,
      body: "asdf",
      created_at: new Date(),
      user_id: 1,
      user: { id: 1, name: "asdf", surname: "asdf" },
    },
    {
      id: 6,
      body: "asdf",
      created_at: new Date(),
      user_id: 2,
      user: { id: 2, name: "asdf", surname: "asdf" },
    },
    {
      id: 7,
      body: "asdf",
      created_at: new Date(),
      user_id: 1,
      user: { id: 1, name: "asdf", surname: "asdf" },
    },
    {
      id: 8,
      body: "asdf",
      created_at: new Date(),
      user_id: 2,
      user: { id: 2, name: "asdf", surname: "asdf" },
    },
    {
      id: 9,
      body: "asdf",
      created_at: new Date(),
      user_id: 1,
      user: { id: 1, name: "asdf", surname: "asdf" },
    },
    {
      id: 10,
      body: "asdf",
      created_at: new Date(),
      user_id: 2,
      user: { id: 2, name: "asdf", surname: "asdf" },
    },
  ];
  const [message, setMessage] = useState("");
  const forum_id = window.location.pathname.split("/")[3];
  const userId = JSON.parse(sessionStorage.getItem("user"))?.id;
  useEffect(() => {
    if (
      sessionStorage.getItem("token") != null &&
      sessionStorage.getItem("user") != null
    ) {
      isLogged = true;
    }

    if (isLogged == false) {
      return navigate("/login");
    }
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

  const messagesList = messages.map((message) => {
    const date = new Date(message.created_at).toLocaleDateString();
    return (
      <div
        key={message.id}
        className={
          message.user_id == userId ? "msg-right m-1 p-2" : "msg-left m-1 p-2"
        }
      >
        {message.user_id != userId && (
          <div className="fw-bold">
            {message.user.name} {message.user.surname}
          </div>
        )}
        <div className="float-start msg-body-dark">{message.body}</div>
        <div className="msg-date mt-3">{date}</div>
      </div>
    );
  });

  async function saveMessage(e) {
    e.preventDefault();
    if (message != "") {
      /* const requestOptions = {
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
    await fetch(`${URL}/messages/`, requestOptions)
      .then((response) => response.json())
      .then((data) => setMessages(data)); */
      document.getElementById("msg").value = "";
      setMessage("");
    }
  }

  return (
    <div>
      <Nav
        isLogged={
          sessionStorage.getItem("token") != null &&
          sessionStorage.getItem("user") != null
        }
      ></Nav>
      <div className="container">
        <div className="py-3">
          <h1 className="mb-4 fw-bold">Mensajes del foro</h1>
          <div className="forum-background rounded p-3">
            <div>
              {messages.length == 0 && (
                <div className="empty">
                  <img src={nothing} width="200px" />
                  <br></br>
                  <label className="py-4">
                    Vaya... parece que todavía no hay ningún mensaje...
                  </label>
                </div>
              )}
            </div>
            {messagesList}
            <div style={{ clear: "both" }}></div>
          </div>
          <form>
            <div className="form-group d-flex pt-4">
              <input
                type="text"
                className="form-control me-2 rounded-pill input-darktheme"
                id="msg"
                placeholder="Mensaje"
                onChange={(e) => setMessage(e.target.value)}
              />
              {message == "" ? (
                <button
                  type="submit"
                  className="rounded-circle btn"
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