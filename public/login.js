const { useState, useContext } = React;

function Login() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const ctx = useContext(UserContext);

  function handleEmailAndPassword() {
    if (email && password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          setShow(false);
          setStatus(true);
          ctx.user.email = email;
        })
        .catch((error) => {
          setMessage(
            "Credenciales incorrectas, por favor corrige tus credenciales."
          );
          setStatus(false);
          setTimeout(() => {
            setStatus(true);
          }, 4000);
          console.log(error.message);
        });
    } else {
      setMessage("Please fill the form");
      setStatus(false);
      setTimeout(() => {
        setStatus(true);
      }, 4000);
    }
  }

  function handleGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var user = result.user;
        setShow(false);
        setStatus(true);
        ctx.user.email = user.email;
        fetch(`/account/findOne/${user.email}`)
          .then((response) => response.text())
          .then((text) => {
            try {
              const data = JSON.parse(text);
            } catch (err) {
              var displayName = user.displayName;
              var userEmail = user.email;
              var uid = user.uid;
              const url = `/account/create/${displayName}/${userEmail}/${uid}`;
              (async () => {
                var res = await fetch(url);
                var data = await res.json();
                console.log(data);
              })();
            }
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <Card
      txtcolor="black"
      header="¡Ingresa a tu cuenta!"
      status={status}
      body={
        show ? (
          <>
            Correo electrónico
            <br />
            <input
              type="input"
              className="form-control"
              id="emailInput"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <br />
            Contraseña
            <br />
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <br />
            <div className="btn-sumbit" style={{ display: "flex" }}>
              <button
                type="submit"
                className="btn btn-primary btn-sign-in"
                id="loginButton"
                onClick={handleEmailAndPassword}
              >
                Ingresa con correo electrónico
              </button>
              <button
                className="btn btn-primary"
                id="googleButton"
                onClick={handleGoogle}
              >
                Ingresa con Google
              </button>
            </div>
            {status ? null : (
              <>
                <br />
                <br />
                <h5>{message}</h5>
              </>
            )}
          </>
        ) : (
          <h5>¡Éxito! Ahora has iniciado sesión.</h5>
        )
      }
    />
  );
}
