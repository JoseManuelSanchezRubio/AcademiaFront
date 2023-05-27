import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Announcements from "../Announcements";
import NavProfessor from "../NavProfessor";


export default function CourseProfessor() {

    const [course, setCourse] = useState([]);
    const [units, setUnits] = useState([]);
    const [unitName, setUnitName] = useState('');
    const [unitDescription, setUnitDescription] = useState('');
    const [unitTheory, setUnitTheory] = useState('');
    const [unitExercises, setUnitExercises] = useState('');
    const [theoryFile, setTheoryFile] = useState('');
    const [exercisesFile, setExercisesFile] = useState('');

    const courseId = JSON.parse(sessionStorage.getItem("courseId"));
    const professorId = JSON.parse(sessionStorage.getItem("professor")).id;
    const url = `/users/${courseId}`;
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/courses/${courseId}`)
            .then(res => res.json())
            .then((data) => {
                setCourse(data[0]);
                setUnits(data[0].units)
            });

    }, []);

    function handleFile(event) {
        let selectedFile = event.target.files;
        let file = null;
        let fileName = "";
        if (selectedFile.length > 0) {
            let fileToLoad = selectedFile[0];
            fileName = fileToLoad.name;
            let fileReader = new FileReader();
            fileReader.onload = function (fileLoadedEvent) {
                file = fileLoadedEvent.target.result;
                //console.log(file);
                if (event.target.id === 'theory-modal') {
                    setTheoryFile(file);
                    setUnitTheory(fileName);
                } else {
                    setExercisesFile(file);
                    setUnitExercises(fileName);
                }
            };
            fileReader.readAsDataURL(fileToLoad);
        }
    }

    async function createUnit() {
        console.log(unitName, unitTheory, unitExercises, courseId);
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: unitName,
                description: unitDescription,
                theory: unitTheory,
                theory_file: theoryFile,
                exercises: unitExercises,
                exercises_file: exercisesFile,
                course_id: courseId
            })
        };
        console.log(requestOptions.body)
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
            <NavProfessor isLogged={isLogged}></NavProfessor>
            <div className="row mx-4 my-4">
                <div className="col-lg-9 mb-4">
                    <div>
                        <h1>{course.name} &bull; <Link to={url} className="">Alumnos</Link></h1>
                        {units.length == 0 && (<div className="py-4 text-secondary">El curso todavía no tiene ninguna unidad. ¡Añade una!</div>)}
                        {units.map(unit => (
                            <div key={unit.id} className="card mb-4 me-4">
                                <div className="card-body">
                                    <h5 className="card-title">{unit.name}</h5>
                                    <div className="card-subtitle mb-2 text-body-secondary text-secondary">{unit.description}</div>
                                    <div className="card-text">{unit.theory}</div>
                                    <div className="card-text">{unit.exercises}</div>
                                </div>
                            </div>))}
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
                                            <label htmlFor="desc-modal" className="form-label">Descripción de la unidad</label>
                                            <textarea id="desc-modal" cols="30" rows="3" className="form-control" onChange={(e) => setUnitDescription(e.target.value)}></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="theory-modal" className="form-label">Teoría</label>
                                            <input type="file" className="form-control" id="theory-modal" onChange={(e) => handleFile(e)} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exercises-modal" className="form-label">Ejercicios</label>
                                            <input type="file" className="form-control" id="exercises-modal" onChange={(e) => handleFile(e)} />
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
                <aside className="col-lg-3">
                    <Announcements courseId={courseId} professorId={professorId}></Announcements>
                </aside>
            </div>
        </div>
    )
}