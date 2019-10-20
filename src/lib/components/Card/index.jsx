import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Card.scss";
class Card extends Component {
  render() {
    return <div className="card">{this.props.children}</div>;
  }
}
Card.propTypes = {
  children: PropTypes.node
};

export default Card;
