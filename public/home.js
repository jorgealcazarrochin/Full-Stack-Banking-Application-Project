function Home() {
  return (
    <>
      <Card
        txtcolor="black"
        header="Bienvenidos al Banco Full-Stack"
        
        text="
        El Banco Full-Stack está aquí para ayudarte a resolver tu rompecabezas financiero. A través de nuestra aplicación web, puedes abrir una cuenta y luego depositar y retirar fondos de tu cuenta."
        body={
          <>
            <p className="text-center">
              <img
                src="./badbank.jpeg"
                className="img-fluid"
                alt="Responsive image"
              />
            </p>
          </>
        }
      />
    </>
  );
}
