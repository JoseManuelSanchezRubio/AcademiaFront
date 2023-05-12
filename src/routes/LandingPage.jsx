import Nav from "../Nav";

export default function LandingPage() {
  let isLogged = false;
  if (sessionStorage.getItem("token")) isLogged = true;
  return (
    <div>
      <Nav isLogged={isLogged}></Nav>
      <div className="background-mainpage">
        <div className="text-center text-light">
          <h2>El mejor sitio para aprender</h2>
          <h1 className="p-3">Learning Enjoying</h1>
          <div className="btn btn-primary m-5">
            Entra aquí para descubrir todos nuestros cursos
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col p-5 d-flex align-items-center">
            <div>
              <h3>
                Gravida quam mi erat tortor neque molestie. Auctor aliquet at
                porttitor a enim nunc suscipit tincidunt nunc. Et non lorem
                tortor posuere. Nunc eu scelerisque interdum eget tellus non
                nibh scelerisque bibendum.
              </h3>
              <div className="fs-5">John Black</div>
              <div className="text-secondary fs-5">CEO of Workcation</div>
            </div>
          </div>
          <div className="col m-5">
            <img
              className="rounded-circle"
              src="src\assets\boy.png"
              width="100%"
            ></img>
          </div>
        </div>
        <div className="row">
          <div className="col m-5">
            <img
              className="rounded"
              src="src\assets\girl.jpg"
              width="100%"
            ></img>
          </div>
          <div className="col p-5 d-flex align-items-center">
            <div>
              <h3>
                Gravida quam mi erat tortor neque molestie. Auctor aliquet at
                porttitor a enim nunc suscipit tincidunt nunc. Et non lorem
                tortor posuere. Nunc eu scelerisque interdum eget tellus non
                nibh scelerisque bibendum.
              </h3>
              <div className="fs-5">John Black</div>
              <div className="text-secondary fs-5">CEO of Workcation</div>
            </div>
          </div>
        </div>
      </div>
      <footer className="text-center small pt-5 pb-3">
        <div>
          <img
            src="src\assets\facebook.png"
            width="20px"
            className="me-2"
          ></img>
          <img
            src="src\assets\instagram.png"
            width="20px"
            className="me-2"
          ></img>
          <img
            src="src\assets\whatsapp.png"
            width="20px"
            className="me-2"
          ></img>
          <img src="src\assets\email.png" width="20px"></img>
        </div>
        <div className="mt-2">
          © 2023 | Jose Manuel Sánchez | All rights reserved
        </div>
      </footer>
    </div>
  );
}
