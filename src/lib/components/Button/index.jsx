import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classnames from "classnames";
import "./Button.scss";
export class Button extends Component {
 constructor(props){
   super(props);
   this.state={}
 }
  render() {
    const classNames = classnames({
      button: true,
      "icon-only": this.props.icononly
    });
    if (this.props.to) {
      return (
        <Link {...this.props} className={classNames}>
          {this.props.children}
        </Link>
      );
    }
    return (
      <button {...this.props} className={classNames}>
        {this.props.children}
      </button>
    );
  }
}
Button.propTypes = {
  to: PropTypes.string,
  icononly: PropTypes.bool,
  children: PropTypes.node
};
Button.defaultProps={
    icononly:false
}
