import { useEffect, useState } from "react";
import Nav from "../Nav";
import { URL } from "../url";




export default function Courses() {

    const [courses, setCourses] = useState([])
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
      let random = Math.floor(Math.random() * 10);
      let color = "";
      if (random === 1) {
        color = "#F0A990";
      } else if (random === 2) {
        color = "#FBF18A";
      } else if (random === 3) {
        color = "#C6FB8A";
      } else if (random === 4) {
        color = "#A5FCE5";
      } else if (random === 5) {
        color = "#A5E2FC";
      } else if (random === 6) {
        color = "#CDBFFE";
      } else if (random === 7) {
        color = "#FFD1F9";
      } else if (random === 8) {
        color = "#FF8C8C";
      } else if (random === 9) {
        color = "#8CA8FF";
      } else {
        color = "#9EFE9E";
      }
      return (
        <div
          key={item.id}
          className={"card"}
          style={{ width: "250px", backgroundColor: color }}
        >
          <div className="card-body">
            <h5 className="card-title fw-bold">{item.name}</h5>
            <p className="card-text">{item.description}</p>
            <button
              className="btn btn-primary"
              id={item.id}
              onClick={(e) => buyCourse(e)}
            >
              Comprar
            </button>
          </div>
        </div>
      );
    });

    return (
      <div>
        <Nav isLogged={isLogged} />
        <div className="container">
          <h1 className="my-5 fw-bold">Estos son nuestros cursos:</h1>
          <div className="d-flex flex-wrap gap-5">{coursesList}</div>
        </div>
      </div>
    );
}