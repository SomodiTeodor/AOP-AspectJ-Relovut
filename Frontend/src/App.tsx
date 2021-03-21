import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/css/bootstrap-reboot.min.css";
import "typeface-roboto";
import React from "react";
import "./App.scss";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import store from "./redux/index";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { logoutUser } from "./redux/actions/userActions";
import Dashboard from "./components/pages/Dashboard";
import Navbar from "./components/layout/Navbar";
import { SET_USER } from "./redux/types/userTypes";
import TransactionsPage from "./components/pages/TransactionsPage";
import NewTransactionPage from "./components/pages/NewTransactionPage";
import AddFundsPage from "./components/pages/AddFundsPage";
import FriendsPage from "./components/pages/FriendsPage";
import ReportsPage from "./components/pages/ReportsPage";
import ChartsPage from "./components/pages/ChartsPage";

// type AppStateProps = ReturnType<typeof mapStateToProps>;
// type AppDispatchProps = ReturnType<typeof mapDispatchToProps>;
// type AppProps = AppStateProps & AppDispatchProps;

// Set auth token
let tokenFromLocalStorage = localStorage.getItem("jwtToken");
if (tokenFromLocalStorage) {
  setAuthToken(tokenFromLocalStorage);

  //Decode token and get user info and expiration
  let decoded: any;

  // tslint:disable-next-line
  let decodedHeader: any;
  try {
    decodedHeader = jwt_decode(tokenFromLocalStorage, { header: true });
    decoded = jwt_decode(tokenFromLocalStorage);
  } catch {
    decoded = null;
    decodedHeader = null;
  }
  localStorage.setItem("dh", decodedHeader);
  localStorage.removeItem("dh");

  //Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded === null || decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());

    localStorage.removeItem("jwtToken");
    setAuthToken("");
  } else {
    store.dispatch({ type: SET_USER, user: { username: decoded.sub } });
  }
}

if (tokenFromLocalStorage === null) {
  //Logout user
  store.dispatch(logoutUser());
}

class App extends React.Component<{}> {
  render() {
    const ContentContainer = (): JSX.Element => {
      return (
        <div>
          <Route path="/" component={Navbar} />
          <div className="contentArea">
            <div className="container">
              <div className="innerContainer">
                <Route exact path="/" component={Dashboard} />
                <Route
                  exact
                  path="/transactions"
                  component={TransactionsPage}
                />
                <Route exact path="/addFunds" component={AddFundsPage} />
                <Route
                  exact
                  path="/newTransaction/:accountId?"
                  component={NewTransactionPage}
                />
                <Route exact path="/friends" component={FriendsPage} />
                <Route exact path="/reports" component={ReportsPage} />
                <Route exact path="/charts" component={ChartsPage} />
              </div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route path="/" component={ContentContainer} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
