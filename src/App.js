import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// React-Redux, Firebase, Firestore
import { Provider } from "react-redux";
import  store, { rrfProps }  from "./store";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
// firebase authentication route portection using redux-auth-wrapper package
import  { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth';

// Components
import Dashboard from "./components/layouts/Dashboard";
import Header from "./components/layouts/Header";
import Navbar from "./components/layouts/Navbar";
import Sidebar from "./components/layouts/Sidebar";
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Signin";
import Page404 from "./components/pages/page404";
import Clients from "./components/clients/Clients";
import ClientDetails from './components/clients/ClientDetails';
import AddClient from "./components/clients/AddClient";
import EditClient from "./components/clients/EditClient";
import About from "./components/pages/About";
import Settings from './components/settings/Settings';
import { MDBContainer } from "mdbreact";
import SortableComponent from "./components/tests/SortableComponent";

// CSS & JS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
// admin template css&js
// MDB React
import "mdbreact/dist/css/mdb.css";
// App css
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps }>
        <Router>
          {/* <Header branding="React Client Panel" /> */}
          <Navbar branding="React Client Panel" />
          <div style={{ marginTop: "6rem" }}>
            {/* <SortableComponent /> */}
            <Switch>
              <Route exact path="/" />
              <Route exact path="/dashboard" component={UserIsAuthenticated(Dashboard)} />
              <Route exact path="/clients" component={Clients} />
              <Route exact path="/clients/:id" component={UserIsAuthenticated(ClientDetails)} />
              <Route exact path="/clients/add" component={UserIsAuthenticated(AddClient)} />
              <Route exact path="/clients/edit/:id" component={UserIsAuthenticated(EditClient)} />
              <Route exact path="/about" component={About} />
              <Route exact path="/settings" component={UserIsAuthenticated(Settings)} />
              <Route exact path="/auth/signup" component={UserIsNotAuthenticated(Signup)} />
              <Route exact path="/auth/signin" component={UserIsNotAuthenticated(Signin)} />
              <Route component={Page404} />
            </Switch>
          </div>
        </Router>
        </ReactReduxFirebaseProvider>
      </Provider>
    );
  }
}

export default App;
