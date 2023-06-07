/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { URL } from "./url";

export default function Announcements(props) {
  const [announcements, setAnnouncements] = useState([]);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [errorTitle, setErrorTitle] = useState("");
  const [errorBody, setErrorBody] = useState("");

  function handleTitle(e) {
    setTitle(e);
    if (e == "") {
      setErrorTitle("Debes rellenar este campo");
    } else {
      setErrorTitle("");
    }
  }
  function handleBody(e) {
    setBody(e);
    if (e == "") {
      setErrorBody("Debes rellenar este campo");
    } else {
      setErrorBody("");
    }
  }

  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        course_id: props.courseId,
      }),
    };
    fetch(`${URL}/announcements/course`, requestOptions)
      .then((res) => res.json())
      .then((data) => setAnnouncements(data));
  }, []);

  async function addAnnouncement(e) {
    let error = false;
    e.preventDefault();
    if (title == "") {
      setErrorTitle("Debes rellenar este campo");
      error = true;
    }
    if (body == "") {
      setErrorBody("Debes rellenar este campo");
      error = true;
    }
    if (!error && errorTitle == "" && errorBody == "") {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          body: body,
          professor_id: props.professorId,
          course_id: props.courseId,
        }),
      };
      await fetch(`${URL}/announcements`, requestOptions).then((res) => res.json()).then((response) => {
        setAnnouncements((announcements) => {
          return [
            response, ...announcements,
          ];
        });
      });
      document.getElementById("close-modal-announcement").click();
      setTitle("");
      setBody("");
      document.getElementById("title-modal").value = "";
      document.getElementById("body-modal").value = "";
    }
  }
  announcements.sort((a, b) => a.id - b.id);
  const announcementsList = announcements.map((announcement) => {
    const date = new Date(announcement.created_at).toLocaleDateString();
    return (
      <div key={announcement.id}>
        <div className="card mb-4">
          <h5 className="card-header fw-bold">{announcement.title}</h5>
          <div className="card-body">
            <div className="card-text">{announcement.body}</div>
            <div className="text-secondary date-announcement">{date}</div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <h1 className="text-lg-end fw-bold">Anuncios</h1>
      {announcements.length == 0 && (
        <div className="text-secondary mb-2 text-lg-end">
          Todavía no hay ningún anuncio
        </div>
      )}
      <div>{announcementsList}</div>
      <div>
        {props.professorId && (
          <div className="text-lg-end">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#addAnnouncement"
            >
              Nuevo anuncio
            </button>

            <div
              className="modal fade"
              id="addAnnouncement"
              tabIndex="-1"
              aria-labelledby="modal"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content modal-darktheme">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5 fw-bold" id="modal">
                      Nuevo anuncio
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="mb-3">
                        <label htmlFor="title-modal" className="form-label">
                          Título
                        </label>
                        <input
                          type="text"
                          className={
                            errorTitle == ""
                              ? "form-control input-darktheme"
                              : "form-control border border-danger shadow-none input-darktheme"
                          }
                          id="title-modal"
                          onChange={(e) => handleTitle(e.target.value)}
                        />
                        <div className="text-danger fst-italic small">
                          {errorTitle}
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="body-modal" className="form-label">
                          Descripción
                        </label>
                        <textarea
                          id="body-modal"
                          cols="30"
                          rows="3"
                          className={
                            errorBody == ""
                              ? "form-control input-darktheme"
                              : "form-control border border-danger shadow-none input-darktheme"
                          }
                          onChange={(e) => handleBody(e.target.value)}
                        ></textarea>
                        <div className="text-danger fst-italic small">
                          {errorBody}
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      id="close-modal-announcement"
                    >
                      Cerrar
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={(e) => addAnnouncement(e)}
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}