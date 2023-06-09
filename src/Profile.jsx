/* eslint-disable react/prop-types */
import UpdateUser from "./UpdateUser";
//imports assets
import lessThan from "./assets/less-than.png";

export default function Profile(props) {
  let dni = "";
  let profilePic = "";
  if (sessionStorage.getItem("user") != null) {
    dni = JSON.parse(sessionStorage.getItem("user"))?.dni;
    profilePic = `https://source.boringavatars.com/beam/145/${dni}`;
  }
  if (sessionStorage.getItem("professor") != null) {
    dni = JSON.parse(sessionStorage.getItem("professor"))?.dni;
    profilePic = `https://source.boringavatars.com/beam/145/${dni}`;
  }
  if (sessionStorage.getItem("admin") != null) {
    dni = JSON.parse(sessionStorage.getItem("admin"))?.dni;
    profilePic = `https://source.boringavatars.com/beam/145/${dni}`;
  }
  return (
    <div>
      <div className="open-button">
        <div
          className=""
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasScrolling"
          aria-controls="offcanvasScrolling"
        >
          <img src={lessThan} style={{ width: "30px" }} />
        </div>
      </div>

      <div
        className="offcanvas offcanvas-end"
        data-bs-scroll="true"
        data-bs-backdrop="true"
        tabIndex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div className="offcanvas-header modal-darktheme-profile">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body modal-darktheme-profile">
          <div className="col">
            <div className="bg-blue rounded-4 px-4 py-5 m-auto">
              <div className="profile-picture rounded-circle">
                <h1 className="fw-bold">
                  {/* {props?.user?.name[0].toUpperCase()}
                  {props?.user?.surname[0].toUpperCase()} */}
                  <img src={profilePic}></img>
                </h1>
              </div>
              <br></br>
              <h3 className="text-center fw-bold">
                {props?.user?.name[0]?.toUpperCase() +
                  props?.user?.name.slice(1)}{" "}
                {props?.user?.surname[0]?.toUpperCase() +
                  props?.user?.surname?.slice(1)}
              </h3>
              <br></br>
              <div className="bg-bluedark rounded-4 p-5">
                <div>
                  <strong>DNI:</strong>
                  <div className="mb-3">{props?.user?.dni}</div>
                </div>
                <div>
                  <strong>Dirección:</strong>
                  <div className="mb-3">
                    {props?.user?.address[0]?.toUpperCase() +
                      props?.user?.address?.slice(1)}
                  </div>
                </div>
                <div>
                  <strong>Teléfono:</strong>
                  <div className="mb-3">{props?.user?.phone}</div>
                </div>
                <div className="mb-3">
                  <strong>Email:</strong>
                  <div className="mb-3">{props?.user?.email}</div>
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