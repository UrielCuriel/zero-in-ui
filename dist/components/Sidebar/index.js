var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import "./Sidebar.scss";
import { TopBar } from "../Topbar";
import { Area } from "../Layout";
import { Button } from "../Button";
class SidebarItem extends Component {

  constructor(props) {
    super(props);
    this.state.open = this.props.open || false;
    this.state.path = this.props.parentPath ? `${this.props.parentPath}/${this.props.path}` : `/${this.props.path}`;
  }
  toggleItem() {
    this.setState({ open: !this.state.open });
  }
  getHeight() {
    return 40 + (this.state.open ? this.props.children.length * 40 : 0) + "px";
  }
  render() {
    if (!this.props.children) {
      return React.createElement(
        NavLink,
        {
          activeClassName: "active",
          exact: true,
          className: "sidebarItemLink",
          to: this.state.path
        },
        React.createElement(FontAwesomeIcon, {
          className: "icon-start",
          icon: this.props.icon
        }),
        " ",
        React.createElement(
          "span",
          { className: "title" },
          this.props.title
        )
      );
    } else {
      const classNames = classnames({
        sidebarItem: true,
        open: this.state.open
      });
      return React.createElement(
        "div",
        {
          className: classNames,
          onClick: () => this.toggleItem(),
          style: {
            height: this.getHeight()
          }
        },
        React.createElement(
          "div",
          { className: "sidebarItemLink" },
          React.createElement(FontAwesomeIcon, {
            className: "icon-start",
            icon: this.props.icon
          }),
          " ",
          React.createElement(
            "span",
            { className: "title" },
            this.props.title
          ),
          React.createElement(FontAwesomeIcon, {
            className: "icon-end",
            icon: "chevron-right"
          })
        ),
        React.createElement(
          "div",
          { className: "sidebarItemChildren" },
          this.props.children.map((child, i) => React.createElement(SidebarItem, _extends({
            key: child.title + i
          }, child, {
            parentPath: this.state.path
          })))
        )
      );
    }
  }
}
SidebarItem.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  path: PropTypes.string,
  children: PropTypes.array,
  parentPath: PropTypes.string,
  open: PropTypes.bool
};

export class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }
  componentDidMount() {}
  togleClass() {
    this.setState({ class: window.getComputedStyle(this.ref.current).width === '45px' ? "max" : "min" });
  }

  render() {
    const classes = classnames({
      sidebar: true,
      min: this.state.class === "min",
      max: this.state.class === "max"
    });
    return React.createElement(
      "div",
      { ref: this.ref, className: classes },
      React.createElement(
        TopBar,
        null,
        React.createElement(
          Area,
          { area: "topbar-start" },
          React.createElement(
            Button,
            { icononly: true, onClick: () => this.togleClass() },
            React.createElement(FontAwesomeIcon, { icon: "bars" })
          )
        ),
        React.createElement(
          Area,
          { area: "topbar-center" },
          React.createElement(
            "h1",
            null,
            this.props.title
          )
        )
      ),
      this.props.items.map((item, i) => React.createElement(SidebarItem, _extends({ key: item.title + i }, item))),
      this.props.children
    );
  }
}
Sidebar.propTypes = {
  items: PropTypes.array,
  title: PropTypes.string,
  children: PropTypes.node
};