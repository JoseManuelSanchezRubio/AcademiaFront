import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../Nav";
import Profile from "../Profile";
import { URL } from "../url";
//import assets
import nothing from "../assets/nothing.png";

export default function User() {
  /* const [user, setUser] = useState(); */
  const [courses, setCourses] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    const userId = JSON.parse(sessionStorage.getItem("user")).id;
    fetch(`${URL}/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        /* setUser(data.user); */
        setCourses(data.courses);
      });
  }, []);

  let coursesList = courses.map((item) => {
    let random = Math.floor(Math.random() * 10);
    let color = "";
    if (random === 1) {
      color = "#F0A990";
    } else if (random === 2) {
      color = "#FBF18A";
    } else if (random === 3) {
      color = "#C6FB8A";
    } else if (random === 4) {
      color = "#A5FCE5";
    } else if (random === 5) {
      color = "#A5E2FC";
    } else if (random === 6) {
      color = "#CDBFFE";
    } else if (random === 7) {
      color = "#FFD1F9";
    } else if (random === 8) {
      color = "#FF8C8C";
    } else if (random === 9) {
      color = "#8CA8FF";
    } else {
      color = "#9EFE9E";
    }
    return (
      <div
        key={item.id}
        className={"card"}
        style={{ width: "250px", backgroundColor: color }}
      >
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">{item.description}</p>
          <Link to={`/course`} id={item.id} onClick={(e) => handleCourse(e)}>
            Entrar
          </Link>
        </div>
      </div>
    );
  });

  function handleCourse(e) {
    sessionStorage.setItem("courseId", JSON.stringify(e.target.id));
  }

  let isLogged = false;
  if (sessionStorage.getItem("token")) {
    isLogged = true;
  }

  if (!isLogged) return window.location.href = '/login';

  return (
    <div>
      <Nav isLogged={isLogged}></Nav>
      <div className="d-flex">
        <div className="container">
          <h1 className="mt-5 fw-bold">Bienvenido, estos son tus cursos:</h1>
          <div className="text-secondary">
            {coursesList.length == 0 && (
                <div className="empty">
            <img src={nothing} width="200px" />
            <br></br>
            <div className="pt-4">
              Vaya... Parece que todavía no estás matriculado en ningún curso.
            </div>
            <Link to={'/courses'}>¡Échale un vistazo a los que tenemos!</Link>
          </div>
            )}
          </div>
          <div className="d-flex flex-wrap gap-5 mt-5">{coursesList}</div>
        </div>
        <Profile user={user} />
      </div>
    </div>
  );
}