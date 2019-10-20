var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classnames from "classnames";
import "./Button.scss";
export class Button extends Component {

  render() {
    const classNames = classnames({
      button: true,
      "icon-only": this.props.icononly
    });
    if (this.props.to) {
      return React.createElement(
        Link,
        _extends({}, this.props, { className: classNames }),
        this.props.children
      );
    }
    return React.createElement(
      "button",
      _extends({}, this.props, { className: classNames }),
      this.props.children
    );
  }
}
Button.propTypes = {
  to: PropTypes.string,
  icononly: PropTypes.bool,
  children: PropTypes.node
};
Button.defaultProps = {
  icononly: false
};