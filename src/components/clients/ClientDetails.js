import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import SpinnerPage from "../spinners/SpinnerPage";

class ClientDetails extends Component {
  state = {
    showBalanceUpdateForm: false,
    newBalance: ""
  };

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  toggleBalanceForm = () => {
    console.log("toggleBalanceForm");
    this.setState({
      showBalanceUpdateForm: !this.state.showBalanceUpdateForm
    });
  };

  onBalanceSubmit = e => {
    e.preventDefault();
    const { client, firestore } = this.props;
    // console.log("Updating balance: " + this.state.newBalance);

    client.balance = parseFloat(this.state.newBalance);
    console.log("Client's new  balance: " + client.balance);

    // Update the client in firestore
    firestore
      .update({ collection: "clients", doc: client.id }, client)
      .then(() => {
          this.toggleBalanceForm()
      });
  };

  onDeleteHandler=()=> {
      console.log("onDeleteHandler");
      // delete the client in firestore
      const { firestore, client, history } = this.props; 
      firestore.delete({collection: 'clients', doc: client.id}, client)
      .then(()=>{
          history.push("/dashboard")
      });
      
  }

  render() {
    if (this.props.client) {
      const {
        id,
        firstName,
        lastName,
        email,
        phone,
        balance
      } = this.props.client;

      // return red color if balance owed is greater than 0
      const balanceStyle = {
        color: parseFloat(balance) > 0 ? "red" : "green"
      };

      let balanceUpdateForm = "";
      if (this.state.showBalanceUpdateForm) {
        balanceUpdateForm = (
          <form
            onSubmit={this.onBalanceSubmit}
            method="POST"
            className="form-inline"
          >
            <div className="input-group">
              <input
                className="form-control"
                type="number"
                id="newBalance"
                name="newBalance"
                value={this.state.newBalance}
                placeholder="Add new Balance"
                onChange={this.onInputChange}
                required
              />
              <div className="input-group-append">
                <input
                  type="submit"
                  value="Update"
                  className="btn btn-outline-dark"
                />
              </div>
            </div>
          </form>
        );
      }

      return (
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <Link to="/dashboard" className="btn btn-link">
                <i className="fas fa-arrow-circle-left">&nbsp;&nbsp;</i>
                Back
              </Link>
            </div>
            <div className="col-md-6">
              <div className="btn-group float-right clearfix">
                <Link to={`/clients/edit/${id}`} className="btn btn-warning">
                  <i className="fas fa-pen">&nbsp;&nbsp;</i>
                  Edit
                </Link>
                <Button onClick={this.onDeleteHandler} className="btn btn-danger">
                  <i className="fas fa-trash">&nbsp;&nbsp;</i>
                  Delete
                </Button>
              </div>
            </div>
          </div>

          <hr />
          <div className="card">
            <h3 className="card-header">
              {firstName} {lastName}
            </h3>

            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h4>
                    Client ID:&nbsp;{" "}
                    <span className="text-secondary">{id}</span>
                  </h4>
                </div>
                <div className="col-md-4 col-sm-6">
                  <h3 className="pull-right">
                    Balance:&nbsp;
                    <span style={balanceStyle}>
                      ${parseFloat(balance).toFixed(2)}
                    </span>
                    &nbsp;&nbsp;
                    <i
                      onClick={this.toggleBalanceForm}
                      className="fas fa-pen-alt"
                      style={{ cursor: "pointer", fontSize: "1.2rem" }}
                    ></i>
                    {balanceUpdateForm}
                  </h3>
                </div>
              </div>
              <hr />

              <ul className="list-group">
                <li className="list-group-item">Contact Email: {email}</li>
                <li className="list-group-item">Contact Phone: {phone}</li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return <SpinnerPage />;
    }
  }
}

ClientDetails.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(ClientDetails);
