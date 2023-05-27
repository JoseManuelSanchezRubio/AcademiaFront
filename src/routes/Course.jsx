import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Announcements from "../Announcements";
import Nav from "../Nav";


export default function Course() {
  const [course, setCourse] = useState([]);
  const [units, setUnits] = useState([]);
  /* const [uploads, setUploads] = useState([]); */
  const courseId = JSON.parse(sessionStorage.getItem("courseId"));
  const user = JSON.parse(sessionStorage.getItem("user"));
  const url = `/users/${courseId}`;

  useEffect(() => {
    const courseId = JSON.parse(sessionStorage.getItem("courseId"));
    fetch(`http://127.0.0.1:8000/api/courses/${courseId}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data[0]);
        setUnits(data[0].units);
        console.log(data);
      });
    /* fetch('http://127.0.0.1:8000/api/uploadsByUser', {               se puede borrar
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user.id
      })
    }).then(res => res.json()).then((data) => { setUploads(data) }) */
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
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: user.id,
            unit_id: event.target.id,
            file_name: fileName,
            file: file
          })
        };
        console.log(requestOptions.body);
        fetch('http://127.0.0.1:8000/api/postUpload', requestOptions)

      };
      fileReader.readAsDataURL(fileToLoad);
    }
  }

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
                  <div className="card-text"><Link to={`http://127.0.0.1:8000/storage/${unit.theory}`}>{unit.theory}</Link></div>
                  <div className="card-text"><Link to={`http://127.0.0.1:8000/storage/${unit.exercises}`}>{unit.exercises}</Link></div>
                  <input id={unit.id} type="file" onChange={(e) => handleFile(e)} />
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