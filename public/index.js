
function Spa() {
  return (
    <HashRouter>
      <div>
        <NavBar />
        <UserProvider>
          <div className="container" style={{ padding: "20px" }}>
            <Route path="/" exact component={Home} />
            <Route path="/CreateAccount" component={CreateAccount} />
            <Route path="/login" component={Login} />
            <Route path="/deposit" component={Deposit} />
            <Route path="/withdraw" component={Withdraw} />
            {/* <Route path="/transactions/" component={Transactions} /> */}
            <Route path="/balance" component={Balance} />
            <Route path="/alldata" component={AllData} />
          </div>
        </UserProvider>
      </div>
    </HashRouter>
  );
}

ReactDOM.render(<Spa />, document.getElementById("root"));
