const { useState, useEffect } = React;

function AllData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // fetch all accounts from API (/public/index.js)
    fetch('/account/all')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data);
      });
  }, []);

  const priceFormatter = (cell, row) => '$' + Number(cell).toFixed(2);

  return (
    <Card
      txtcolor="black"
      header={'All Bank Accounts'}
      body={
        <BootstrapTable
          data={data}
          bodyStyle={{ border: "none" }}
          tableStyle={{ border: "none" }}
          headerStyle={{ border: "none !important" }}
          striped
          version="4"
          height="500"
        >
          <TableHeaderColumn isKey dataField={'name'}>
            Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField={'email'}>
            Email
          </TableHeaderColumn>
          <TableHeaderColumn dataField={'uid'}>
            Firebase UID
          </TableHeaderColumn>
          <TableHeaderColumn dataField={'balance'} dataFormat={priceFormatter}>
            Balance
          </TableHeaderColumn>
        </BootstrapTable>
      }
    />
  );
}
