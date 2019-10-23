import * as React from "react";
import classNames from "classnames";
import "./Select.scss";
type SelectOptionProps = {
  onSelect?: (...args: any[]) => any;
  value?: any;
  selected?: any;
  locked?: boolean;
  children: React.ReactNode;
};
export class SelectOption extends React.Component<SelectOptionProps, {}> {
  handleClick() {
    this.props.onSelect &&
      this.props.onSelect(this.props.value, this.props.children);
  }
  render() {
    const OptionClass = classNames({
      "select-option": true,
      "select-inner": true,
      selected: this.props.selected === this.props.value,
      locked: this.props.locked
    });
    return (
      <div
        key={this.props.value}
        className={OptionClass}
        onClick={() => this.handleClick()}
      >
        {this.props.children}
      </div>
    );
  }
}
type SelectBodyProps = {
  onSelect?: (...args: any[]) => any;
  selected?: any;
  style: React.CSSProperties;
  children?: React.ReactElement<SelectOptionProps>[];
};
class SelectBody extends React.Component<SelectBodyProps, {}> {
  componentWillUnmount() {}
  onSelect(...args: any[]) {
    this.props.onSelect && this.props.onSelect(...args);
  }
  render() {
    const children =
      this.props.children &&
      React.Children.map(this.props.children, child =>
        React.cloneElement(child, {
          selected: this.props.selected,
          onSelect: this.onSelect.bind(this)
        })
      );
    return (
      <div style={this.props.style} className="select-body">
        {children}
      </div>
    );
  }
}
type SelectProps = {
  value?: any;
  onSelect?: (...args: any[]) => any;
  placeholder?: string;
  serchable?: boolean;
  locked?: boolean;
  children: React.ReactElement<SelectOptionProps>[];
};
type SelectState = {
  open: boolean;
  children: React.ReactElement<SelectOptionProps>[];
  selected: {
    key: any;
    label: string | React.ReactElement;
    labelString: string;
  };
};
class Select extends React.Component<SelectProps, SelectState> {
  container: HTMLDivElement;
  constructor(props: SelectProps) {
    super(props);
    this.state = {
      open: false,
      children: props.children,
      selected: {
        label:
          props.children.find(c => c.props.value === props.value) ||
          props.placeholder,
        labelString: `${
          typeof props.children.find(c => c.props.value === props.value) !==
          "string"
            ? props.children
                .find(c => c.props.value === props.value)
                .props.children.toString()
            : ""
        }`,
        key: props.value
      }
    };

    this.openBody = this.openBody.bind(this);
  }
  openBody() {
    this.setState(state => ({ ...state, open: true }));
  }
  closeBody(event) {
    if (this.state.open && !event.target.classList.contains("select-inner")) {
      this.setState(state => ({ ...state, open: false }));
    }
  }
  componentDidMount() {
    document.addEventListener("click", this.closeBody.bind(this));
  }
  onSelect(key, label) {
    this.setState(state => ({
      ...state,
      selected: {
        key,
        label,
        labelString: `${
          typeof label !== "string" ? label.props.children.toString() : label
        }`
      },
      open: false
    }));
    this.props.onSelect && this.props.onSelect(key);
  }
  filterOptions(value: string) {
    this.setState(state => {
      let children;
      if (value) {
        children = state.children.filter(
          option =>
            String(option.props.value)
              .toLowerCase()
              .includes(value.toLowerCase()) ||
            option.props.children
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
        );
      } else {
        children = this.props.children;
      }
      return {
        ...state,
        selected: { ...state.selected, labelString: value },
        children
      };
    });
  }
  
  render() {
    return (
      <div
        className={`select-container ${this.props.locked ? "locked" : ""}`}
        onClick={this.openBody}
      >
        <div className="select select-inner">
          {this.props.serchable ? (
            <input
              className="select-inner"
              placeholder={this.props.placeholder}
              value={this.state.selected.labelString}
              onFocus={()=>this.openBody()}
              onChange={event => this.filterOptions(event.target.value)}
            />
          ) : (
            this.state.selected.label || this.props.placeholder
          )}
        </div>
        <SelectBody
          style={{
            height: `${this.state.open ? this.state.children.length * 30 : 0}px`
          }}
          selected={this.props.value}
          onSelect={(key, label) => this.onSelect(key, label)}
        >
          {this.state.children}
        </SelectBody>
      </div>
    );
  }
}
export default Select;
