
import Nav from '../Nav';



export default function LandingPage() {
    let isLogged = false;
    if (sessionStorage.getItem('token')) isLogged = true;
    return (
        <div>
            <Nav isLogged={isLogged}></Nav>
            <h1>Learning enjoying</h1>
        </div>
    )
}