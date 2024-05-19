const { useState, useContext } = React;

function CreateAccount() {
  const { user, setUser } = useContext(UserContext);
  const [show, setShow] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");

  function handleSignUp() {
    if (name && email && password.length > 4) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          const userLogIn = firebase.auth().currentUser;
          setUser({ email: email });
          let uid = userLogIn.uid;
          // mongodb
          const url = `/account/create/${name}/${email}/${uid}`;
          (async () => {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
          })();
          setShow(false);
        })
        .catch((error) => {
          let errorCode = error.code;
          let errorMessage = error.message;
          console.log("Error: " + errorCode + " " + errorMessage);
          alert("Este correo ya esta registrado");
        });
    } else {
      setMessage("Por favor, llene de manera correcta el formulario");
    }
    setStatus(false);
    setTimeout(() => {
      setStatus(true);
    }, 4000);
  }

  return (
    <Card
      txtcolor="black"
      header="¡Crea tu cuenta!"
      status={status}
      body={
        show ? (
          <>
            Ingresa tu nombre
            <br />
            <input
              type="input"
              className="form-control"
              id="nameInput"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <br />
            Ingresa tu correo electrónico
            <br />
            <input
              type="input"
              className="form-control"
              id="emailInput"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <br />
            Ingresa tu Contraseña
            <br />
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSignUp}
            >
              Crear cuenta
            </button>
            <br />
            <br />
            {!status && <>{message}</>}
          </>
        ) : (
          <h5>¡Éxito! Tu cuenta ha sido creada y ahora estás conectado.</h5>
        )
      }
    />
  );
}
