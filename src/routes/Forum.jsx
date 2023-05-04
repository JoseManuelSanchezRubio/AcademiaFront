import { useEffect, useState } from "react";
import Nav from "../Nav";


export default function Forum() {


    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const forum_id = window.location.pathname.split("/")[2];
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                forum_id: forum_id
            })
        };
        fetch('http://127.0.0.1:8000/api/messages/forum', requestOptions)
            .then(response => response.json())
            .then(data => setMessages(data)
            );

    }, []);

    console.log();

    let isLogged = false;
    if (sessionStorage.getItem('token')) isLogged = true;

    if (!isLogged) return window.location.href = '/login';

    return (
        <div>
            <Nav isLogged={isLogged}></Nav>
            <h1>Mensajes del foro</h1>
            <ul>
                {messages.map(message => (
                    <li key={message.id}>{message.body} ({message.user.name})</li>
                ))}
            </ul>
        </div>
    )
}