import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavProfessor from "../NavProfessor";



export default function Professor() {

    const [professor, setProfessor] = useState();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const professorId = JSON.parse(sessionStorage.getItem("professor")).id;
        fetch(`http://127.0.0.1:8000/api/professors/${professorId}`)
            .then(response => response.json())
            .then((data) => {
                setProfessor(data.professor);
                setCourses(data.courses);
            })
    }, []);

    let coursesList = courses.map((item) => {
        return (
            <li key={item.id}><Link to={`/professor/course`} id={item.id} onClick={(e) => handleCourse(e)}>{item.name}</Link></li>
        )
    })
    function handleCourse(e) {
        sessionStorage.setItem("courseId", JSON.stringify(e.target.id));
    }

    let isLogged = false;
    if (sessionStorage.getItem('token')) isLogged = true;

    if (!isLogged) return window.location.href = '/login';
    return (
        <div>
            <NavProfessor isLogged={isLogged} />
            <h1>Bienvenido, {professor ? professor.name : ''}</h1>
            <ul>{coursesList}</ul>
        </div>
    )
}