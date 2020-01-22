import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import SpinnerPage from "../spinners/SpinnerPage";
import Alert from "../alerts/Alert";
import { SUCCESS } from "../../config/app-constants";

class Clients extends Component {
  state = {
    totalOwed: null
  };

  static getDerivedStateFromProps(props, state) {
    const { clients } = props;
    if (clients) {
      // add the balances
      const balanceSum = clients.reduce((balanceSum, client) => {
        return balanceSum + parseFloat(client.balance);
      }, 0);
      return {
        // state,
        totalOwed: balanceSum
      };
    }
    return null;
  }



  onDeleteHandler = (client)=> {
    console.log("onDeleteHandler");
    // // delete client in firestore
    const { firestore, history } = this.props;
    firestore
        .delete(
          {collection: 'clients', doc: client.id},
          client
        ).then(()=>{
          console.log("Client Deleted Successfully!!");
        });
  }

  render() {
    const { clients } = this.props;
    const { totalOwed } = this.state;

    // const clients = [
    //   // {
    //   //   id: "23242",
    //   //   firstName: "Ram",
    //   //   lastName: "Gururng",
    //   //   email: "ramg@gmail.com",
    //   //   phone: "0823544233",
    //   //   balance: "50"
    //   // },
    // ];

    if (clients) {
      return (
        <React-Fragment>
          <div className="row">
            <div className="col-md-6">
              <h2>
                <i className="fas fa-users text-success">&nbsp;</i>
                Clients
              </h2>
            </div>
            <div className="col-md-6">
              <h5 className="text-right text-secondary">
                Total Owed:&nbsp;
                <span className="text-primary font-weight-bold">
                  ${parseFloat(totalOwed).toFixed(2)}
                </span>
              </h5>
            </div>
          </div>
          <table className="table table-striped">
            <thead className="thead-inverse">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td>{client.firstName + " " + client.lastName}</td>
                  <td>{client.email}</td>
                  <td>${parseFloat(client.balance).toFixed(2)}</td>
                  <td className="text-right">
                    <Link to={`/clients/${client.id}`} className="text-primary">
                      <i className="fas fa-eye">&nbsp;&nbsp;&nbsp;&nbsp;</i>
                    </Link>
                    <Link
                      to={`/clients/edit/${client.id}`}
                      className="text-warning"
                    >
                      <i className="fas fa-pen">&nbsp;&nbsp;&nbsp;&nbsp;</i>
                    </Link>
                    <a href="#!" onClick={this.onDeleteHandler.bind(this, client)}>
                      <i
                       className="fas fa-trash text-danger">&nbsp;&nbsp;&nbsp;&nbsp;</i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </React-Fragment>
      );
    } else {
      return <SpinnerPage centered />;
    }
  }
}

Clients.propTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: "clients" , queryParams: ['orderByKey']}]),
  connect((state, props) => ({
    clients: state.firestore.ordered.clients
  }))
)(Clients);
