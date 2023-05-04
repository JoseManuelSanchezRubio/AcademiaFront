import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../Nav";


export default function Course() {

    const [loading, setLoading] = useState(false);
    const [course, setCourse] = useState([]);
    const [units, setUnits] = useState([]);

    useEffect(() => {
        setLoading(true);
        const courseId = JSON.parse(sessionStorage.getItem("courseId"));
        fetch(`http://127.0.0.1:8000/api/courses/${courseId}`)
            .then(res => res.json())
            .then((data) => {
                setCourse(data[0]);
                setUnits(data[0].units)
                setLoading(false);
            });

    }, []);


    let isLogged = false;
    if (sessionStorage.getItem('token')) isLogged = true;

    if (!isLogged) return window.location.href = '/login';


    return (
        <div>
            <Nav isLogged={isLogged}></Nav>
            <div>
                <h1>{course.name}</h1>
                {units.map(unit => (
                    <li key={unit.id}>
                        {unit.name}
                        <ul>
                            <li>{unit.theory}</li>
                            <li>{unit.exercises}</li>
                            <li><Link to={`/forum/${unit.id}`}>Foro de la unidad</Link></li>
                        </ul>
                    </li>))}
            </div>
        </div>
    )
}