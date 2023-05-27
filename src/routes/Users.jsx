import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../Nav";
import NavProfessor from "../NavProfessor";


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
                <Link to={`http://127.0.0.1:8000/storage/${upload.file_name}`}>{upload.file_name}</Link>
            </div>
        )
    })
    let isProfessor = false;
    let isLogged = false;
    if (sessionStorage.getItem("professor")) isProfessor = true;
    if (sessionStorage.getItem('token')) {
        isLogged = true;
    }

    if (!isLogged) return window.location.href = '/login';
    return (
        <div>
            {isProfessor && <NavProfessor isLogged={isLogged}></NavProfessor>}
            {!isProfessor && <Nav isLogged={isLogged}></Nav>}
            <div className="container table-responsive">
                <table className="table mt-5">
                    <thead className="table-secondary">
                        <tr className="text-center">
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellidos</th>
                            <th scope="col">Correo electrónico</th>
                            {sessionStorage.getItem('professor') && (<th scope="col">Archivos</th>)}
                        </tr>
                    </thead>
                    {users.map(user => (
                        <tbody key={user.id}>
                            <tr>
                                <td scope="row" className="text-center">{user.name}</td>
                                <td className="text-center">{user.surname}</td>
                                <td className="text-center">{user.email}</td>
                                {sessionStorage.getItem('professor') && (<td className="text-center"><button type="button" id={user.id} className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e) => setUserId(e.target.id)}>
                                    Ver archvos subidos
                                </button></td>)}

                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="modal" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="modal">Archivos subidos</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                {uploadsHtml.length == 0 ? <div>El alumno todavía no ha subido ningún archivo</div> : uploadsHtml}
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </tr>

                        </tbody>))}
                </table>
                {users.length == 0 && <div className="py-3">Parece que todavía no hay ningún alumno matriculado...</div>}
            </div>
        </div>
    )
}


