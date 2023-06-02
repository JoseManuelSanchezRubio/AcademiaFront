import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Announcements from "../Announcements";
import Nav from "../Nav";
import { URL } from "../url";
import { URL_STORAGE } from "../url";

export default function Course() {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const [course, setCourse] = useState([]);
  const [units, setUnits] = useState([]);
  const [file, setFile] = useState();
  const [file_name, setFile_name] = useState("");
  const [unit_id, setUnit_id] = useState("");
  const courseId = JSON.parse(sessionStorage.getItem("courseId"));
  const user = JSON.parse(sessionStorage.getItem("user"));
  const url = `/users/${courseId}`;

  useEffect(() => {
    if (sessionStorage.getItem("token") && sessionStorage.getItem("user"))
      setIsLogged(true);
    if (!isLogged) return navigate("/login");
    const courseId = JSON.parse(sessionStorage.getItem("courseId"));
    fetch(`${URL}/courses/${courseId}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data[0]);
        setUnits(data[0].units);
        console.log(data);
      });
  }, []);
  function uploadFile() {
    if (file) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          unit_id: unit_id,
          file_name: file_name,
          file: file,
        }),
      };
      console.log(requestOptions.body);
      fetch(`${URL}/postUpload`, requestOptions);
      alert("Archivo subido a la base de datos correctamente");
    } else {
      alert("Primero debes seleccionar un archivo");
    }
  }
  function handleFile(event) {
    setUnit_id(event.target.id);
    let selectedFile = event.target.files;
    if (selectedFile.length > 0) {
      let fileToLoad = selectedFile[0];
      setFile_name(fileToLoad.name);
      let fileReader = new FileReader();
      fileReader.onload = function (fileLoadedEvent) {
        setFile(fileLoadedEvent.target.result);
      };
      fileReader.readAsDataURL(fileToLoad);
    }
  }
  return (
    <div>
      <Nav isLogged={isLogged}></Nav>
      <div className="row mx-5 my-4">
        <div className="col-lg-9">
          <div>
            <h1 className="fw-bold">
              {course.name}
              <span className="mx-3">{"➜"}</span>
              <Link to={url}>Compañeros</Link>
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
                  <div className="d-flex">
                    <h2 className="card-title text-decoration-underline fw-bold">
                      {unit.name}
                    </h2>
                    <h2 className="px-3 fw-bold">
                      &bull;
                      <Link className="px-3" to={`forum/${unit.forum_id}`}>
                        Foro
                      </Link>
                    </h2>
                  </div>
                  <div className="card-subtitle mb-2 text-body-secondary text-secondary">
                    {unit.description}
                  </div>
                  <div className="fs-4">Teoría de la unidad:</div>
                  <div className="ps-4">
                    <Link to={`${URL_STORAGE}/${unit.theory}`}>
                      {unit.theory}
                    </Link>
                  </div>
                  <div className="fs-4 mt-2">Ejercicios de la unidad:</div>
                  <div className="ps-4">
                    <Link to={`${URL_STORAGE}/${unit.exercises}`}>
                      {unit.exercises}
                    </Link>
                  </div>
                  <div className="fs-4 mt-2">
                    Aquí puedes subir tus archivos para esta unidad:
                  </div>
                  <div className="d-flex gap-3 my-2 mx-3">
                    <input
                      className="form-control"
                      id={unit.id}
                      type="file"
                      onChange={(e) => handleFile(e)}
                    />
                    <button className="btn btn-primary" onClick={uploadFile}>
                      Subir
                    </button>
                  </div>
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