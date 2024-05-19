const { useState, useContext, useEffect } = React;

function Deposit() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const ctx = useContext(UserContext);
  console.log(ctx)

  useEffect(() => {
    const email = ctx.user.email;
    console.log("Email", email)
    fetch(`/account/findOne/${email}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          setBalance(data.balance);
          console.log("JSON:", data);
        } catch (err) {
          setStatus(err);
          console.log("err:", err);
        }
      });
  }, [ctx.user.email]);

  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);

  function handle() {
    if (amount.length > 0) {
      const email = ctx.user.email;
      fetch(`/account/update/${email}/${amount}`)
        .then((response) => response.text())
        .then((text) => {
          try {
            const data = JSON.parse(text);
            setStatus(JSON.stringify(data.value));
            setShow(false);
            // Actualizar el balance después del depósito
            setBalance((prevBalance) => prevBalance + parseFloat(amount));
            setAmount("");
            console.log("JSON:", data);
          } catch (err) {
            alert("Ingrese algún monto");
            setStatus("Deposit failed");
            console.log("err:", text);
          }
        });
    } else {
      alert("Ingrese algún monto");
    }
  }

  return (
    <>
      <Card
        txtcolor="black"
        header="Depositar fondos"
        status={status}
        body={
          show ? (
            <>
              <h5>Actual balance: ${parseFloat(balance).toFixed(2)}</h5>
              Cantidad de deposito
              <br />
              <input
                type="number"
                className="form-control"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.currentTarget.value)}
              />
              <br />
              <button type="submit" className="btn btn-light" onClick={handle}>
                Deposito
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
                Hacer otro deposito
              </button>
            </>
          )
        }
      />
    </>
  );
}
