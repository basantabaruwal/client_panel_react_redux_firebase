import React, { Component } from "react";
import PropTypes from "prop-types";

class AddClient extends Component {

    state = {
        fname: '',
        lname: '',
        email: '',
        phone: '',
        email: ''
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

  onFormSubmitHandler = e => {
      console.log("onFormSubmitHandler");
    e.preventDefault();
    const { fname, lname, email, phone, balance } = this.state;
    const proposedClient = {
      name: fname+" "+lname,
      email: email,
      phone: phone,
      balance: balance
    }
    console.log("Proposed Client: "+proposedClient.name);

    // ADD NEW CLIENT

    // REDIRECT TO CLIENTS PAGE
    this.props.history.push('/clients');
  };

  render() {
    return (
      <div className="container" style={{width: "50%"}}>
        <h1>Add Client View</h1>

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
                id="fname"
                name="fname"
                className="form-control needs-validation"
                placeholder="First name"
                onChange={this.onChangeHandler}
                required
              />
            </div>
            <div className="col">
              {/* <!-- Last name --> */}
              <input
                type="text"
                id="lname"
                name="lname"
                className="form-control"
                placeholder="Last name"
                onChange={this.onChangeHandler}
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
            onChange={this.onChangeHandler}
            required
          />

          {/* <!-- Phone number --> */}
          <input
            type="text"
            id="phone"
            name="phone"
            className="form-control mb-4"
            placeholder="Phone number"
            aria-describedby="phone numbeer"
            onChange={this.onChangeHandler}
            required
          />

          {/* <!-- balance --> */}
          <input
            type="number"
            id="balance"
            name="balance"
            className="form-control"
            placeholder="Balance"
            aria-describedby="balance"
            onChange={this.onChangeHandler}
            required
          />

          <input type="submit" className="btn btn-primary btn-block my-4" value="Submit"/>
          
        </form>
      </div>
    );
  }
}

export default AddClient;
