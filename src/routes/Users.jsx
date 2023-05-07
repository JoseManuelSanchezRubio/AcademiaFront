import { useEffect, useState } from "react";
import Nav from "../Nav";


export default function Users() {


    const [users, setUsers] = useState([]);

    useEffect(() => {
        const courseId = JSON.parse(sessionStorage.getItem("courseId"));
        fetch(`http://127.0.0.1:8000/api/courses/${courseId}`)
            .then(res => res.json())
            .then((data) => {
                setUsers(data[0].users)
            });

    }, []);

    console.log(users)

    let isLogged = false;
    if (sessionStorage.getItem('token')) {
        isLogged = true;
    }

    if (!isLogged) return window.location.href = '/login';
    return (
        <div>
            <Nav isLogged={isLogged}></Nav>
            <div>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name}
                    </li>))}
            </div>
        </div>
    )
}