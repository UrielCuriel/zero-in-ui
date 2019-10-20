import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Topbar.scss";
export class TopBar extends Component {
  render() {
    return <div className="topbar">{this.props.children}</div>;
  }
}
TopBar.propTypes = {
  children: PropTypes.node
};
