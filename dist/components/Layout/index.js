import React, { Component } from "react";
import "./layout.scss";

import PropTypes from "prop-types";

export class Layout extends Component {

  getAreas(areas) {
    return areas.length > 1 ? areas.reduce((a, b, i) => i > 1 ? `${a} "${b}"` : `"${a}" "${b}"`) : `"${areas[0]}"`;
  }

  render() {
    return React.createElement(
      "div",
      {
        className: "layout",
        style: {
          gridTemplateAreas: this.getAreas(this.props.areas),
          gridAutoFlow: this.props.direction,
          gridTemplateColumns: this.props.columns,
          gridTemplateRows: this.props.rows
        }
      },
      this.props.children
    );
  }
}
Layout.propTypes = {
  areas: PropTypes.array,
  direction: PropTypes.oneOf(["columns", "rows"]),
  columns: PropTypes.string,
  rows: PropTypes.string,
  children: PropTypes.node.isRequired
};

export class Area extends Component {
  render() {
    return React.createElement(
      "div",
      { style: { gridArea: this.props.area }, className: this.props.area + '-area' },
      this.props.children
    );
  }
}

Area.propTypes = {
  area: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};