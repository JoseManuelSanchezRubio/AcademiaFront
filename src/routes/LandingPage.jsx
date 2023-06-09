import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../Nav";
import NavAdmin from "../NavAdmin";
import NavProfessor from "../NavProfessor";
import { URL } from "../url";
//assets imports
import boy from "../assets/boy.webp";
import bug from "../assets/bug.png";
import certificate from "../assets/certificate.png";
import facebook from "../assets/facebook.png";
import girl from "../assets/girl.webp";
import instagram from "../assets/instagram.png";
import maps from "../assets/maps.png";
import math from "../assets/math.png";
import opos from "../assets/opos.png";
import quotes from "../assets/quotes.png";
import telegram from "../assets/telegram.png";
import twitter from "../assets/twitter.png";

export default function LandingPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch(`${URL}/courses`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
      });
  }, []);
  let coursesList = courses.map((course) => {
    return (
      <div key={course.id}>
        <div key={course.id}>
          <div>{course.name}</div>
        </div>
      </div>
    );
  });
  if (courses) {
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
        {sessionStorage.getItem("user") == null &&
          sessionStorage.getItem("professor") == null &&
          sessionStorage.getItem("admin") == null && (
            <Nav
              isLogged={
                sessionStorage.getItem("token") != null &&
                sessionStorage.getItem("user") != null
              }
            ></Nav>
          )}

        <div className="background-mainpage">
          <div className="text-center">
            <h1 className="fw-bold title">Learning Enjoying</h1>
            <p className="fs-4">La mejor academia para aprender</p>
            <Link style={{ textDecoration: "none", color: "none" }} to="/login">
              <div className="my-5 access-btn">Acceder</div>
            </Link>
          </div>
        </div>
        <h1 className="text-center py-5 fw-bold title separator">
          Te ayudamos a aprender
        </h1>
        <section>
          <div className="skewed-up"></div>
        </section>
        <div className="container-flex cards-section-bg">
          <section className="container cards-section">
            <div className="row justify-content-center text-center">
              <article className="card col-lg-4 my-2 border-0">
                <div className="rounded bg-white course-card">
                  <img
                    alt="photo-of-girl-studying"
                    src={certificate}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <div className="card-title fs-5 fw-bold">
                      ¿Quieres un título oficial de inglés Cambridge?
                    </div>
                    <p className="card-text">
                      Con nuestros cursos de inglés aprenderás inglés de una
                      forma amena y divertida, mientras te preparas para
                      afrontar los exámenes de Cambridge.
                    </p>
                  </div>
                  <div className="mb-4">
                    <Link to="/courses" className="btn-courses">
                      Nuestros cursos
                    </Link>
                  </div>
                </div>
              </article>
              <article className="card col-lg-4 my-2 border-0">
                <div className="rounded bg-white course-card">
                  <img
                    alt="photo-of-girl-studying"
                    src={opos}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <div className="card-title fs-5 fw-bold">
                      ¿Estás pensando en sacarte una oposición?
                    </div>
                    <p className="card-text">
                      Si estás pensando en ser funcionario, te ayudamos a
                      conseguir tu plaza. Oposiciones de secundaria, primaria,
                      estatales, provinciales y locales.
                    </p>
                  </div>
                  <div className="mb-4">
                    <Link to="/courses" className="btn-courses">
                      Nuestros cursos
                    </Link>
                  </div>
                </div>
              </article>
              <article className="card col-lg-4 my-2 border-0">
                <div className="rounded bg-white course-card">
                  <img
                    alt="photo-of-worried-girl"
                    src={math}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <div className="card-title fs-5 fw-bold">
                      ¿Siempre se te han dado mal las matemáticas?
                    </div>
                    <p className="card-text">
                      Con nuestro curso de matemáticas ya no volverás a tener
                      esos dolores de cabeza que a todos nos han dado las
                      mátematicas. !Apúntate!
                    </p>
                  </div>
                  <div className="mb-4">
                    <Link to="/courses" className="btn-courses">
                      Nuestros cursos
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          </section>
        </div>
        <section>
          <div className="skewed-down"></div>
        </section>
        <img src={bug} className="bug"></img>
        <section className="container mb-5 testimonials">
          <h1 className="text-center pt-5 mb-5 fw-bold title">
            ¿Y qué dicen nuestros alumnos?
          </h1>
          <div className="row mb-5 pb-5">
            <div className="col-lg-6 d-flex align-items-center">
              <div>
                <span className="fs-5">
                  <img
                    alt="quotations-symbol"
                    src={quotes}
                    width="40px"
                    className="me-4 mt-4 float-start"
                  />
                  <br></br>
                  Learning enjoying es la mejor academia en la que he estado. Yo
                  he cursado el curso de matemáticas y la verdad es que me ha
                  encantado. El profesor explica muy bien y hace unos apuntes
                  muy buenos. A mi siempre me han costado mucho las matemáticas
                  y desde que me apunté al curso soy de los mejores de la clase.
                  <img
                    alt="quotations-symbol"
                    src={quotes}
                    width="40px"
                    className="ms-4"
                    style={{ transform: "rotate(180deg)" }}
                  />
                </span>

                <div className="text-secondary mt-4 mb-5 fst-italic">
                  David Pérez - Estudiante de Matemáticas
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <img
                alt="photo-of-boy"
                className="rounded-circle custom-shadow"
                src={boy}
                width="100%"
              ></img>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 d-flex align-items-center order-lg-2">
              <div>
                <span className="fs-5">
                  <img
                    alt="quotations-symbol"
                    src={quotes}
                    width="40px"
                    className="me-4 mt-4 float-start"
                  />
                  <br></br>
                  Necesitaba el certificado B1 de inglés para poder obtener el
                  título de la carrera y cuando me apunté a la academia no
                  imaginaba que me gustaría tanto. La profesora era buenísima y
                  muy maja y fui al examen súper preparada.
                  <br></br>
                  Recomendable al 100%.
                  <img
                    alt="quotations-symbol"
                    src={quotes}
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
                alt="photo-of-girl"
                className="rounded custom-shadow"
                src={girl}
                width="100%"
              ></img>
            </div>
          </div>
        </section>
        <section className="spikes"></section>
        <div className="faq pb-5">
          <section className="container my-5">
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <h1 className="text-center my-5 fw-bold title">
              Preguntas frecuentes
            </h1>
            <div className="accordion accordion-faq" id="accordionQA">
              <div className="accordion-item">
                <h2 className="accordion-header fw-bold">
                  <button
                    className="accordion-button shadow-none collapsed accordion-box"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="false"
                    aria-controls="collapseOne"
                  >
                    <div className="accordion-card">
                      ¿Cuál es la duración de los cursos?
                    </div>
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionQA"
                >
                  <div className="accordion-body">
                    La duración de los cursos depende del curso en el que estés
                    matriculado. Si estás matriculado en un curso de alguna
                    asignatura de la universidad, su duración será de un
                    cuatrimestre, es decir, igual que en la universidad. Otro
                    tipo de cursos, como son los de idiomas, tienen una duración
                    de un año, ya que los exámenes oficiales de idiomas son
                    anuales.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header fw-bold">
                  <button
                    className="accordion-button shadow-none collapsed accordion-box"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    <div className="accordion-card">
                      ¿Se obtiene alguna titulación en la Academia?
                    </div>
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionQA"
                >
                  <div className="accordion-body border-top">
                    Actualmente no se obtiene ninguna titulación oficial por
                    estudiar en nuestra academia, si bien estamos trabajando en
                    poder ofrecerte una certificación proporcional a tu trabajo
                    en la academia.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header fw-bold">
                  <button
                    className="accordion-button shadow-none collapsed accordion-box"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    <div className="accordion-card">
                      ¿Cuántos estudiantes hay por grupo?
                    </div>
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionQA"
                >
                  <div className="accordion-body border-top">
                    El tamaño de los grupos depende de la demanda que tenga.
                    Normalmente suelen asistir entre 10 y 15 alumnos, pero el
                    máximo es de 20 para poder ofrecer un servicio de máxima
                    calidad.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header fw-bold">
                  <button
                    className="accordion-button shadow-none collapsed accordion-box"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    <div className="accordion-card">
                      ¿Qué necesito traer a la academia?
                    </div>
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionQA"
                >
                  <div className="accordion-body border-top">
                    En Learning Enjoying te proporcionamos los apuntes de la
                    manera en la que tú quieras, tanto en papel como en formato
                    PDF. Por tanto, al aula solo es necesario que traigas papel
                    y boli para tomar apuntes, aunque eres libre de traer lo que
                    quieras.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header fw-bold">
                  <button
                    className="accordion-button shadow-none collapsed accordion-box"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFive"
                    aria-expanded="false"
                    aria-controls="collapseFive"
                  >
                    <div className="accordion-card">¿Ofrecéis descuentos?</div>
                  </button>
                </h2>
                <div
                  id="collapseFive"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionQA"
                >
                  <div className="accordion-body border-top">
                    Sí, si estás matriculado en una asignatura, te ofrecemos un
                    descuento del 10% si te apuntas al curso intensivo.
                  </div>
                </div>
              </div>
            </div>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
          </section>
        </div>
        <section className="spikes-footer"></section>
        <footer className="footer">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <h5 className="fw-bold">Learning Enjoying</h5>
                <p>
                  Nuestra academia busca provocar experiencias de aprendizaje
                  auténticas, completas, continuas, creativas y desafiantes para
                  ayudarte a ser mejor en lo que te propongas.
                </p>
                <p className="fst-italic">
                  Learning Enjoying. Aprende y disfruta.
                </p>
              </div>
              <div className="col-lg-6">
                <div className="d-flex text-lg-center">
                  <div className="col">
                    <div>
                      <div className="fw-bold mb-1">Nuestros cursos</div>
                      {courses.length < 5 ? (
                        coursesList
                      ) : (
                        <div key="coursesList">
                          <div key="uno">{courses[0].name}</div>
                          <div key="dos">{courses[1].name}</div>
                          <div key="tres">{courses[2].name}</div>
                          <div key="cuatro">{courses[3].name}</div>
                          <div key="cinco">Y más...</div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col">
                    <div>
                      <div className="fw-bold mb-1">Contacto</div>
                      <div>+34 947 813 746</div>
                      <div>learningenjoying@gmail.com</div>
                      <div>C/ Colón, 56 (03578)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center small pt-5 pb-3">
              <div className="d-flex justify-content-center gap-2 blocks">
                <Link className="block" to="https://facebook.com">
                  <img
                    className="block__item"
                    alt="facebook-logo"
                    src={facebook}
                    width="20px"
                  ></img>
                </Link>
                <Link className="block" to="https://instagram.com">
                  <img
                    className="block__item"
                    alt="instagram-logo"
                    src={instagram}
                    width="20px"
                  ></img>
                </Link>
                <Link className="block" to="https://web.telegram.org/k/">
                  <img
                    className="block__item"
                    alt="telegram-logo"
                    src={telegram}
                    width="20px"
                  ></img>
                </Link>
                <Link className="block" to="https://www.google.es/maps/preview">
                  <img
                    className="block__item"
                    alt="maps-logo"
                    src={maps}
                    width="20px"
                  ></img>
                </Link>
                <Link className="block" to="https://twitter.com/">
                  <img
                    className="block__item"
                    alt="twitter-logo"
                    src={twitter}
                    width="20px"
                  ></img>
                </Link>
              </div>
              <div className="mt-4 text-secondary">
                © 2023 | Jose Manuel Sánchez | All rights reserved
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
