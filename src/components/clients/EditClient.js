import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import SpinnerPage from "../spinners/SpinnerPage";

class EditClient extends Component {
  constructor(props) {
    super(props);

    // Create refs
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
    this.balanceInput = React.createRef();
  }

  onFormSubmitHandler = e => {
    console.log("onFormSubmitHandler");
    e.preventDefault();

    const proposedClient = {
      firstName: this.firstNameInput.current.value,
      lastName: this.lastNameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value,
      balance: this.balanceInput.current.value
    };

    // if no balance is entered set it to 0
    if (proposedClient.balance == "") {
      proposedClient.balance = 0;
    }
    console.log("Proposed Client: " + proposedClient.name);

    // UPDATE the CLIENT
    const { firestore, client, history } = this.props;
    proposedClient.id = client.id;
    firestore
      .update({ collection: "clients", doc: client.id }, proposedClient)
      .then(() => {
        console.log("Client Updated successfully.");
        // REDIRECT TO Dashboard
        history.push("/dashboard");
      });
  };

  render() {
    const { settings } = this.props;
    console.log(JSON.stringify(this.props.settings));
    const { client } = this.props;
    if (client) {
      const { id, firstName, lastName, email, phone, balance } = client;
      return (
        <div className="container" style={{ width: "50%" }}>
          <div className="card">
            <div className="card-header">
              <h1>
                Update Client: <span className="lead">{id}</span>{" "}
              </h1>
            </div>

            <div className="card-body">
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
                      defaultValue={firstName}
                      ref={this.firstNameInput}
                      className="form-control needs-validation"
                      placeholder="First name"
                      required
                    />
                  </div>
                  <div className="col">
                    {/* <!-- Last name --> */}
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      defaultValue={lastName}
                      ref={this.lastNameInput}
                      className="form-control"
                      placeholder="Last name"
                      required
                    />
                  </div>
                </div>

                {/* <!-- E-mail --> */}
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={email}
                  ref={this.emailInput}
                  className="form-control mb-4"
                  placeholder="E-mail"
                  required
                />

                {/* <!-- Phone number --> */}
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  defaultValue={phone}
                  ref={this.phoneInput}
                  className="form-control mb-4"
                  placeholder="Phone number"
                  aria-describedby="phone number"
                  required
                />

                {/* <!-- balance --> */}
                <input
                  type="number"
                  id="balance"
                  name="balance"
                  defaultValue={balance}
                  ref={this.balanceInput}
                  className="form-control"
                  placeholder="Balance"
                  aria-describedby="balance"
                  disabled={settings.disableBalanceOnEdit}
                />

                <input
                  type="submit"
                  className="btn btn-primary btn-block my-4"
                  value="Update Client"
                />
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return <SpinnerPage />;
    }
  }
}

EditClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id }
  ]),
  // connect((state, props) => ({
  //   client: state.firestore.ordered.client && state.firestore.ordered.client[0],
  //   settings: state.settings
  // }))
  // short hand
  connect(({ firestore: { ordered }, settings}, props)=> ({ // take out firestore from state and then ordered form firestore and settings from state
    client: ordered.client && ordered.client[0],
    settings:  settings
  }))
)(EditClient);
