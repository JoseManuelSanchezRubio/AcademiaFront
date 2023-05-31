import { useEffect, useState } from "react";
import Nav from "../Nav";
import { URL } from "../url";
//import assets
import nothing from "../assets/nothing.png";




export default function Courses() {

    //const [courses, setCourses] = useState([]);;
    const courses = [{id: 1, name: "Matemáticas", description: "Curso de matemáticas básicas en el que podrás aprender los conceptos básicos de matemáticas. No dudes en apuntarte", price: "24,99"}, {id: 2, name: "Lengua", description: "Curso de matemáticas básicas", price: "40,00"}, {id: 3, name: "Biología", description: "Curso de matemáticas básicas", price: "30,00"}, {id: 4, name: "Filosofía", description: "Curso de matemáticas básicas", price: "49,99"}, {id: 5, name: "Música", description: "Curso de matemáticas básicas", price: "49,99"}, {id: 6, name: "Física", description: "Curso de matemáticas básicas", price: "49,99"}];
    const [userCourses, setUserCourses] = useState([])
    const user = JSON.parse(sessionStorage.getItem("user"));
    let isLogged = false;
    if (sessionStorage.getItem('token')) {
        isLogged = true;
    }

    useEffect(() => {
        fetch(`${URL}/courses`)
            .then(res => res.json())
            .then(data => {
                setCourses(data)
            })
        //const userId = JSON.parse(sessionStorage.getItem("user")).id;
        fetch(`${URL}/users/${user?.id}`)
            .then(response => response.json())
            .then((data) => {
                setUserCourses(data.courses);
            })
    }, [])

    async function buyCourse(e) {

        if (!isLogged) return window.location.href = '/login';

        if (confirm("Está apunto de comprar el curso, ¿seguro que desea continuar?")) {
            for (let i = 0; i < userCourses.length; i++) {
                if (userCourses[i].id == e.target.id) return alert("Ya has comprado ese curso")
            }

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user.id,
                    course_id: e.target.id
                })
            };
            await fetch(`${URL}/users/course`, requestOptions)

            alert("Compra realizada");
            window.location.href = '/user';
        }

    }

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
          style={{ width: "280px", minHeight: "200px", backgroundColor: color }}
        >
          <div className="card-body d-flex flex-column justify-content-between">
            <div>
              <h4 className="card-title fw-bold">{item.name}</h4>
              <p className="card-text">{item.description}</p>
            </div>
            <div>
              <button
                className="btn btn-primary mt-3"
                id={item.id}
                onClick={(e) => buyCourse(e)}
              >
                Comprar
              </button>
              <div className="price">{item.price} €</div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>
        <Nav isLogged={isLogged} />
        <div className="container">
          <h1 className="my-5 fw-bold">Estos son nuestros cursos:</h1>
          <div className="d-flex flex-wrap gap-5 justify-content-center">{coursesList}</div>
          {courses.length == 0 && (
          <div className="empty">
            <img src={nothing} width="200px" />
            <br></br>
            <label className="py-4">
              La academia todavía no despone de ningún curso
            </label>
          </div>
        )}
        </div>
      </div>
    );
}