import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// redux, react-redux-firebase/firestore
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { setNotification } from "../../actions/notifyActions";
import { SUCCESS, ERROR } from "../../config/app-constants";
import Alert from "../alerts/Alert";

class Signup extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: ""
  };

  onFormInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onFormSubmit = e => {
    e.preventDefault();
    console.log("onFormSubmit");

    // create the user
    const { firstName, lastName, email, phone, password } = this.state;
    const { firebase, history } = this.props;
    const username = { firstName } + " " + { lastName };
    firebase
      .createUser({
        email: email,
        password: password
      })
      .then(() => {
        alert("User Created Successfully");
        this.props.setNotification("User created successfully", SUCCESS);
        // clear the state on success only
        this.setState({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: ""
        });
      })
      .catch(() => {
        alert("Some Error Occurred!!");
        this.props.setNotification("Some Error Occurred", ERROR);
      });
  };

  componentWillMount() {
    const { allowRegistration } = this.props.settings;
    const { history } = this.props;
    if (!allowRegistration) {
      history.push("/auth/signin");
    }
  }

  render() {
    const { message, messageType } = this.props.notification;
    return (
      <div className="container clearfix">
        <Link to="/" className="float-left btn btn-link">
          <i className="fas fa-arrow-circle-left">&nbsp;&nbsp;</i>
          Home
        </Link>

        <div className="auth-wrapper col-md-6 mx-auto">
          {message ? (
            <Alert message={message} messageType={messageType} />
          ) : null}
          <form
            className="text-center border border-light p-5"
            onSubmit={this.onFormSubmit}
          >
            <p className="h4 mb-4">Sign up</p>

            <div className="form-row mb-4">
              <div className="col">
                {/* <!-- First name --> */}
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="form-control"
                  placeholder="First name"
                  onChange={this.onFormInputChange}
                  required
                />
              </div>
              <div className="col">
                {/* <!-- Last name --> */}
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="form-control"
                  placeholder="Last name"
                  onChange={this.onFormInputChange}
                  required
                />
              </div>
            </div>

            {/* <!-- E-mail --> */}
            <input
              type="email"
              id="email"
              name="email"
              className="form-control mb-4"
              placeholder="E-mail"
              onChange={this.onFormInputChange}
              required
            />

            {/* <!-- Password --> */}
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Password"
              aria-describedby="defaultRegisterFormPasswordHelpBlock"
              onChange={this.onFormInputChange}
              required
            />
            <small
              id="defaultRegisterFormPasswordHelpBlock"
              className="form-text text-muted mb-4"
            >
              At least 8 characters and 1 digit
            </small>

            {/* <!-- Phone number --> */}
            <input
              type="text"
              id="phone"
              name="phone"
              className="form-control mb-3"
              placeholder="Phone number"
              aria-describedby="defaultRegisterFormPhoneHelpBlock"
              onChange={this.onFormInputChange}
              required
            />

            {/* <!-- Newsletter --> */}
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="defaultRegisterFormNewsletter"
              />
              <label
                className="custom-control-label"
                htmlFor="defaultRegisterFormNewsletter"
              >
                Subscribe to our newsletter
              </label>
            </div>

            {/* <!-- Sign up button --> */}
            <button className="btn btn-info my-4 btn-block" type="submit">
              Sign Up
            </button>
            <p>
              Already a member?&nbsp;
              <Link to="/auth/signin">Sign In</Link>
            </p>

            {/* <!-- Social register --> */}
            <p>or sign up with:</p>

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

            <hr />

            {/* <!-- Terms of service --> */}
            <p>
              By clicking
              <em>Sign up</em> you agree to our
              <a href="" target="_blank">
                &nbsp;terms of service
              </a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  firebase: PropTypes.object.isRequired,
  notification: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notification: state.notification,
      settings: state.settings
    }),
    { setNotification }
  )
)(Signup);
