import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
//imports assets
import notFound from "./assets/404.webp";
import _error from "./assets/error.webp";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  if (error.status == 404) {
    return (
      <div id="error-page" className="text-center p-5">
        <h1 className="fw-bold">Whoops!</h1>
        <i>
          <div>Parece que ha habido un error...</div>
          <div className="mb-3">
            No encontramos la página que estás buscando.
          </div>
        </i>
        <img src={notFound} width="500vw" className="mb-4"></img>
        <br></br>
        <Link to="/" className="btn btn-primary">
          Volver a la página principal
        </Link>
      </div>
    );
  } else {
    return (
      <div id="error-page" className="text-center p-5">
        <h1 className="fw-bold">Whoops!</h1>
        <i>
          <div>Parece que ha habido un error...</div>
        </i>
        <img src={_error} width="500vw" className="mb-4"></img>
        <br></br>
        <Link to="/" className="btn btn-primary">
          Volver a la página principal
        </Link>
      </div>
    );
  }
}