import * as React from "react";
import { Component } from "react";
import "./layout.scss";
type LayoutProps = {
  areas?: string[];
  direction?: "columns" | "rows";
  columns?: string;

  rows?: string;
  id?: string;
  className?: string;
};
export class Layout extends Component<LayoutProps, {}> {
  getAreas(areas: string[]) {
    return areas.length > 1
      ? areas.reduce((a, b, i) => (i > 1 ? `${a} "${b}"` : `"${a}" "${b}"`))
      : `"${areas[0]}"`;
  }
  render() {
    return (
      <div
        id={this.props.id}
        className={`layout ${this.props.className || ""}`}
        style={{
          gridTemplateAreas: this.props.areas
            ? this.getAreas(this.props.areas)
            : "",
          gridAutoFlow: this.props.direction,
          gridTemplateColumns: this.props.columns,
          gridTemplateRows: this.props.rows
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
type AreaProps = {
  area: string;
  id?: string;
  className?: string;
};
export class Area extends Component<AreaProps, {}> {
  render() {
    return (
      <div
        id={this.props.id}
        style={{ gridArea: this.props.area }}
        className={`${this.props.area + "-area"} ${this.props.className || ""}`}
      >
        {this.props.children}
      </div>
    );
  }
}
