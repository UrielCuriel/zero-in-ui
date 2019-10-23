import * as React from "react";
import classNames from "classnames";
import "./Checkbox.scss";
type CheckboxProps = {
  checked?: boolean;
  onChange?: (...args: any[]) => any;
  label?: string;
  locked?: boolean;
};
type CheckboxState = {
  checked: boolean;
  locked: boolean;
};
class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
  constructor(props: CheckboxProps) {
    super(props);
    this.state = {
      checked: props.checked || false,
      locked: props.locked || false
    };
  }
  toogle() {
    this.setState((state: CheckboxState) => {
      if (!this.props.locked) {
        this.props.onChange && this.props.onChange(!state.checked);
        return { ...state, checked: !state.checked };
      }
      return state;
    });
  }
  render() {
    const classNameInner = classNames({
      "checkbox-inner": true,
      checked: this.state.checked
    });
    const classNameContainer = classNames({
      "checkbox-container": true,
      locked: this.state.locked
    });
    return (
      <div className={classNameContainer} onClick={() => this.toogle()}>
        <div className={classNameInner}></div>
        {this.props.label}
      </div>
    );
  }
}
export default Checkbox;
