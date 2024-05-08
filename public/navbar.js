function NavBar() {
  function handleLogout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        let homeLinkAnchor = document.getElementById("homeLinkAnchor");
        homeLinkAnchor.click();
      });
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark stroke">
      <div className="container-xl">
        <a className="navbar-brand fw-bold">Banco Full-Stack</a>
        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse ml-3 ms-auto" id="navbarNav">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item" id="homeLink">
              <a className="nav-link" id="homeLinkAnchor" href="#/">
                Inicio
              </a>
            </li>
            <li className="nav-item" id="createLink">
              <a className="nav-link" href="#/CreateAccount/">
                ¡Crea tu cuenta!
              </a>
            </li>
            <li
              className="nav-item"
              id="balanceLink"
              style={{ display: "none" }}
            >
              <a className="nav-link" href="#/balance/">
                Balance
              </a>
            </li>
            <li
              className="nav-item"
              id="depositLink"
              style={{ display: "none" }}
            >
              <a className="nav-link" href="#/deposit/">
                Deposito
              </a>
            </li>
            <li
              className="nav-item"
              id="withdrawLink"
              style={{ display: "none" }}
            >
              <a className="nav-link" href="#/withdraw/">
                Retiro
              </a>
            </li>
            <li
              className="nav-item"
              id="allDataLink"
              style={{ display: "none" }}
            >
              <a className="nav-link" href="#/alldata/">
                Todos los datos
              </a>
            </li>
            <li className="nav-item" id="loginLink">
              <a className="nav-link fw-bold" href="#/login/">
                Ingresar
              </a>
            </li>
            <li
              className="nav-item"
              id="logoutLink"
              style={{ display: "none" }}
            >
              <a
                className="nav-link cursor-pointer fw-bold"
                onClick={handleLogout}
              >
                Cerrar sesión
              </a>
            </li>
          </ul>
        </div>
        <div className="float-end">
          <span className="fw-bold mt-1 text-white" id="loggedInStatus"></span>
        </div>
      </div>
    </nav>
  );
}
