import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../Nav";
import Profile from "../Profile";
import { URL } from "../url";
//import assets
import nothing from "../assets/nothing.png";

export default function User() {
  const navigate = useNavigate();
  let isLogged = false;
  const [courses, setCourses] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    if (
      sessionStorage.getItem("token") != null &&
      sessionStorage.getItem("user") != null
    ) {
      isLogged = true;
    }
    if (isLogged == false) {
      return navigate("/login");
    }
    const userId = JSON.parse(sessionStorage.getItem("user"))?.id;
    fetch(`${URL}/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        /* setUser(data.user); */
        setCourses(data.courses);
      });
  }, []);

  let coursesList = courses.map((item) => {
    let random = Math.floor(Math.random() * 9);
    let color = "";
    if (random === 1) {
      color = "#FFCCCC"; //rojo
    } else if (random === 2) {
      color = "#FFE5CC"; //naranja
    } else if (random === 3) {
      color = "#A5FCE5"; //cian
    } else if (random === 4) {
      color = "#CCFFFF"; //azul
    } else if (random === 5) {
      color = "#CCCCFF"; //morado
    } else if (random === 6) {
      color = "#FFD1F9"; //rosa
    } else if (random === 7) {
      color = "#FF8C8C"; //rojo
    } else if (random === 8) {
      color = "#99CCFF"; //azul oscuro
    } else {
      color = "#CCFFCC"; //verde
    }
    return (
      <div
        key={item.id}
        className="card course"
        style={{ width: "270px", minHeight: "200px", backgroundColor: color }}
      >
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title fw-bold">{item.name}</h5>
            <p className="card-text">{item.description}</p>
          </div>
          <Link
            className="mt-3 text-end"
            to={`/course`}
            id={item.id}
            onClick={(e) => handleCourse(e)}
          >
            <button id={item.id} className="btn btn-primary custom-shadow">Entrar</button>
          </Link>
        </div>
      </div>
    );
  });

  function handleCourse(e) {
    sessionStorage.setItem("courseId", JSON.stringify(e.target.id));
  }

  return (
    <div>
      <Nav isLogged={sessionStorage.getItem("token") != null &&
        sessionStorage.getItem("user") != null}></Nav>
      <div className="d-flex">
        <div className="container">
          <h1 className="mt-5 fw-bold">Bienvenido, estos son tus cursos:</h1>
          <div className="text-secondary">
            {coursesList.length == 0 && (
              <div className="empty">
                <img src={nothing} width="200px" />
                <br></br>
                <div className="pt-4">
                  Vaya... Parece que todavía no estás matriculado en ningún
                  curso.
                </div>
                <Link to={"/courses"}>
                  ¡Échale un vistazo a los que tenemos!
                </Link>
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
