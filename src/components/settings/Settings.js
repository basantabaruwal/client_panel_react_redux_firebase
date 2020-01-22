import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { defaultSettings } from "../../store";

import {
  setDisableBalanceOnAdd,
  setDisableBalanceOnEdit,
  setAllowRegistration,
  resetSettings
} from "../../actions/settingsActions";

class Settings extends Component {
  allowRegistrationChange = e => {
    const { setAllowRegistration } = this.props;
    // this.props.setAllowRegistration();
    setAllowRegistration(e.target.checked);
  };

  disableBalanceOnAddChange = e => {
    this.props.setDisableBalanceOnAdd(e.target.checked);
  };

  disableBalanceOnEditChange = e => {
    this.props.setDisableBalanceOnEdit(e.target.checked);
  };

  onFormSubmit = e => {
    e.preventDefault();
    console.log("on Setting form submit");
    // save the current settings prop to localStorage
    localStorage.setItem("settings", JSON.stringify(this.props.settings));
    alert("settings saved!");
  };

  onResetBtnClicked = () => {
    console.log("Reset button clicked!");
    this.props.resetSettings();
  };

  render() {
    const {
      disableBalanceOnAdd,
      disableBalanceOnEdit,
      allowRegistration
    } = this.props.settings;
    // console.log("Default settings: "+JSON.stringify(defaultSettings));
    // console.log("Current settings: "+JSON.stringify(this.props.settings));
    // console.log("is equal: "+(JSON.stringify(this.props.settings)===JSON.stringify(defaultSettings)));
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <Link to="/dashboard" className="btn btn-link">
              <i className="fas fa-arrow-circle-left">&nbsp;</i>
              Back
            </Link>
          </div>
          <div className="col-md-10 mr-auto">
            <div className="card">
              <div className="card-header">Edit Settings</div>

              <div className="card-body">
                <form onSubmit={this.onFormSubmit}>
                  <div className="custom-control custom-switch mb-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="allowRegistration"
                      name="allowRegistration"
                      checked={allowRegistration}
                      onChange={this.allowRegistrationChange}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="allowRegistration"
                    >
                      Allow Registration
                    </label>
                  </div>
                  <div className="custom-control custom-switch mb-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="disableBalanceOnAdd"
                      name="disableBalanceOnAdd"
                      checked={disableBalanceOnAdd}
                      onChange={this.disableBalanceOnAddChange}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="disableBalanceOnAdd"
                    >
                      Disable Balance on Add
                    </label>
                  </div>
                  <div className="custom-control custom-switch mb-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="disableBalanceOnEdit"
                      name="disableBalanceOnEdit"
                      checked={disableBalanceOnEdit}
                      onChange={this.disableBalanceOnEditChange}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="disableBalanceOnEdit"
                    >
                      Disable Balance on Edit
                    </label>
                  </div>

                  <p className="small lead">
                    <span className="font-weight-bold">Note:&nbsp;</span>
                    Settings are saved as soon as you change them.
                  </p>
                  <p className="small lead">
                    Here, Save Settings button is provide just for a demo and Of
                    Course it WORKS!!
                  </p>

                  <div className="form-group float-right">
                    <button
                      onClick={this.onResetBtnClicked}
                      className="btn btn-small btn-danger"
                      disabled = {
                        JSON.stringify(this.props.settings)===JSON.stringify(defaultSettings)
                      }
                    >
                      Reset Settings
                    </button>
                    <input
                      type="submit"
                      value="Save Settings"
                      className="btn btn-warning"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  setDisableBalanceOnAdd: PropTypes.func.isRequired,
  setDisableBalanceOnEdit: PropTypes.func.isRequired,
  setAllowRegistration: PropTypes.func.isRequired
};

export default connect(
  (state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }),
  {
    setDisableBalanceOnAdd,
    setDisableBalanceOnEdit,
    setAllowRegistration,
    resetSettings
  }
)(Settings);
