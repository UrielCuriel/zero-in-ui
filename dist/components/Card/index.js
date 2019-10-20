import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Card.scss";
class Card extends Component {
  render() {
    return React.createElement(
      "div",
      { className: "card" },
      this.props.children
    );
  }
}
Card.propTypes = {
  children: PropTypes.node
};

export default Card;