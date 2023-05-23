import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Announcements from "../Announcements";
import Nav from "../Nav";


export default function Course() {
  const [course, setCourse] = useState([]);
  const [units, setUnits] = useState([]);
  const courseId = JSON.parse(sessionStorage.getItem("courseId"));
  const url = `/users/${courseId}`;

  useEffect(() => {
    const courseId = JSON.parse(sessionStorage.getItem("courseId"));
    fetch(`http://127.0.0.1:8000/api/courses/${courseId}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data[0]);
        setUnits(data[0].units);
      });
  }, []);

  let isLogged = false;
  if (sessionStorage.getItem("token")) isLogged = true;

  if (!isLogged) return window.location.href = '/login';

  return (
    <div>
      <Nav isLogged={isLogged}></Nav>
      <div className="row mx-5 my-4">
        <div className="col-lg-9">
          <div>
            <h1>
              {course.name} &bull;{" "}
              <Link to={url} className="">
                Compañeros
              </Link>
            </h1>
            {units.length == 0 && (
              <div className="py-4 text-secondary">
                Vaya... parece que el profesor todavía no ha añadido ninguna
                unidad.
              </div>
            )}
            {units.map((unit) => (
              <div key={unit.id} className="card mb-4 me-4">
                <div className="card-body">
                  <h5 className="card-title">{unit.name}</h5>
                  <div className="card-subtitle mb-2 text-body-secondary text-secondary">
                    {unit.description}
                  </div>
                  <div className="card-text">{unit.theory}</div>
                  <div className="card-text">{unit.exercises}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <aside className="col-lg-3">
          <Announcements courseId={courseId}></Announcements>
        </aside>
      </div>
    </div>
  );
}