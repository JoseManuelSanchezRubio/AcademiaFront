/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";


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
      fetch("http://127.0.0.1:8000/api/announcements/course", requestOptions)
        .then((res) => res.json())
        .then((data) => setAnnouncements(data));
    }, []);

    async function addAnnouncement(e) {
      e.preventDefault();
      let error = false;
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
        await fetch("http://127.0.0.1:8000/api/announcements", requestOptions);
        window.location.reload();
      }
    }

    const announcementsList = announcements.map((announcement) => {
      return (
        <div key={announcement.id}>
          <div className="card ms-4 mb-4">
            <h5 className="card-header">{announcement.title}</h5>
            <div className="card-body">
              <p className="card-text">{announcement.body}</p>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>
        <h1 className="text-lg-end">Anuncios</h1>
        {announcements.length == 0 && (
          <div className="text-secondary">Todavía no hay ningún anuncio</div>
        )}
        <div>{announcementsList}</div>
        <div>
          {props.professorId && (
            <div>
              <button
                type="button"
                className="btn btn-primary ms-4"
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
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="modal">
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
                                ? "form-control"
                                : "form-control border border-danger shadow-none"
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
                                ? "form-control"
                                : "form-control border border-danger shadow-none"
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