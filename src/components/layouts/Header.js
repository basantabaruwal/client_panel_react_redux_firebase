import React from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink,
  MDBIcon
} from "mdbreact";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";

// import { Link } from 'react-router-dom';
import HomeIcon from "@material-ui/icons/Home";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false
    };
    this.onClick = this.onClick.bind(this);
  }

  state = {
    isAuthenticated: false
  };

  static getDerivedStateFromProps(props, state) {
    const { auth } = props;
    if (auth.uid) {
      return { isAuthenticated: true };
    } else {
      return { isAuthenticated: false };
    }
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  onSignoutClicked = () => {
    console.log("onSignoutClicked");
    const { firebase, history } = this.props;
    firebase
        .logout()
        .then(()=>{
          history.push("/signin");
        });
  }

  render() {
    const bgPink = { backgroundColor: "#e91e63" };
    const container = { height: 1300 };
    const { isAuthenticated } = this.state;
    const { auth } = this.props;
    return (
      <div>
        <header>
          <MDBNavbar style={bgPink} dark expand="md" scrolling fixed="top">
            <MDBNavbarBrand href="/">
              <strong>{this.props.branding}</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.onClick} />
            <MDBCollapse isOpen={this.state.collapse} navbar>
              <MDBNavbarNav left>
                {isAuthenticated ? (
                  <MDBNavItem active>
                    <MDBNavLink to="/dashboard">
                      <MDBIcon fas icon="chart-pie" />
                      &nbsp;
                      {/* <HomeIcon /> */}
                      Dashboard
                    </MDBNavLink>
                  </MDBNavItem>
                ) : null}

                <MDBNavItem>
                  <MDBNavLink to="#">
                    <MDBIcon fas icon="book" />
                    &nbsp; Features
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="#">
                    <MDBIcon fas icon="pen" />
                    &nbsp; Contact
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="/about">
                    <MDBIcon fas icon="question" />
                    &nbsp; About
                  </MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
              <MDBNavbarNav right></MDBNavbarNav>
              {isAuthenticated ? (
                <ul class="navbar-nav">
                  <div>
                    <button
                      class="navbar-toggler"
                      type="button"
                      data-toggle="collapse"
                      data-target="#navbarSupportedContent"
                      aria-controls="navbarSupportedContent"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <li className="nav-item dropdown">
                      <Link
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        to="#!"
                      >
                        &nbsp;&nbsp; {auth.email}
                      </Link>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <Link to="#!" className="dropdown-item">
                          &nbsp;&nbsp; Profile
                        </Link>
                        <Link
                          to="#!"
                          className="dropdown-item"
                          onClick={this.onSignoutClicked}
                        >
                          &nbsp;&nbsp; Signout
                        </Link>
                      </div>
                    </li>
                  </div>
                </ul>
              ) : (
                <ul class="navbar-nav">
                  <li className="nav-item">
                    <Link to="/auth/signin" className="nav-link">
                      &nbsp;&nbsp;Signin
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/auth/signup"
                      className="nav-link"
                      onClick={this.onSignoutClicked}
                    >
                      &nbsp;&nbsp;Signup
                    </Link>
                  </li>
                </ul>
              )}
            </MDBCollapse>
          </MDBNavbar>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth,
    profile: state.firebase.auth
  }))
)(Header);
