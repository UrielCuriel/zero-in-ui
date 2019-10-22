import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./Checkbox.scss";
class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.checked = props.checked || false;
  }
  toogle() {
    this.setState(state => {
      this.props.onChange(!state.checked);
      return { checked: !state.checked };
    });
  }
  render() {
    const className = classNames({
      "checkbox-inner": true,
      checked: this.state.checked
    });
    return (
      <div className="checkbox-container" onClick={() => this.toogle()}>
        <div className={className}></div>
        {this.props.label}
      </div>
    );
  }
}
Checkbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string
};

export default Checkbox;
