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
    this.state = {};
    this.state.open = this.props.open || false;
    this.state.childrenLength = (this.props.children || []).length;
    this.state.path = this.props.parentPath
      ? `${this.props.parentPath}/${this.props.path}`
      : `/${this.props.path}`;
    this.nestedChildOpen = this.nestedChildOpen.bind(this);
  }
  toggleItem() {
    this.setState(state => {
      if (this.props.nestedChildOpen) {
        this.props.nestedChildOpen(!state.open ? state.childrenLength : 0);
      }
      return {
        open: !state.open,
        height: `${40 + (!state.open ? state.childrenLength * 40 : 0)}px`
      };
    });
  }
  nestedChildOpen(childrenLength) {
    this.setState(state => ({
      childrenLength: state.childrenLength + childrenLength,
      height: `${40 +
        (state.open ? (state.childrenLength + childrenLength) * 40 : 0)}px`
    }));
  }
  render() {
    if (!this.props.children) {
      return (
        <NavLink
          activeClassName="active"
          exact
          className="sidebarItemLink"
          to={this.state.path}
        >
          {this.props.icon ? (
            <FontAwesomeIcon
              className="icon-start"
              icon={this.props.icon}
            ></FontAwesomeIcon>
          ) : (
            <></>
          )}
          <span className="title">{this.props.title}</span>
        </NavLink>
      );
    } else {
      const classNames = classnames({
        sidebarItem: true,
        open: this.state.open
      });
      return (
        <div
          className={classNames}
          style={{
            height: this.state.height
          }}
        >
          <div className="sidebarItemLink" onClick={() => this.toggleItem()}>
            {this.props.icon ? (
              <FontAwesomeIcon
                className="icon-start"
                icon={this.props.icon}
              ></FontAwesomeIcon>
            ) : (
              <></>
            )}
            <span className="title">{this.props.title}</span>
            <FontAwesomeIcon
              className="icon-end"
              icon="chevron-right"
            ></FontAwesomeIcon>
          </div>
          <div className="sidebarItemChildren">
            {this.props.children.map((child, i) => (
              <SidebarItem
                key={child.title + i}
                {...child}
                parentPath={this.state.path}
                nestedChildOpen={this.nestedChildOpen}
              ></SidebarItem>
            ))}
          </div>
        </div>
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
  open: PropTypes.bool,
  nestedChildOpen: PropTypes.func
};

export class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.ref = React.createRef();
  }
  componentDidMount() {}
  togleClass() {
    this.setState({
      class:
        window.getComputedStyle(this.ref.current).width === "45px"
          ? "max"
          : "min"
    });
  }

  render() {
    const classes = classnames({
      sidebar: true,
      min: this.state.class === "min",
      max: this.state.class === "max"
    });
    return (
      <div ref={this.ref} className={classes}>
        {
          <TopBar>
            <Area area="topbar-start">
              <Button icononly onClick={() => this.togleClass()}>
                <FontAwesomeIcon icon="bars"></FontAwesomeIcon>
              </Button>
            </Area>
            <Area area="topbar-center">
              <h1>{this.props.title}</h1>
            </Area>
          </TopBar>
        }
        {this.props.items.map((item, i) => (
          <SidebarItem key={item.title + i} {...item}></SidebarItem>
        ))}
        {this.props.children}
      </div>
    );
  }
}
Sidebar.propTypes = {
  items: PropTypes.array,
  title: PropTypes.string,
  children: PropTypes.node
};
