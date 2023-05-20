import { Link } from "react-router-dom";
import Nav from "../Nav";
import NavAdmin from "../NavAdmin";
import NavProfessor from "../NavProfessor";

export default function LandingPage() {
  let isLogged = false;
  let isProfessor = false;
  let isAdmin = false;
  if (sessionStorage.getItem("token")) isLogged = true;
  if (sessionStorage.getItem("professor")) isProfessor = true;
  if (sessionStorage.getItem("admin")) isAdmin = true;
  return (
    <div>
      {isProfessor && <NavProfessor isLogged={isLogged}></NavProfessor>}
      {!isProfessor && !isAdmin && <Nav isLogged={isLogged}></Nav>}
      {!isProfessor && isAdmin && <NavAdmin isLogged={isLogged}></NavAdmin>}
      <div className="background-mainpage">
        <div className="text-center text-light">
          <h1 className="p-3">Learning Enjoying</h1>
          <h3>La mejor academia para aprender</h3>
          <button className="btn btn-primary m-5">Nuestros cursos</button>
        </div>
      </div>
      <div className="container py-5">
        <section>
          <h1 className="text-center py-5">Te ayudamos a aprender</h1>
          <div className="row justify-content-center text-center">
            <div className="card col-lg-4">
              <img src="src\assets\certificate.jpg" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">
                  ¿Quieres un título de inglés Cambridge?
                </h5>
                <p className="card-text">
                  Con nuestros cursos de inglés aprenderás inglés de una forma
                  amena y divertida, mientras te preparas para afrontar los
                  exámenes de Cambridge.
                </p>
                <Link to="/courses">
                  <button className="btn btn-primary my-3">
                    Más información
                  </button>
                </Link>
              </div>
            </div>

            <div className="card col-lg-4">
              <img src="src\assets\opos.jpg" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">
                  ¿Estás pensando en sacarte una oposición?
                </h5>
                <p className="card-text">
                  Si estás pensando en ser funcionario, te ayudamos a conseguir
                  tu plaza. Oposiciones de secundaria, primaria, estatales,
                  provinciales y locales.
                </p>
                <Link to="/courses">
                  <button className="btn btn-primary my-3">
                    Más información
                  </button>
                </Link>
              </div>
            </div>

            <div className="card col-lg-4">
              <img src="src\assets\math.jpg" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">
                  ¿Siempre se te han dado mal las matemáticas?
                </h5>
                <p className="card-text">
                  Con nuestro curso de matemáticas ya no volverás a tener esos
                  dolores de cabeza que a todos nos han dado las mátematicas.
                  !Apúntate!
                </p>
                <Link to="/courses">
                  <button className="btn btn-primary my-3">
                    Más información
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className="container mb-5">
        <h1 className="text-center pt-5 mb-5">
          ¿Y qué dicen nuestros alumnos?
        </h1>
        <div className="row mb-5 pb-5">
          <div className="col-lg-6 d-flex align-items-center">
            <div>
              <span className="fs-5">
                <img
                  src="src\assets\quotes.png"
                  width="40px"
                  className="me-4 mt-4 float-start"
                />
                <br></br>
                Learning enjoying es la mejor academia en la que he estado. Yo
                he cursado el curso de matemáticas y la verdad es que me ha
                encantado. El profesor explica muy bien y hace unos apuntes muy
                buenos. A mi siempre me han costado mucho las matemáticas y
                desde que me apunté al curso soy de los mejores de la clase.
                <img
                  src="src\assets\quotes.png"
                  width="40px"
                  className="ms-4"
                  style={{ transform: "rotate(180deg)" }}
                />
              </span>

              <div className="text-secondary mt-4 mb-5 fst-italic">
                David Pérez - Estudiante de Contabilidad financiera
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <img
              className="rounded-circle shadow"
              src="src\assets\boy.png"
              width="100%"
            ></img>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 d-flex align-items-center order-lg-2">
            <div>
              <span className="fs-5">
                <img
                  src="src\assets\quotes.png"
                  width="40px"
                  className="me-4 mt-4 float-start"
                />
                <br></br>
                Necesitaba el certificado B1 de inglés para poder obtener el
                título de la carrera y cuando me apunté a la academia no
                imaginaba que me gustaría tanto. La profesora era muy buena y
                muy maja y fui al examen preparadísima.
                <br></br>
                Recomendable al 100%.
                <img
                  src="src\assets\quotes.png"
                  width="40px"
                  className="ms-4"
                  style={{ transform: "rotate(180deg)" }}
                />
              </span>
              <div className="text-secondary mt-4 mb-5 fst-italic">
                Elena Gutiérrez - Estudiante de inglés
              </div>
            </div>
          </div>
          <div className="col-lg-6 d-flex align-items-center">
            <img
              className="rounded shadow"
              src="src\assets\girl-min.jpg"
              width="100%"
            ></img>
          </div>
        </div>
      </section>
      <footer className="text-center text-secondary small pt-5 pb-3">
        <div>
          <Link to="https://facebook.com">
            <img
              src="src\assets\facebook.png"
              width="20px"
              className="me-2"
            ></img>
          </Link>
          <Link to="https://instagram.com">
            <img
              src="src\assets\instagram.png"
              width="20px"
              className="me-2"
            ></img>
          </Link>
          <Link to="https://whatsapp.com">
            <img
              src="src\assets\whatsapp.png"
              width="20px"
              className="me-2"
            ></img>
          </Link>
          <Link to="https://gmail.com">
            <img src="src\assets\email.png" width="20px"></img>
          </Link>
        </div>
        <div className="mt-2">
          © 2023 | Jose Manuel Sánchez | All rights reserved
        </div>
      </footer>
    </div>
  );
}
