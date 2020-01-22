import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { INFO, SUCCESS, WARNING, ERROR, PRIMARY, SECONDARY, LIGHT, DARK} from "../../config/app-constants";

const Alert = props => {
  const { message, messageType } = props;
  const alertClass = classnames('alert', {
      'alert-info': (messageType===INFO),
      'alert-success': (messageType===SUCCESS),
      'alert-warning': (messageType===WARNING),
      'alert-danger': (messageType===ERROR),
      'alert-primary': (messageType===PRIMARY),
      'alert-secondary': (messageType===SECONDARY),
      'alert-light': (messageType===LIGHT),
      'alert-dark': (messageType===DARK)
  });
  return (
    <div className={alertClass} id={alertClass} role="alert">
      {message}
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  messageType: PropTypes.string.isRequired
};

Alert.defaultProps = {
    message: "Please pass the 'message' & 'messageType' props!",
    messageType: INFO
}

export default Alert;
