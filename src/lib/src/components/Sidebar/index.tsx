import * as React from "react";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import "./Sidebar.scss";
import { TopBar } from "../Topbar";
import { Area } from "../Layout";
import { Button } from "../Button";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type MenuItem = {
  icon?: IconProp;
  title: string;
  path?: string;
  children?: MenuItem[];
};

type SidebarItemProps = {
  title?: string;
  icon?: IconProp;
  path?: string;
  parentPath?: string;
  open?: boolean;
  children?: MenuItem[];
  nestedChildOpen?: (...args: any[]) => any;
};

type SidebarItemState = {
  open: boolean;
  childrenLength: number;
  path: string;
  height?: string;
};
class SidebarItem extends Component<SidebarItemProps, SidebarItemState> {
  constructor(props: SidebarItemProps) {
    super(props);
    this.state = {
      open: this.props.open || false,
      childrenLength: (this.props.children || []).length,
      path: this.props.parentPath
        ? `${this.props.parentPath}/${this.props.path}`
        : `/${this.props.path}`
    };
    this.nestedChildOpen = this.nestedChildOpen.bind(this);
  }
  toggleItem() {
    this.setState(state => {
      if (this.props.nestedChildOpen) {
        this.props.nestedChildOpen(!state.open ? state.childrenLength : 0);
      }
      return {
        ...state,
        open: !state.open,
        height: `${40 + (!state.open ? state.childrenLength * 40 : 0)}px`
      };
    });
  }
  nestedChildOpen(childrenLength: number) {
    this.setState(state => ({
      childrenLength: state.childrenLength + childrenLength,
      height: `${40 +
        (state.open ? (state.childrenLength + childrenLength) * 40 : 0)}px`
    }));
  }
  render() {
    if (!this.props.children) {
      return (
        <div className="sidebarItemLink">
          <NavLink
            activeClassName="active"
            className="inner"
            exact
            to={this.state.path}
          >
            {this.props.icon ? (
              <FontAwesomeIcon
                className="icon-start"
                icon={this.props.icon}
              ></FontAwesomeIcon>
            ) : (
              <React.Fragment></React.Fragment>
            )}
            <span className="title">{this.props.title}</span>
          </NavLink>
        </div>
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
            <span className="inner">
              {this.props.icon ? (
                <FontAwesomeIcon
                  className="icon-start"
                  icon={this.props.icon}
                ></FontAwesomeIcon>
              ) : (
                <React.Fragment></React.Fragment>
              )}
              <span className="title">{this.props.title}</span>
              <FontAwesomeIcon
                className="icon-end"
                icon="chevron-right"
              ></FontAwesomeIcon>
            </span>
          </div>
          <div className="sidebarItemChildren">
            {this.props.children.map((child, i) => (
              <SidebarItem
                key={`${child.title}${i}`}
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
type SidebarProps = {
  items: any[];
  title?: string;
};
type SidebarState = {
  class: string;
};
export class Sidebar extends Component<SidebarProps, SidebarState> {
  ref: React.RefObject<HTMLDivElement>;
  constructor(props: SidebarProps) {
    super(props);
    this.state = {
      class: "max"
    };
    this.ref = React.createRef();
  }
  componentDidMount() {}
  togleClass() {
    this.setState({
      class:
        window.getComputedStyle(this.ref.current as Element).width === "50px"
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
              <Button iconOnly button={{ onClick: () => this.togleClass() }}>
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
