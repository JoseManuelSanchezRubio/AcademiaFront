import { useEffect, useState } from "react";
import NavAdmin from "../NavAdmin";


export default function NewCourse() {


    const [professors, setProfessors] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [professorId, setProfessorId] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/professors")
            .then(res => res.json())
            .then(data => setProfessors(data));
    }, []);

    function checkNewCourse(data) {
        if (data.status) {
            alert("Curso añadido correctamente");
            window.location.href = "/admin";
        } else {
            alert(data.message);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();


        if (name == "") return alert("Le has de poner un nombre al curso");
        if (professorId == "") return alert("Has de seleccionar un profesor");

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                description: description,
                professor_id: professorId
            })
        };
        fetch('http://127.0.0.1:8000/api/courses', requestOptions)
            .then(response => response.json())
            .then(data => checkNewCourse(data)
            );
    }

    let isLogged = false;
    if (sessionStorage.getItem('token') && sessionStorage.getItem('admin')) isLogged = true;

    if (!isLogged) return window.location.href = '/login';

    return (
        <div>
            <NavAdmin isLogged={isLogged} />
            <div className="container">
                <h1 className="mb-4 pt-5">Nuevo curso</h1>
                <form>
                    <div className="row">
                        <div className="form-outline mb-4 col">
                            <label className="form-label" htmlFor="name">Nombre</label>
                            <input type="text" id="name" className="form-control" onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="form-outline mb-4 col">
                            <label className="form-label" htmlFor="professor">Profesor</label>
                            <select className="form-select" onChange={(e) => setProfessorId(e.target.value)}>
                                <option value='' >Selecciona un profesor</option>
                                {professors && professors.map((professor) => {
                                    return (
                                        <option key={professor.id} value={professor.id}>{professor.name} {professor.surname}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="email">Descripción</label>
                        <textarea className="form-control" id="description" rows="3" onChange={(e) => setDescription(e.target.value)} ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mb-4" onClick={handleSubmit}>Añadir</button>
                </form>
            </div>
        </div>
    )
}