import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);


    if (error.status == 404) {
        return (
            <div id="error-page" className="text-center p-5">
                <h1>Whoops!</h1>
                <i>
                    <div>Parece que ha habido un error...</div>
                    <div className="mb-3">No encontramos la página que estás buscando.</div>
                </i>
                <img src="src\assets\404.jpg" width='400vw' className="mb-4"></img>
                <br></br>
                <Link to='/' className="btn btn-primary">Volver a la página principal</Link>
            </div>
        );
    } else {
        return (
            <div id="error-page" className="text-center p-5">
                <h1>Whoops!</h1>
                <div>Parece que ha habido un error...</div>
                <p>
                    <i>{error.status} - {error.statusText}</i>
                </p>
                <Link to='/' className="btn btn-primary">Volver a la página principal</Link>
            </div>
        );
    }

}