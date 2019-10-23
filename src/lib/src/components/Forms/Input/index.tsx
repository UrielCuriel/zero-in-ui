import * as React from "react";
import { Component } from "react";
import "./Input.scss";
import classnames from "classnames";
type InputProps = {
  id: string;
  locked?: boolean;
  focussed?: boolean;
  type?: string;
  value?: string | number;
  error?: string;
  label?: string;
  hideLabel?: boolean;
  onChange: (...args: any[]) => any;
  required?: boolean;
};
type InputState = {
  value: any;
  error: string | any;
  focussed: any;
  locked: any;
  required: any;
  label: any;
  id: string;
};
export default class Input extends Component<InputProps, InputState> {
  static defaultProps = {
    locked: false,
    focussed: false,
    value: "",
    error: "",
    label: "",
    hideLabel: false,
    onChange: () => ""
  };
  constructor(props: InputProps) {
    super(props);
    this.state = {
      focussed: (props.locked && props.focussed) || false,
      locked: props.locked || false,
      required: props.required || false,
      value: props.value || "",
      error: props.error || "",
      label: props.label || "",
      id: props.id || ""
    };
  }
  onChange(event: any) {
    const { id } = this.props;
    const value = event.target.value;
    this.setState({ value, error: "" });
    return this.props.onChange(id, value);
  }
  render() {
    // const fieldClassName = `field ${(this.locked ? this.focussed : this.focussed || this.value) && 'focussed'} ${this.locked && !this.focussed && 'locked'}`;
    const fieldClassName = classnames({
      field: true,
      focussed: this.state.locked
        ? this.state.focussed
        : this.state.focussed || this.state.value,
      locked: this.state.locked,
      hideLabel: this.props.hideLabel
    });
    return (
      <div className={fieldClassName}>
        <input
          id={this.state.id}
          type={this.props.type}
          value={this.state.value}
          placeholder={this.state.label}
          onChange={event => this.onChange(event)}
          onFocus={() =>
            !this.state.locked && this.setState({ focussed: true })
          }
          onBlur={() =>
            !this.state.locked && this.setState({ focussed: false })
          }
          required={this.state.required}
          disabled={this.state.locked}
        />
        <label htmlFor={this.state.id} className={this.state.error && "error"}>
          {this.state.error || this.state.label}
        </label>
      </div>
    );
  }
}
