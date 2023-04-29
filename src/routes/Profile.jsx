import Nav from "../Nav"




export default function Profile() {
    let isLogged = false;
    if (sessionStorage.getItem('token')) {
        isLogged = true;
    }

    const user = JSON.parse(sessionStorage.getItem('user'))

    if (!isLogged) return window.location.href = '/login';

    return (
        <div>
            <Nav isLogged={isLogged}></Nav>
            <h3>Bienvenido/a, {user.name}</h3>
        </div>
    )
}