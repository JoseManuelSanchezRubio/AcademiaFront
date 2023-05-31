


export default function UpdateEvent(event) {
    async function updateEvent(e) {
        e.preventDefault();
        alert(event.id)
        /* const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                description: description,
                start_date: start_date,
                end_date: end_date,
            })
        };
        fetch(`http://127.0.0.1:8000/api/events/${e.target.id}`, requestOptions)
            .then(response => response.json())
            .then(data => console.log(data)
            ); */
    }
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary me-2"
          data-bs-toggle="modal"
          data-bs-target="#editEventModal"
        >
          Editar
        </button>

        <div
          className="modal fade"
          id="editEventModal"
          tabIndex="-1"
          aria-labelledby="modal"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5 fw-bold" id="modal">
                  Editar evento
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form id={event.id} onSubmit={() => updateEvent()}>
                  <div className="mb-3">
                    <label htmlFor="title-modal" className="form-label">
                      Título
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title-modal"
                      defaultValue={event.title}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description-modal" className="form-label">
                      Descripción
                    </label>
                    <textarea
                      cols="30"
                      rows="3"
                      className="form-control"
                      id="description-modal"
                      defaultValue={event.description}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="startDate-modal" className="form-label">
                      Fecha de inicio
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="startDate-modal"
                      defaultValue={event.start_date}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="endDate-modal" className="form-label">
                      Fecha de fin
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="endDate-modal"
                      defaultValue={event.end_date}
                    />
                  </div>
                </form>
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
                  onClick={(e) => updateEvent(e)}
                >
                  Guardar los cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}