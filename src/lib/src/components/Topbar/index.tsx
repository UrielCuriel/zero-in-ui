import * as React from "react";
import { Component } from "react";
import "./Topbar.scss";
export class TopBar extends Component<{}, {}> {
  render() {
    return <div className="topbar">{this.props.children}</div>;
  }
}
