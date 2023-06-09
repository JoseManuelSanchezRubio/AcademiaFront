import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../BackButton";
import Nav from "../Nav";
import NavAdmin from "../NavAdmin";
import NavProfessor from "../NavProfessor";
import { URL, URL_STORAGE } from "../url";
//import assets
import nothing from "../assets/nothing.png";

export default function Users() {
  const navigate = useNavigate();
  let isLogged = false;
  //let isProfessor = false;
  const [users, setUsers] = useState([]);
  //const [uploads, setUploads] = useState([]);
  //const [userId, setUserId] = useState("1");

  useEffect(() => {
    /* if (sessionStorage.getItem("professor") != null) {
      isProfessor = true;
    } */
    if (
      (sessionStorage.getItem("token") != null &&
        sessionStorage.getItem("user") != null) ||
      sessionStorage.getItem("professor") != null
    ) {
      isLogged = true;
    }
    if (isLogged == false) {
      return navigate("/login");
    }
    const courseId = JSON.parse(sessionStorage.getItem("courseId"));
    fetch(`${URL}/courses/${courseId}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data[0].users);
      });

    /* fetch(`${URL}/uploadsByUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUploads(data);
      }); */
  }, []);

  /* let uploadsHtml = [];
  uploadsHtml = uploads.map((upload) => {
    return (
      <div key={upload.id}>
        <Link to={`${URL_STORAGE}/${upload.file_name}`}>
          {upload.file_name}
        </Link>
      </div>
    );
  }); */

  return (
    <div>
      {sessionStorage.getItem("user") && (
        <Nav
          isLogged={
            sessionStorage.getItem("token") != null &&
            sessionStorage.getItem("user") != null
          }
        ></Nav>
      )}
      {sessionStorage.getItem("professor") && (
        <NavProfessor
          isLogged={
            sessionStorage.getItem("token") != null &&
            sessionStorage.getItem("professor") != null
          }
        ></NavProfessor>
      )}
      {sessionStorage.getItem("admin") && (
        <NavAdmin
          isLogged={
            sessionStorage.getItem("token") != null &&
            sessionStorage.getItem("admin") != null
          }
        ></NavAdmin>
      )}
      <div className="container table-responsive">
        <div className="d-flex align-items-center mt-4">
          <BackButton></BackButton>
          {sessionStorage.getItem("professor") != null ? (
            <h1 className="ms-4 pt-2">Alumnos: </h1>
          ) : (
            <h1 className="ms-4 pt-2 fw-bold">Compañeros: </h1>
          )}
        </div>
        <table className="table mt-4 modal-darktheme">
          <thead className="table-secondary">
            <tr className="text-center">
              <th scope="col">Nombre</th>
              <th scope="col">Apellidos</th>
              <th scope="col">Correo electrónico</th>
              {/* {sessionStorage.getItem("professor") && (
                <th scope="col">Archivos</th>
              )} */}
            </tr>
          </thead>
          {users.map((user) => (
            <tbody key={user.id}>
              <tr>
                <td scope="row" className="text-center">
                  {user.name}
                </td>
                <td className="text-center">{user.surname}</td>
                <td className="text-center">{user.email}</td>

                {/* <td className="text-center">
                  <button
                    type="button"
                    id={user.id}
                    className="btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Ver archvos subidos
                  </button>
                </td>


                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex="-1"
                  aria-labelledby="modal"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content modal-darktheme">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="modal">
                          Archivos subidos
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">

                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Cerrar
                        </button>
                      </div>
                    </div>
                  </div>
                </div> */}
              </tr>
            </tbody>
          ))}
        </table>
        {users.length == 0 && (
          <div className="empty">
            <img src={nothing} width="200px" />
            <br></br>
            <label className="py-4">
              Parece que todavía no hay ningún alumno matriculado...
            </label>
          </div>
        )}
      </div>
    </div>
  );
}


