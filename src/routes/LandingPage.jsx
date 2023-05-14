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
      {isProfessor && (<NavProfessor isLogged={isLogged}></NavProfessor>)}
      {!isProfessor && !isAdmin && (<Nav isLogged={isLogged}></Nav>)}
      {!isProfessor && isAdmin && (<NavAdmin isLogged={isLogged}></NavAdmin>)}
      <div className="background-mainpage">
        <div className="text-center text-light">
          <h1 className="p-3">Learning Enjoying</h1>
          <h3>La mejor academia para aprender</h3>
          <button className="btn btn-primary m-5">
            Nuestros cursos
          </button>
        </div>
      </div>
      <div className="container py-5">
        <section>
          <h1 className="text-center py-5">Te ayudamos a aprender</h1>
          <div className="row justify-content-center gap-5 text-center">
            <div className="card shadow" style={{ width: '20vw' }}>
              <img src="src\assets\certificate.jpg" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">¿Quieres un título de inglés Cambridge?</h5>
                <p className="card-text">Con nuestros cursos de inglés aprenderás inglés de una forma amena y divertida, mientras te preparas para afrontar los exámenes de Cambridge.</p>
                <Link to='/courses'><button className="btn btn-primary my-3">Más información</button></Link>
              </div>
            </div>
            <div className="card shadow" style={{ width: '20vw' }}>
              <img src="src\assets\opos.jpg" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">¿Estás pensando en sacarte una oposición?</h5>
                <p className="card-text">Si estás pensando en ser funcionario, te ayudamos a conseguir tu plaza. Oposiciones de secundaria, primaria, estatales, provinciales y locales.</p>
                <Link to='/courses'><button className="btn btn-primary my-3">Más información</button></Link>
              </div>
            </div>
            <div className="card shadow" style={{ width: '20vw' }}>
              <img src="src\assets\math.jpg" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">¿Siempre se te han dado mal las matemáticas?</h5>
                <p className="card-text">Con nuestro curso de matemáticas ya no volverás a tener esos dolores de cabeza que a todos nos han dado las mátematicas.</p>
                <Link to='/courses'><button className="btn btn-primary my-3">Más información</button></Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className="container">
        <h1 className="text-center p-5">¿Y qué dicen nuestros alumnos?</h1>
        <div className="row">
          <div className="col p-5 d-flex align-items-center">
            <div>
              <span className="fs-5">
                <sup><sup><img src="src\assets\quotes.png" width='40px' className="me-4" /></sup></sup>
                Learning enjoying es la mejor academia en la que he estado. Yo he cursado el curso de matemáticas y la verdad es que me ha encantado. El profesor explica muy bien y hace unos apuntes muy buenos. A mi siempre me han costado mucho las matemáticas y desde que me apunté al curso soy de los mejores de la clase.
              </span>
              <div className="text-secondary mt-4 fst-italic">David Pérez - Estudiante de matemáticas</div>
            </div>
          </div>
          <div className="col m-5">
            <img
              className="rounded-circle shadow"
              src="src\assets\boy.png"
              width="100%"
            ></img>
          </div>
        </div>
        <div className="row">
          <div className="col m-5">
            <img
              className="rounded shadow"
              src="src\assets\girl.jpg"
              width="100%"
            ></img>
          </div>
          <div className="col p-5 d-flex align-items-center">
            <div>
              <span className="fs-5">
                <sup><sup><img src="src\assets\quotes.png" width='40px' className="me-4" /></sup></sup>
                Necesitaba el certificado B1 de inglés para poder obtener el título de la carrera y cuando me apunté a la academia no imaginaba que me gustaría tanto. Fui al examen preparadísima. Recomendable al 100%.
              </span>
              <div className="text-secondary mt-4 fst-italic">Elena Gutiérrez - Estudiante de inglés</div>
            </div>
          </div>
        </div>
      </section>
      <footer className="text-center small pt-5 pb-3">
        <div>
          <img
            src="src\assets\facebook.png"
            width="20px"
            className="me-2"
          ></img>
          <img
            src="src\assets\instagram.png"
            width="20px"
            className="me-2"
          ></img>
          <img
            src="src\assets\whatsapp.png"
            width="20px"
            className="me-2"
          ></img>
          <img src="src\assets\email.png" width="20px"></img>
        </div>
        <div className="mt-2">
          © 2023 | Jose Manuel Sánchez | All rights reserved
        </div>
      </footer>
    </div>
  );
}
