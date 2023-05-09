import { useEffect, useState } from "react";
import Nav from "../Nav";


export default function Users() {


    const [users, setUsers] = useState([]);
    const [uploads, setUploads] = useState([]);
    const [userId, setUserId] = useState('1');

    useEffect(() => {
        const courseId = JSON.parse(sessionStorage.getItem("courseId"));
        fetch(`http://127.0.0.1:8000/api/courses/${courseId}`)
            .then(res => res.json())
            .then((data) => {
                setUsers(data[0].users)
            });

        fetch('http://127.0.0.1:8000/api/uploadsByUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: userId
            })
        }).then(res => res.json()).then((data) => { setUploads(data) })

    }, [userId]);

    let uploadsHtml = [];
    uploadsHtml = uploads.map((upload) => {
        return (
            <div key={upload.id}>
                <div>{upload.content}</div>
            </div>
        )
    })


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
                        <button type="button" id={user.id} className="btn btn-primary ms-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e) => setUserId(e.target.id)}>
                            Ver archvos subidos
                        </button>

                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="modal" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="modal">Archivos subidos</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        {uploadsHtml}
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>))}
            </div>
        </div>
    )
}