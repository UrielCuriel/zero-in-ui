import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Input.scss";
import classnames from "classnames";
export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focussed: props.locked && props.focussed || false,
      locked: props.locked || false,
      required: props.required || false,
      value: props.value || "",
      error: props.error || "",
      label: props.label || "",
      type: props.type || ""
    };
  }

  onChange(event) {
    const { id } = this.props;
    const value = event.target.value;
    this.setState({ value, error: "" });
    return this.props.onChange(id, value);
  }

  render() {
    // const fieldClassName = `field ${(this.locked ? this.focussed : this.focussed || this.value) && 'focussed'} ${this.locked && !this.focussed && 'locked'}`;
    const fieldClassName = classnames({
      field: true,
      focussed: this.state.locked ? this.state.focussed : this.state.focussed || this.state.value,
      locked: this.state.locked
    });
    return React.createElement(
      "div",
      { className: fieldClassName },
      React.createElement("input", {
        id: this.state.id,
        type: this.state.type,
        value: this.state.value,
        placeholder: this.state.label,
        onChange: this.onChange,
        onFocus: () => !this.state.locked && this.setState({ focussed: true }),
        onBlur: () => !this.state.locked && this.setState({ focussed: false }),
        required: this.state.required,
        disabled: this.state.locked
      }),
      React.createElement(
        "label",
        { htmlFor: this.state.id, className: this.state.error && "error" },
        this.state.error || this.state.label
      )
    );
  }
}
Input.propTypes = {
  id: PropTypes.string.isRequired,
  locked: PropTypes.bool,
  focussed: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool
};
Input.defaultProps = {
  locked: false,
  focussed: false,
  value: "",
  error: "",
  label: "",
  onChange: () => ""
};