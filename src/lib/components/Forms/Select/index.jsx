import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import classNames from "classnames";
import "./Select.scss";
export class SelectOption extends Component {
  handleClick() {
    this.props.onSelect(this.props.value);
  }
  render() {
    const OptionClass = classNames({
      "select-option": true,
      selected: this.props.selected === this.props.value
    });
    return (
      <div className={OptionClass} onClick={() => this.handleClick()}>
        {this.props.children}
      </div>
    );
  }
}
SelectOption.propTypes = {
  onSelect: PropTypes.func,
  value: PropTypes.any,
  selected: PropTypes.any,
  children: PropTypes.node
};

class SelectBody extends Component {
  componentWillUnmount() {
    document.body.removeChild(this.props.container);
  }
  onSelect(value) {
    this.props.onSelect(value);
      ReactDOM.unmountComponentAtNode(this.props.container);
  }
  removeBody(event) {
    if (!event.target.classList.contains('select-option'))
      ReactDOM.unmountComponentAtNode(this.props.container);
  }
  componentDidMount() {
    document.addEventListener("mousedown", this.removeBody.bind(this));
  }

  render() {
    const children = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        selected: this.props.selected,
        onSelect: this.onSelect.bind(this)
      })
    );
    return <>{children}</>;
  }
}

SelectBody.propTypes = {
  onSelect: PropTypes.func,
  selected: PropTypes.any,
  container: PropTypes.element,
  children: PropTypes.arrayOf(PropTypes.node)
};

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderBody = this.renderBody.bind(this);
  }
  renderBody() {
    this.container = document.createElement("div");
    this.container.classList.add("select-body");
    ReactDOM.render(
      <SelectBody
        container={this.container}
        selected={this.props.value}
        onSelect={this.props.onSelect}
      >
        {this.props.children}
      </SelectBody>,
      document.body.appendChild(this.container)
    );
  }

  render() {
    return (
      <div className="select" onClick={() => this.renderBody()}>
        {this.props.placeholder}
      </div>
    );
  }
}
Select.propTypes = {
  value: PropTypes.any,
  onSelect: PropTypes.func,
  placeholder: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node)
};

export default Select;
