import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Topbar.scss";
export class TopBar extends Component {
  render() {
    return React.createElement(
      "div",
      { className: "topbar" },
      this.props.children
    );
  }
}
TopBar.propTypes = {
  children: PropTypes.node
};