import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../Nav";

export default function Profile() {


    const [user, setUser] = useState();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const userId = JSON.parse(sessionStorage.getItem("user")).id;
        fetch(`http://127.0.0.1:8000/api/users/${userId}`)
            .then(response => response.json())
            .then((data) => {
                setUser(data.user);
                setCourses(data.courses);
            })
    }, []);

    let coursesList = courses.map((item) => {
        return (
            <div key={item.id}><Link to={`/course`} id={item.id} onClick={(e) => handleCourse(e)}>{item.name}</Link></div>
        )
    })


    function handleCourse(e) {
        sessionStorage.setItem("courseId", JSON.stringify(e.target.id));
    }

    let isLogged = false;
    if (sessionStorage.getItem('token')) {
        isLogged = true;
    }

    if (!isLogged) return window.location.href = '/login';

    return (
        <div>
            <Nav isLogged={isLogged}></Nav>
            <h3>Bienvenido/a {user ? user.name : ''}</h3>
            <h4>Tus cursos</h4>
            {coursesList}
        </div>
    )
}