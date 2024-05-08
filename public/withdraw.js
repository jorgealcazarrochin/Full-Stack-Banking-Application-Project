const { useState, useContext, useEffect } = React;

function Withdraw() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const ctx = useContext(UserContext);
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const email = ctx.user.email;
    fetch(`/account/findOne/${email}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          setBalance(data.balance);
          setAmount("");
        } catch (err) {
          setStatus(text);
          console.log("err:", text);
        }
      });
  }, [ctx.user.email, status]); // Agregar status a la lista de dependencias

  function handle() {
    if (amount > balance) {
      alert("No tiene los fondos suficientes");
      return;
    }
    const email = ctx.user.email;
    fetch(`/account/update/${email}/-${amount}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          setStatus(JSON.stringify(data.value));
          setShow(false);
          // Actualizar el balance después del retiro
          setBalance((prevBalance) => prevBalance - parseFloat(amount));
        } catch (err) {
          setStatus("La retirada ha fallado.");
          console.log("err:", text);
        }
      });
  }

  return (
    <Card
      txtcolor="black"
      header="Retirar fondos"
      status={status}
      body={
        show ? (
          <>
            <h5>Actual balance: ${parseFloat(balance).toFixed(2)}</h5>
            Cantidad a retirar
            <br />
            <input
              type="number"
              className="form-control"
              placeholder="Ingresa la cantidad"
              value={amount}
              onChange={(e) => setAmount(e.currentTarget.value)}
            />
            <br />
            <button type="submit" className="btn btn-light" onClick={handle}>
              Retirar
            </button>
          </>
        ) : (
          <>
            <h5>¡Exitoso!</h5>
            <button
              type="submit"
              className="btn btn-light"
              onClick={() => {
                setShow(true);
                setStatus("");
              }}
            >
              Hacer otro retiro
            </button>
          </>
        )
      }
    />
  );
}
