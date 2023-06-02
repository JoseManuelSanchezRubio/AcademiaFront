import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import NavProfessor from "../NavProfessor";
import Profile from "../Profile";
import { URL } from "../url";
//import assets
import nothing from "../assets/nothing.png";

export default function Professor() {
  const navigate = useNavigate();
  let isLogged = false;
  const [courses, setCourses] = useState([]);
  const professor = JSON.parse(sessionStorage.getItem("professor"));

  useEffect(() => {
    if (
      sessionStorage.getItem("token") != null &&
      sessionStorage.getItem("professor") != null
    ) {
      isLogged = true;
    }
    if (!isLogged) {
      return navigate("/login");
    }
    const professorId = JSON.parse(sessionStorage.getItem("professor"))?.id;
    fetch(`${URL}/professors/${professorId}`)
      .then((response) => response.json())
      .then((data) => {
        /* setProfessor(data.professor); */
        setCourses(data.courses);
      });
  }, []);

  let coursesList = courses.map((item) => {
    let random = Math.floor(Math.random() * 9);
    let color = "";
    if (random === 1) {
      color = "#F0A990"; //rojo
    } else if (random === 2) {
      color = "#fbd28a"; //amarillo
    } else if (random === 3) {
      color = "#A5FCE5"; //cian
    } else if (random === 4) {
      color = "#A5E2FC"; //azul
    } else if (random === 5) {
      color = "#CDBFFE"; //morado
    } else if (random === 6) {
      color = "#FFD1F9"; //rosa
    } else if (random === 7) {
      color = "#FF8C8C"; //rojo
    } else if (random === 8) {
      color = "#8CA8FF"; //azul oscuro
    } else {
      color = "#9EFE9E"; //verde
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
            to={`/professor/course`}
            id={item.id}
            onClick={(e) => handleCourse(e)}
          >
            <button className="btn btn-primary custom-shadow">Entrar</button>
          </Link>
        </div>
      </div>
    );
  });
  function handleCourse(e) {
    console.log(e.target.id);
    sessionStorage.setItem("courseId", JSON.stringify(e.target.id));
  }

  return (
    <div>
      <NavProfessor isLogged={isLogged} />
      <div>
        <div className="container">
          <h1 className="my-5 fw-bold">Bienvenido, estos son tus cursos:</h1>
          <div className="text-secondary">
            {coursesList.length == 0 && (
              <div className="empty">
                <img src={nothing} width="200px" />
                <br></br>
                <div className="pt-4">Todavía no dispones de ningún curso.</div>
              </div>
            )}
          </div>
          <div className="d-flex flex-wrap gap-5">{coursesList}</div>
        </div>
        <Profile user={professor} />
      </div>
    </div>
  );
}
