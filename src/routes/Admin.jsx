import { useEffect, useState } from "react";
import NavAdmin from "../NavAdmin";

export default function Admin() {

    const [users, setUsers] = useState([]);
    const [professors, setProfessors] = useState([]);
    const [courses, setCourses] = useState([]);
    const [showUsers, setShowUsers] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch("http://127.0.0.1:8000/api/users");
            const data = await response.json();
            setUsers(data);
        };
        fetchUsers();

        const fetchProfessors = async () => {
            const response = await fetch("http://127.0.0.1:8000/api/professors");
            const data = await response.json();
            setProfessors(data);
        };
        fetchProfessors();

        const fetchCourses = async () => {
            const response = await fetch("http://127.0.0.1:8000/api/courses");
            const data = await response.json();
            setCourses(data);
        };
        fetchCourses();
    }, []);

    async function deleteCourse(e) {
        if (confirm('Seguro que quieres eliminar este curso?')) {
            await fetch(`http://127.0.0.1:8000/api/courses/${e}`, {
                method: 'DELETE'
            });
            window.location.reload();
        }
    }
    async function deleteUser(e) {
        if (confirm('Seguro que quieres eliminar a este usuario?')) {
            await fetch(`http://127.0.0.1:8000/api/users/${e}`, {
                method: 'DELETE'
            });
            window.location.reload();
        }
    }

    const usersList = users.map((user) => {
        if (user.email !== "admin@learningenjoying.com") {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.surname}</td>
                    <td>{user.dni}</td>
                    <td>{user.address}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td><button id={user.id} className="btn btn-danger btn-sm" onClick={(e) => deleteUser(e.target.id)}>Eliminar</button></td>
                </tr>
            )
        }
    })
    const professorsList = professors.map((professor) => {
        return (
            <tr key={professor.id}>
                <td>{professor.id}</td>
                <td>{professor.name}</td>
                <td>{professor.surname}</td>
                <td>{professor.dni}</td>
                <td>{professor.address}</td>
                <td>{professor.phone}</td>
                <td>{professor.email}</td>
                <td>{/* <button className="btn btn-danger btn-sm">Eliminar</button> */}</td>
            </tr>
        )
    })

    const coursesList = courses.map((course) => {
        return (
            <div className="card" key={course.id} style={{ width: '250px' }}>
                <div className="card-body">
                    <h5 className="card-title">{course.name}</h5>
                    <p className="card-subtitle mb-2 text-secondary">{course.description}</p>
                    <p className="card-text">Profesor: {course.professor.name} {course.professor.surname}</p>
                    <div className="btn btn-danger" id={course.id} onClick={(e) => deleteCourse(e.target.id)}>Eliminar</div>
                </div>
            </div>
        )
    })




    let isLogged = false;
    if (sessionStorage.getItem('token') && sessionStorage.getItem('admin')) isLogged = true;

    if (!isLogged) return window.location.href = '/login';

    return (
        <div>
            <NavAdmin isLogged={isLogged} />
            <section className="p-5">
                <h3>Cursos</h3>
                <div className="d-flex flex-wrap gap-3">{coursesList}</div>
            </section>
            <section className="px-5">
                <h3>Usuarios</h3>
                <span>Filtrar por: </span>
                <div className="d-flex gap-4">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked onChange={() => setShowUsers(true)} />
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Alumnos
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={() => setShowUsers(false)} />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            Profesores
                        </label>
                    </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellidos</th>
                            <th scope="col">DNI</th>
                            <th scope="col">Dirección</th>
                            <th scope="col">Teléfono</th>
                            <th scope="col">Correo electrónico</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {showUsers ? usersList : professorsList}
                    </tbody>
                </table>
            </section>
        </div>
    )
}
