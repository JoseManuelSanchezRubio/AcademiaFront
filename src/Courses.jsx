import { useEffect, useState } from "react"
import Nav from "./Nav"





export default function Courses() {

    const [courses, setCourses] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/courses")
            .then(res => res.json())
            .then(data => {
                setCourses(data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    console.log(courses)

    let isLogged = false;
    if (sessionStorage.getItem('token')) {
        isLogged = true;
    }

    if (!isLogged) return window.location.href = '/login';

    return (
        <div>
            <Nav isLogged={isLogged} />
            <h1>Courses</h1>
        </div>
    )
}