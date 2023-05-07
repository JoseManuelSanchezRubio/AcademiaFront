import { useEffect, useState } from "react";
import Nav from "../Nav";





export default function Courses() {

    const [courses, setCourses] = useState([])
    const [userCourses, setUserCourses] = useState([])
    const userId = JSON.parse(sessionStorage.getItem("user")).id;

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/courses")
            .then(res => res.json())
            .then(data => {
                setCourses(data)
            })
        const userId = JSON.parse(sessionStorage.getItem("user")).id;
        fetch(`http://127.0.0.1:8000/api/users/${userId}`)
            .then(response => response.json())
            .then((data) => {
                setUserCourses(data.courses);
            })
    }, [])

    async function buyCourse(e) {

        for (let i = 0; i < userCourses.length; i++) {
            if (userCourses[i].id == e.target.id) return alert("Ya has comprado ese curso")
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: userId,
                course_id: e.target.id
            })
        };
        await fetch('http://127.0.0.1:8000/api/users/course', requestOptions)

        alert("Compra realizada");
        window.location.href('profile')

    }

    let isLogged = false;
    if (sessionStorage.getItem('token')) {
        isLogged = true;
    }

    if (!isLogged) return window.location.href = '/login';

    return (
        <div>
            <Nav isLogged={isLogged} />
            <h1>Nuestros cursos</h1>
            <div>
                {courses.map(course => (
                    <div className="card" key={course.id}>
                        <div className="card-body">
                            <h5 className="card-title">{course.name}</h5>
                            <button className="btn btn-primary" id={course.id} onClick={(e) => buyCourse(e)}>Comprar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}