import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Announcements from "../Announcements";
import NavProfessor from "../NavProfessor";
import { URL } from "../url";

export default function CourseProfessor() {
  const navigate = useNavigate();
  let isLogged = false;
  const [course, setCourse] = useState([]);
  const [units, setUnits] = useState([]);
  const [unitName, setUnitName] = useState("");
  const [unitDescription, setUnitDescription] = useState("");
  const [unitTheory, setUnitTheory] = useState("");
  const [unitExercises, setUnitExercises] = useState("");
  const [theoryFile, setTheoryFile] = useState("");
  const [exercisesFile, setExercisesFile] = useState("");

  const [errorName, setErrorName] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  const [errorTheory, setErrorTheory] = useState("");
  const [errorExercises, setErrorExercises] = useState("");

  function handleName(e) {
    setUnitName(e);
    if (e == "") {
      setErrorName("Debes rellenar este campo");
    } else {
      setErrorName("");
    }
  }
  function handleDescription(e) {
    setUnitDescription(e);
    if (e == "") {
      setErrorDescription("Debes rellenar este campo");
    } else {
      setErrorDescription("");
    }
  }

  const courseId = JSON.parse(sessionStorage.getItem("courseId"));
  const professorId = JSON.parse(sessionStorage.getItem("professor"))?.id;
  const url = `/users/${courseId}`;
  useEffect(() => {
    if (
      sessionStorage.getItem("token") != null &&
      sessionStorage.getItem("professor") != null
    ) {
      isLogged = true;
    }

    if (isLogged == false) {
      return navigate("/login");
    }
    fetch(`${URL}/courses/${courseId}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data[0]);
        setUnits(data[0].units);
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
        if (event.target.id === "theory-modal") {
          setTheoryFile(file);
          setUnitTheory(fileName);
          setErrorTheory("");
        } else {
          setExercisesFile(file);
          setUnitExercises(fileName);
          setErrorExercises("");
        }
      };
      fileReader.readAsDataURL(fileToLoad);
    }
  }

  async function createUnit(e) {
    let error = false;
    e.preventDefault();
    if (unitName == "") {
      setErrorName("Debes rellenar este campo");
      error = true;
    }
    if (unitDescription == "") {
      setErrorDescription("Debes rellenar este campo");
      error = true;
    }
    if (unitTheory == "") {
      setErrorTheory("Debes rellenar este campo");
      error = true;
    } else {
      setErrorTheory("");
    }
    if (unitExercises == "") {
      setErrorExercises("Debes rellenar este campo");
      error = true;
    } else {
      setErrorExercises("");
    }
    if (
      !error &&
      errorName == "" &&
      errorDescription == "" &&
      errorTheory == "" &&
      errorExercises == ""
    ) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: unitName,
          description: unitDescription,
          theory: unitTheory,
          theory_file: theoryFile,
          exercises: unitExercises,
          exercises_file: exercisesFile,
          course_id: courseId,
        }),
      };
      await fetch(`${URL}/units`, requestOptions)
        .then((response) => response.json())
        .then((data) => setUnits(data));
      document.getElementById("close-modal-unit").click();
      setUnitName("");
      setUnitDescription("");
      setUnitTheory("");
      setUnitExercises("");
      document.getElementById("name-modal").value = "";
      document.getElementById("desc-modal").value = "";
      document.getElementById("theory-modal").value = "";
      document.getElementById("exercises-modal").value = "";
    }
  }

  return (
    <div>
      <NavProfessor isLogged={sessionStorage.getItem("token") != null &&
        sessionStorage.getItem("professor") != null}></NavProfessor>
      <div className="row mx-4 my-4">
        <div className="col-lg-9 mb-4">
          <div>
            <h1 className="fw-bold">
              {course.name}
              <span className="mx-3">{"➜"}</span>
              <Link to={url}>Alumnos</Link>
            </h1>
            {units.length == 0 && (
              <div className="py-4 text-secondary">
                El curso todavía no tiene ninguna unidad. ¡Añade una!
              </div>
            )}
            {units.map((unit) => (
              <div key={unit.id} className="card mb-4 me-4">
                <div className="card-body">
                  <h5 className="card-title fw-bold">{unit.name}</h5>
                  <div className="card-subtitle mb-2 text-body-secondary text-secondary">
                    {unit.description}
                  </div>
                  <div className="card-text">{unit.theory}</div>
                  <div className="card-text">{unit.exercises}</div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Añadir unidad
          </button>

          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="modal"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5 fw-bold" id="modal">
                    Añadir una nueva unidad
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="name-modal" className="form-label">
                        Nombre de la unidad
                      </label>
                      <input
                        type="text"
                        className={
                          errorName == ""
                            ? "form-control"
                            : "form-control border border-danger shadow-none"
                        }
                        id="name-modal"
                        onChange={(e) => handleName(e.target.value)}
                      />
                      <div className="text-danger fst-italic small">
                        {errorName}
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="desc-modal" className="form-label">
                        Descripción de la unidad
                      </label>
                      <textarea
                        id="desc-modal"
                        cols="30"
                        rows="3"
                        className={
                          errorDescription == ""
                            ? "form-control"
                            : "form-control border border-danger shadow-none"
                        }
                        onChange={(e) => handleDescription(e.target.value)}
                      ></textarea>
                      <div className="text-danger fst-italic small">
                        {errorDescription}
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="theory-modal" className="form-label">
                        Teoría
                      </label>
                      <input
                        type="file"
                        className={
                          errorTheory == ""
                            ? "form-control"
                            : "form-control border border-danger shadow-none"
                        }
                        id="theory-modal"
                        onChange={(e) => handleFile(e)}
                      />
                      <div className="text-danger fst-italic small">
                        {errorTheory}
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exercises-modal" className="form-label">
                        Ejercicios
                      </label>
                      <input
                        type="file"
                        className={
                          errorExercises == ""
                            ? "form-control"
                            : "form-control border border-danger shadow-none"
                        }
                        id="exercises-modal"
                        onChange={(e) => handleFile(e)}
                      />
                      <div className="text-danger fst-italic small">
                        {errorExercises}
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    id="close-modal-unit"
                  >
                    Cerrar
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={createUnit}
                  >
                    Guardar los cambios
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside className="col-lg-3">
          <Announcements
            courseId={courseId}
            professorId={professorId}
          ></Announcements>
        </aside>
      </div>
    </div>
  );
}