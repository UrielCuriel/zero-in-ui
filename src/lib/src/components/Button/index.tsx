import * as React from "react";
import { Component } from "react";
import { Link, LinkProps } from "react-router-dom";
import classnames from "classnames";
import "./Button.scss";
type ButtonProps = {
  link?: LinkProps;
  button?: React.ButtonHTMLAttributes<any>;
  id?: string;
  className?: string;
} & ButtonDefaultProps;
type ButtonDefaultProps = {
  iconOnly: boolean;
};
export class Button extends Component<ButtonProps, {}> {
  static defaultProps: ButtonDefaultProps = {
    iconOnly: false
  };
  constructor(props: ButtonProps) {
    super(props);
    this.state = {};
  }
  render() {
    const classNames = classnames({
      button: true,
      "icon-only": this.props.iconOnly
    });
    if (this.props.link) {
      return (
        <Link
          id={this.props.id}
          {...this.props.link}
          className={`${classNames} ${this.props.className}`}
        >
          {this.props.children}
        </Link>
      );
    }
    return (
      <button className={classNames} {...this.props.button}>
        {this.props.children}
      </button>
    );
  }
}
