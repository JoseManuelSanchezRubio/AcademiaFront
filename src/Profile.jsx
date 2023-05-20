import UpdateUser from "./UpdateUser";

export default function Profile() {
  const user = {
    name: "Enrique",
    surname: "López",
    dni: "12345678A",
    address: "Calle Barcelona, 4, 1ºD",
    phone: "123456789",
    email: "enrique@mail.com",
  };

  if (window.innerWidth > 990) {
    return (
      <div>
        <div
          className="offcanvas offcanvas-end show"
          data-bs-scroll="true"
          data-bs-backdrop="false"
          tabIndex="-1"
          id="offcanvasScrollingXL"
          aria-labelledby="offcanvasScrollingLabel"
        >
          <div className="offcanvas-body">
            <div className="col">
              <div className="bg-blue rounded-4 px-4 py-5 m-auto">
                <div className="profile-picture rounded-circle">
                  <h1>
                    {user.name[0]}
                    {user.surname[0]}
                  </h1>
                </div>
                <br></br>
                <h3 className="text-center">
                  {user.name} {user.surname}
                </h3>
                <br></br>
                <div className="bg-bluedark rounded-4 px-4 py-4">
                  <div>
                    <strong>DNI:</strong>
                    <div className="mb-3">{user.dni}</div>
                  </div>
                  <div>
                    <strong>Dirección:</strong>
                    <div className="mb-3">{user.address}</div>
                  </div>
                  <div>
                    <strong>Teléfono:</strong>
                    <div className="mb-3">{user.phone}</div>
                  </div>
                  <div className="mb-3">
                    <strong>Email:</strong>
                    <div className="mb-3">{user.email}</div>
                  </div>
                  <UpdateUser />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="d-flex justify-content-end align-items-center">
          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasScrolling"
            aria-controls="offcanvasScrolling"
          >
            &lt;
          </button>
        </div>

        <div
          className="offcanvas offcanvas-end"
          data-bs-scroll="true"
          data-bs-backdrop="false"
          tabIndex="-1"
          id="offcanvasScrolling"
          aria-labelledby="offcanvasScrollingLabel"
        >
          <div className="offcanvas-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <div className="col">
              <div className="bg-blue rounded-4 px-4 py-5 m-auto">
                <div className="profile-picture rounded-circle">
                  <h1>
                    {user.name[0]}
                    {user.surname[0]}
                  </h1>
                </div>
                <br></br>
                <h3 className="text-center">
                  {user.name} {user.surname}
                </h3>
                <br></br>
                <div className="bg-bluedark rounded-4 p-5">
                  <div>
                    <strong>DNI:</strong>
                    <div className="mb-3">{user.dni}</div>
                  </div>
                  <div>
                    <strong>Dirección:</strong>
                    <div className="mb-3">{user.address}</div>
                  </div>
                  <div>
                    <strong>Teléfono:</strong>
                    <div className="mb-3">{user.phone}</div>
                  </div>
                  <div className="mb-3">
                    <strong>Email:</strong>
                    <div className="mb-3">{user.email}</div>
                  </div>
                  <UpdateUser />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
