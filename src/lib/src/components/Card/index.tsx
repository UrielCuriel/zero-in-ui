import * as React from "react";
import{ Component } from "react";
import "./Card.scss";
type CardProps = {
  className?: any
};
export class Card extends Component<CardProps, {}> {
  render() {
    return (
      <div className={`card ${this.props.className || ""} `}>
        {this.props.children}
      </div>
    );
  }
}
