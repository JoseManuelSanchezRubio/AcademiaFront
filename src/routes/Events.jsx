import { useEffect, useState } from "react";
import Nav from "../Nav";


export default function Events() {


    const [events, setEvents] = useState([]);
    const user_id = JSON.parse(sessionStorage.getItem("user")).id;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [start_date, setStart_date] = useState("");
    const [end_date, setEnd_date] = useState("");

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: user_id
            })
        };
        fetch('http://127.0.0.1:8000/api/events/user', requestOptions)
            .then(response => response.json())
            .then(data => setEvents(data)
            );

    }, []);

    async function deleteEvent(event_id) {
        if (confirm('Seguro que quieres eliminar este evento?')) {
            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            await fetch(`http://127.0.0.1:8000/api/events/${event_id}`, requestOptions)
            window.location.reload();
        }
    }

    async function updateEvent(e) {
        e.preventDefault();
        //next.js
    }

    async function saveEvent(e) {
        e.preventDefault();
        if (title == '' || start_date == '' || end_date == '') return alert("Faltan campos por rellenar");
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                description: description,
                start_date: start_date,
                end_date: end_date,
                user_id: user_id
            })
        };
        await fetch('http://127.0.0.1:8000/api/events/', requestOptions)

        window.location.reload();
    }

    let isLogged = false;
    if (sessionStorage.getItem('token')) isLogged = true;

    if (!isLogged) return window.location.href = '/login';
    return (
        <div>
            <Nav isLogged={isLogged}></Nav>
            <div className="row">
                <div className="col">
                    <h1>Añadir evento</h1>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Título</label>
                            <input type="text" className="form-control" id="title" onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Descripción</label>
                            <textarea className="form-control" id="description" cols="30" rows="3" onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="start_date" className="form-label">Fecha de inicio</label>
                                <input type="date" className="form-control" id="start_date" onChange={(e) => setStart_date(e.target.value)} />
                            </div>
                            <div className="col mb-3">
                                <label htmlFor="end_date" className="form-label">Fecha de fin</label>
                                <input type="date" className="form-control" id="end_date" onChange={(e) => setEnd_date(e.target.value)} />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary" onClick={(e) => saveEvent(e)}>Añadir</button>
                    </form>
                </div>
                <aside className="col-4">
                    <h1>Tus eventos (acordeón)</h1>
                    {events.map(event => (

                        <div className="card mb-3" key={event.id}>
                            <div className="card-body">
                                <h5 className="card-title">{event.title}</h5>
                                <p className="card-text text-secondary">{event.description ? event.description : 'Este evento no tiene descripción'}</p>
                                <div className="card-text">Desde {event.start_date}</div>
                                <div className="card-text mb-3">Hasta {event.end_date}</div>
                                <button type="button" className="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Editar
                                </button>

                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="modal" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="modal">Editar evento</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <form onSubmit={updateEvent}>
                                                    <div className="mb-3">
                                                        <label htmlFor="title-modal" className="form-label">Título</label>
                                                        <input type="text" className="form-control" id="title-modal" defaultValue={event.title} />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="description-modal" className="form-label">Descripción</label>
                                                        <textarea cols="30" rows="3" className="form-control" id="description-modal" defaultValue={event.description}></textarea>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="startDate-modal" className="form-label">Fecha de inicio</label>
                                                        <input type="date" className="form-control" id="startDate-modal" defaultValue={event.start_date} />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="endDate-modal" className="form-label">Fecha de fin</label>
                                                        <input type="date" className="form-control" id="endDate-modal" defaultValue={event.end_date} />
                                                    </div>

                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                                <button type="submit" className="btn btn-primary">Guardar los cambios</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="btn btn-danger" id={event.id} onClick={(e) => deleteEvent(e.target.id)}>Eliminar</div>
                            </div>
                        </div>

                    ))}
                </aside>
            </div>

        </div>
    )
}