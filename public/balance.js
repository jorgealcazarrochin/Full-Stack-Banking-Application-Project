const { useState, useContext, useEffect } = React;

function Balance() {
  const ctx = useContext(UserContext);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const email = ctx.user.email;
    fetch(`/account/findOne/${email}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          setBalance(data.balance);
        } catch (err) {
          console.log("err:", text);
        }
      });
  }, [ctx.user.email]);

  return (
    <Card
      txtcolor="black"
      header="Balance de cuenta"
      body={<h5>Tu actual balance es: ${parseFloat(balance).toFixed(2)}</h5>}
    />
  );
}
