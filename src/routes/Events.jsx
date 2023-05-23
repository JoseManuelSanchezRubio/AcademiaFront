import { useEffect, useState } from "react";
import Nav from "../Nav";
/* import UpdateEvent from "../UpdateEvent"; */


export default function Events() {
  const [events, setEvents] = useState([]);
  const user_id = JSON.parse(sessionStorage.getItem("user")).id;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");

  const [errorTitle, setErrorTitle] = useState("");
  const [errorStart_date, setErrorStart_date] = useState("");
  const [errorEnd_date, setErrorEnd_date] = useState("");

  function handleTitle(e) {
    setTitle(e);
    if (e == "") {
      setErrorTitle("Debes rellenar este campo");
    } else {
      setErrorTitle("");
    }
  }
  function handleStart_date(e) {
    setStart_date(e);
    const dateIni = new Date(e);
    if (e == "") {
      setErrorStart_date("Debes rellenar este campo");
    } else {
      setErrorStart_date("");
    }
    if (end_date != null && dateIni > new Date(end_date)) {
      setErrorStart_date("La fecha inicial no puede ser posterior a la final");
    }
  }
  function handleEnd_date(e) {
    setEnd_date(e);
    const dateEnd = new Date(e);
    if (e == "") {
      setErrorEnd_date("Debes rellenar este campo");
    } else {
      setErrorEnd_date("");
    }
    if (start_date != null && dateEnd < new Date(start_date)) {
      setErrorEnd_date("La fecha final no puede ser anterior a la inicial");
    }
  }

  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
      }),
    };
    fetch("http://127.0.0.1:8000/api/events/user", requestOptions)
      .then((response) => response.json())
      .then((data) => setEvents(data));
  }, []);

  const eventsList = events.map((event) => {
    const start_date = new Date(event.start_date).toLocaleDateString();
    const end_date = new Date(event.end_date).toLocaleDateString();

    return (
      <div className="accordion" id={`idd${event.id}`} key={event.id}>
        <div className="accordion-item mb-3">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#id${event.id}`} aria-expanded="false" aria-controls={`id${event.id}`}>
              <h5>{event.title}</h5>
            </button>
          </h2>
          <div id={`id${event.id}`} className="accordion-collapse collapse" data-bs-parent={`#idd${event.id}`}>
            <div className="accordion-body">
              <p className="card-text text-secondary">{event.description ? event.description : 'Este evento no tiene descripción'}</p>
              <div className="card-text">Desde {start_date}</div>
              <div className="card-text mb-3">Hasta {end_date}</div>
              {/* <UpdateEvent event={event} /> */}
              <div className="btn btn-danger" id={event.id} onClick={(e) => deleteEvent(e.target.id)}>Eliminar</div>
            </div>
          </div>
        </div>
      </div>
    )
  });

  async function deleteEvent(event_id) {
    if (confirm("Seguro que quieres eliminar este evento?")) {
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      await fetch(
        `http://127.0.0.1:8000/api/events/${event_id}`,
        requestOptions
      );
      window.location.reload();
    }
  }

  async function saveEvent(e) {
    e.preventDefault();
    let error = false;
    if (title == "") {
      setErrorTitle("Debes rellenar este campo");
      error = true;
    }
    if (start_date == "") {
      setErrorStart_date("Debes rellenar este campo");
      error = true;
    }
    if (end_date == "") {
      setErrorEnd_date("Debes rellenar este campo");
      error = true;
    }
    if (
      !error &&
      errorTitle == "" &&
      errorStart_date == "" &&
      errorEnd_date == ""
    ) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
          start_date: start_date,
          end_date: end_date,
          user_id: user_id,
        }),
      };
      await fetch("http://127.0.0.1:8000/api/events/", requestOptions);

      window.location.reload();
    }
  }

  let isLogged = false;
  if (sessionStorage.getItem("token")) isLogged = true;

  if (!isLogged) return (window.location.href = "/login");
  return (
    <div>
      <Nav isLogged={isLogged}></Nav>
      <div className="row mx-5 my-4">
        <div className="col-lg-8">
          <h1>Añadir evento</h1>
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Título
              </label>
              <input
                type="text"
                className={
                  errorTitle == ""
                    ? "form-control"
                    : "form-control border border-danger shadow-none"
                }
                id="title"
                onChange={(e) => handleTitle(e.target.value)}
              />
              <div className="text-danger fst-italic small">{errorTitle}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Descripción
              </label>
              <textarea
                className="form-control"
                id="description"
                cols="30"
                rows="3"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="start_date" className="form-label">
                  Fecha de inicio
                </label>
                <input
                  type="date"
                  className={
                    errorStart_date == ""
                      ? "form-control"
                      : "form-control border border-danger shadow-none"
                  }
                  id="start_date"
                  onChange={(e) => handleStart_date(e.target.value)}
                />
                <div className="text-danger fst-italic small">
                  {errorStart_date}
                </div>
              </div>
              <div className="col mb-3">
                <label htmlFor="end_date" className="form-label">
                  Fecha de fin
                </label>
                <input
                  type="date"
                  className={
                    errorEnd_date == ""
                      ? "form-control"
                      : "form-control border border-danger shadow-none"
                  }
                  id="end_date"
                  onChange={(e) => handleEnd_date(e.target.value)}
                />
                <div className="text-danger fst-italic small">
                  {errorEnd_date}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary mb-3"
              onClick={(e) => saveEvent(e)}
            >
              Añadir
            </button>
          </form>
        </div>
        <aside className="col-lg-4">
          <h1 className="text-lg-end mb-4">Tus eventos</h1>
          <div className="text-secondary text-end">{eventsList.length == 0 && <div>Vaya... parece que todavía no tienes eventos. ¡Añade uno!</div>}</div>
          <div className="pt-3">{eventsList}</div>
        </aside>
      </div>
    </div>
  );
}