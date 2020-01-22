import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
// actions
import { setNotification } from "../../actions/notifyActions";
import { ERROR, SUCCESS } from "../../config/app-constants";
import Alert from "../alerts/Alert";

class Signin extends Component {
  state = {
    email: "",
    password: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onFormSubmit = e => {
    e.preventDefault();
    const { firebase, history, setNotification } = this.props;
    const { email, password } = this.state;
    // login
    firebase
      .login({
        email,
        password
      })
      .then(() => {
        // history.push("/dashboard");
        setNotification("Login Successful", SUCCESS);
      })
      .catch(err => {
        // alert("Invalid Login Credentials!!");
        setNotification("Invalid Login Credentials!!", ERROR);
      });
  };

  render() {
    const { message, messageType } = this.props.notification;
    return (
      <div className="container clearfix">
        <Link to="/" className="float-left btn btn-link">
          <i className="fas fa-arrow-circle-left">&nbsp;&nbsp;</i>
          Home
        </Link>

        <div className="auth-wrapper col-md-6 mx-auto">
          {
            message ? (
              <Alert message={message} messageType={messageType}/>
            ) : null
          }
          <form
            onSubmit={this.onFormSubmit}
            className="text-center border border-light p-5"
          >
            <p className="h4 mb-4">
              <i className="fas fa-lock">&nbsp;&nbsp;</i>
              Sign in
            </p>

            {/* <!-- Email --> */}
            <input
              type="email"
              id="email"
              name="email"
              value={this.state.email}
              className="form-control mb-4"
              placeholder="E-mail"
              required
              onChange={this.onChange}
            />

            {/* <!-- Password --> */}
            <input
              type="password"
              id="password"
              name="password"
              value={this.state.password}
              className="form-control mb-4"
              placeholder="Password"
              required
              onChange={this.onChange}
            />

            <div className="d-flex justify-content-around">
              <div>
                {/* <!-- Remember me --> */}
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="defaultLoginFormRemember"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="defaultLoginFormRemember"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <div>
                {/* <!-- Forgot password --> */}
                <a href="">Forgot password?</a>
              </div>
            </div>

            {/* <!-- Sign in button --> */}
            <button className="btn btn-info btn-block my-4" type="submit">
              Sign in
            </button>

            {/* <!-- Register --> */}
            <p>
              Not a member?&nbsp;
              <Link to="/auth/signup">Register</Link>
            </p>

            {/* <!-- Social login --> */}
            <p>or sign in with:</p>

            <a href="#" className="mx-2" role="button">
              <i className="fab fa-facebook-f light-blue-text"></i>
            </a>
            <a href="#" className="mx-2" role="button">
              <i className="fab fa-twitter light-blue-text"></i>
            </a>
            <a href="#" className="mx-2" role="button">
              <i className="fab fa-linkedin-in light-blue-text"></i>
            </a>
            <a href="#" className="mx-2" role="button">
              <i className="fab fa-github light-blue-text"></i>
            </a>
          </form>
        </div>
      </div>
    );
  }
}

Signin.propTypes = {
  firebase: PropTypes.object.isRequired,
  notification: PropTypes.object
};

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notification: state.notification
    }),
    { setNotification }
  )
)(Signin);
