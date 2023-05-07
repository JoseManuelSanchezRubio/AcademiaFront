import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../Nav";


export default function CourseProfessor() {

    const [course, setCourse] = useState([]);
    const [units, setUnits] = useState([]);
    const [unitName, setUnitName] = useState('');
    const [unitTheory, setUnitTheory] = useState('');
    const [unitExercises, setUnitExercises] = useState('');
    //const [user_data, setUser_data] = useState('');

    const courseId = JSON.parse(sessionStorage.getItem("courseId"));
    const url = `/users/${courseId}`;
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/courses/${courseId}`)
            .then(res => res.json())
            .then((data) => {
                setCourse(data[0]);
                setUnits(data[0].units)
            });

    }, []);

    async function createUnit() {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: unitName,
                theory: unitTheory,
                exercises: unitExercises,
                course_id: courseId
            })
        };
        await fetch('http://127.0.0.1:8000/api/units', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data)
            );
        window.location.reload();
    }

    let isLogged = false;
    if (sessionStorage.getItem('token')) {
        isLogged = true;
    }

    if (!isLogged) return window.location.href = '/login';
    return (
        <div>
            <Nav isLogged={isLogged}></Nav>
            <div>
                <h1>{course.name}</h1>
                <Link to={url}>Alumnos</Link>
                {units.map(unit => (
                    <li key={unit.id}>
                        {unit.name}
                        <ul>
                            <li>{unit.theory}</li>
                            <li>{unit.exercises}</li>
                            <li>{unit.user_data ? unit.user_data : 'El alumno no ha subido nada'}</li>
                        </ul>
                    </li>))}
            </div>

            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Añadir unidad
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="modal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modal">Añadir una nueva unidad</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name-modal" className="form-label">Nombre de la unidad</label>
                                    <input type="text" className="form-control" id="name-modal" onChange={(e) => setUnitName(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="theory-modal" className="form-label">Teoría</label>
                                    <input type="text" className="form-control" id="theory-modal" onChange={(e) => setUnitTheory(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exercises-modal" className="form-label">Ejercicios</label>
                                    <input type="text" className="form-control" id="exercises-modal" onChange={(e) => setUnitExercises(e.target.value)} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-primary" onClick={createUnit}>Guardar los cambios</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}