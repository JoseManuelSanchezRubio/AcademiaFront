import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavAdmin from "../NavAdmin";
import { URL } from "../url";

export default function Admin() {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const [users, setUsers] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showUsers, setShowUsers] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("token") && sessionStorage.getItem("admin"))
      setIsLogged(true);
    if (!isLogged) return navigate("/login");

    if (!isLogged) navigate("/admin");
    const fetchUsers = async () => {
      const response = await fetch(`${URL}/users`);
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();

    const fetchProfessors = async () => {
      const response = await fetch(`${URL}/professors`);
      const data = await response.json();
      setProfessors(data);
    };
    fetchProfessors();

    const fetchCourses = async () => {
      const response = await fetch(`${URL}/courses`);
      const data = await response.json();
      setCourses(data);
    };
    fetchCourses();
  }, []);

  async function deleteCourse(e) {
    if (confirm("Seguro que quieres eliminar este curso?")) {
      await fetch(`${URL}/courses/${e}`, {
        method: "DELETE",
      });
      window.location.reload();
    }
  }
  async function deleteUser(e) {
    if (confirm("Seguro que quieres eliminar a este usuario?")) {
      await fetch(`${URL}/users/${e}`, {
        method: "DELETE",
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
          <td>
            <button
              id={user.id}
              className="btn btn-danger btn-sm"
              onClick={(e) => deleteUser(e.target.id)}
            >
              Eliminar
            </button>
          </td>
        </tr>
      );
    }
  });
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
        <td>
          {/* <button className="btn btn-danger btn-sm">Eliminar</button> */}
        </td>
      </tr>
    );
  });

  const coursesList = courses.map((course) => {
    return (
      <div className="card" key={course.id} style={{ width: "250px" }}>
        <div className="card-body">
          <h5 className="card-title">{course.name}</h5>
          <p className="card-subtitle mb-2 text-secondary">
            {course.description}
          </p>
          <p className="card-text">
            Profesor: {course.professor.name} {course.professor.surname}
          </p>
          <div
            className="btn btn-danger"
            id={course.id}
            onClick={(e) => deleteCourse(e.target.id)}
          >
            Eliminar
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <NavAdmin isLogged={isLogged} />
      <section className="p-5">
        <h3 className="fw-bold">Cursos</h3>
        <div className="d-flex flex-wrap gap-3">{coursesList}</div>
      </section>
      <section className="px-5">
        <h3 className="fw-bold">Usuarios</h3>
        <span>Filtrar por: </span>
        <div className="d-flex gap-4">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              defaultChecked
              onChange={() => setShowUsers(true)}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Alumnos
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              onChange={() => setShowUsers(false)}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              Profesores
            </label>
          </div>
        </div>
        <div className="table-responsive">
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
              {showUsers ? (
                usersList.length == 0 ? (
                  <div className="text-secondary mt-3">
                    Todavía no hay usuarios
                  </div>
                ) : (
                  usersList
                )
              ) : professorsList.length == 0 ? (
                <div className="text-secondary mt-3">
                  Todavía no hay profesores
                </div>
              ) : (
                professorsList
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
