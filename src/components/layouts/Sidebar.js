import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";

import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import SpinnerPage from "../spinners/SpinnerPage";

class Sidebar extends Component {
  state = {
    client: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      balance: ""
    },
    modal: false
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onAddHandler = () => {
    this.toggle();
  };

  onChangeHandler = event => {
    const { firstName, lastName, email, phone, balance } = this.state.client;
    this.setState({
      client: {
        //  [event.target.name]: event.target.value
        firstName:
          event.target.name === "firstName" ? event.target.value : firstName,
        lastName:
          event.target.name === "lastName" ? event.target.value : lastName,
        email: event.target.name === "email" ? event.target.value : email,
        phone: event.target.name === "phone" ? event.target.value : phone,
        balance: event.target.name === "balance" ? event.target.value : balance
      }
    });
  };

  onFormSubmitHandler = e => {
    console.log("onFormSubmitHandler");
    e.preventDefault();
    this.addClient();
  };

  addClient = () => {
    // const { firstName, lastName, email, phone, balance } = this.state.client;
    // current state is the new Client
    const newClient = this.state.client;
    console.log("Proposed Client: " + newClient.name);
    // add the new client newClient
    const { firestore } = this.props;
    // handle the balance
    // if no balance set it to 0
    if (newClient.balance === "") {
      newClient.balance = "0";
    }

    // add to the firestore
    firestore
      .add(
        {
          collection: "clients"
        },
        newClient
      )
      .then(() => {
        // close the modal
        this.toggle();
        // clear the state
        this.setState({
          client: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            balance: ""
          }
        });
      });
  };

  render() {
    const { disableBalanceOnAdd } = this.props.settings;
    const { firstName, lastName, email, phone, balance } = this.state.client;
    return (
      <MDBContainer>
        {/* <Button onClick={this.toggle} className="btn btn-primary btn-block">
           <i className="fas fa-plus-circle">&nbsp;</i> New
         </Button> */}
        <MDBBtn onClick={this.onAddHandler}>
          <i className="fas fa-plus-circle">&nbsp;</i> New
        </MDBBtn>
        <MDBModal isOpen={this.state.modal} toggle={this.toggle} centered>
          <MDBModalHeader toggle={this.toggle}>Add new Client</MDBModalHeader>
          <MDBModalBody>
            <form
              className="text-center p-2"
              onSubmit={this.onFormSubmitHandler}
              method="POST"
            >
              <div className="form-row mb-4">
                <div className="col">
                  {/* <!-- First name --> */}
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="form-control needs-validation"
                    placeholder="First name"
                    value={firstName}
                    onChange={this.onChangeHandler}
                    required
                    minLength="2"
                  />
                </div>
                <div className="col">
                  {/* <!-- Last name --> */}
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form-control"
                    value={lastName}
                    placeholder="Last name"
                    onChange={this.onChangeHandler}
                    required
                    minLength="2"
                  />
                </div>
              </div>

              {/* <!-- E-mail --> */}
              <input
                type="email"
                id="email"
                name="email"
                className="form-control mb-4"
                value={email}
                placeholder="E-mail"
                onChange={this.onChangeHandler}
                required
              />

              {/* <!-- Phone number --> */}
              <input
                type="text"
                id="phone"
                name="phone"
                value={phone}
                className="form-control mb-4"
                placeholder="Phone number"
                aria-describedby="phone numbeer"
                onChange={this.onChangeHandler}
                required
                minLength="8"
                maxLength="10"
              />

              {/* <!-- balance --> */}
              <input
                type="number"
                id="balance"
                name="balance"
                className="form-control"
                value={balance}
                placeholder="Balance"
                aria-describedby="balance"
                onChange={this.onChangeHandler}
                disabled = {disableBalanceOnAdd}
              />

              {/* <input type="submit" classNameName="btn btn-primary" value="Submit"/> */}
              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={this.toggle}>
                  Close
                </MDBBtn>
                <MDBBtn type="submit" type="submit" color="primary">
                  Add Client
                </MDBBtn>
              </MDBModalFooter>
            </form>
          </MDBModalBody>
        </MDBModal>
      </MDBContainer>
    );
  }
}

Sidebar.propTypes = {
  settings: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(),
  connect((state, props) => ({
    settings: state.settings
  }))
)(Sidebar);
