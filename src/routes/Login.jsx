import { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../Nav";



export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    function checkLogin(data) {
        if (data.status) {
            sessionStorage.setItem('token', data.token)
            sessionStorage.setItem('user', JSON.stringify(data.user))
            console.log(data)
            window.location.href = '/profile'
        } else {
            alert(data.message);
        }
    }


    function handleSubmit(e) {
        e.preventDefault();
        if (email == '') return alert("Debes introducir un email");
        if (password == '') return alert("Debes introducir una contraseña");

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        };
        fetch('http://127.0.0.1:8000/api/users/login', requestOptions)
            .then(response => response.json())
            .then(data => checkLogin(data)
            );

    }

    let isLogged = false;
    if (sessionStorage.getItem('token')) isLogged = true;
    return (
        <div>
            <Nav isLogged={isLogged} />
            <section className="d-flex justify-content-center pt-5">
                <div>
                    <h1 className="mb-4">Iniciar sesión</h1>
                    <form style={{ width: "30vw" }}>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form2Example1">Email</label>
                            <input type="email" id="form2Example1" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                        </div>


                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form2Example2">Contraseña</label>
                            <input type="password" id="form2Example2" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block mb-4" onClick={handleSubmit}>Iniciar sesión</button>


                        <div className="text-center">
                            <p>¿No tienes una cuenta? <Link to='/logup'>Regístrate</Link></p>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}