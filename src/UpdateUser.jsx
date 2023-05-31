import { useEffect, useState } from "react";
import { URL } from "./url";

export default function UpdateUser() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [professor, setProfessor] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    setProfessor(JSON.parse(sessionStorage.getItem("professor")));
    setUser(JSON.parse(sessionStorage.getItem("user")));
  }, [])

  function fillForm() {
    if (professor) {
      setName(professor.name);
      setSurname(professor.surname);
      setAddress(professor.address);
      setPhone(professor.phone);
    } else {
      setName(user.name);
      setSurname(user.surname);
      setAddress(user.address);
      setPhone(user.phone);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const professorId = JSON.parse(sessionStorage.getItem("professor"))?.id;
    const userId = JSON.parse(sessionStorage.getItem("user"))?.id;
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        surname: surname,
        address: address,
        phone: phone,
        password: password
      })
    };
    if (professor) {
      await fetch(`${URL}/professors/${professorId}`, requestOptions).then(res => res.json()).then(data => console.log(data))
      professor.name = name;
      professor.surname = surname;
      professor.address = address;
      professor.phone = phone;
      sessionStorage.setItem('professor', JSON.stringify(professor))
    } else {
      await fetch(`${URL}/users/${userId}`, requestOptions).then(res => res.json()).then(data => console.log(data))
      user.name = name;
      user.surname = surname;
      user.address = address;
      user.phone = phone;
      sessionStorage.setItem('user', JSON.stringify(user))
    }
    alert('Datos personales actualizados.');
    window.location.reload();
  }
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={() => fillForm()}
      >
        Editar datos
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        data-bs-backdrop="false"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">
                Edita tus datos personales
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    defaultValue={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="surname" className="form-label">
                    Apellidos
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="surname"
                    defaultValue={surname}
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Dirección
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    defaultValue={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Teléfono
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="phone"
                    defaultValue={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña (déjala en blanco para no cambiarla)
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cerrar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Guardar cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
