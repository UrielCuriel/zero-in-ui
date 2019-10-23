import * as React from "react";
import { TableSettings, Column } from "../source";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.scss";
export type TableHeaderProps<T> = {
  settings: TableSettings<T>;
  onOrder?(fields: string[]): any;
};

export type TableHeaderState<T> = {
  settings: TableSettings<T>;
  columns: [string, Column<T, any>][];
  orderBy: Array<string>;
};

class TableHeader<T> extends React.Component<
  TableHeaderProps<T>,
  TableHeaderState<T>
> {
  constructor(props: TableHeaderProps<T>) {
    super(props);
    this.state = {
      ...props,
      orderBy: props.settings.orderBy || [],
      columns: Object.entries(props.settings.columns)
    };
  }
  orderBy(key: string) {
    console.log(key);
    this.setState(state => {
      let orders = state.orderBy;
      let orderKey = orders.find(o => o && o.includes(key));
      orderKey = !orderKey || orderKey.startsWith("-") ? key : `-${orderKey}`;
      this.props.onOrder && this.props.onOrder(state.orderBy);
      console.log(orderKey);
      orders = orders.filter(o => o && !o.includes(key));
      orders.push(orderKey);
      return { ...state, orderBy: orders };
    });
  }
  removeOrder(key: string) {
    this.setState(state => {
      const orderBy = state.orderBy.filter(o => !o.includes(key));

      return { ...state, orderBy };
    });
  }
  getOrder(key): React.ReactElement {
    let orderKey = this.state.orderBy.find(o => o.includes(key));
    console.log(orderKey);
    const icon = orderKey
      ? orderKey.startsWith("-")
        ? "chevron-down"
        : "chevron-up"
      : null;
    return icon ? (
      <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
    ) : (
      <React.Fragment />
    );
  }
  render() {
    return (
      <React.Fragment>
        {this.state.columns.map(([k, v]) => (
          <div
            className="header"
            onClick={() => this.orderBy(v.sortObject || k)}
            onDoubleClick={() => this.removeOrder(v.sortObject || k)}
            style={{
              pointerEvents:
                typeof v.sort !== "boolean" || v.sort ? "auto" : "none"
            }}
          >
            {v.title} {this.getOrder(k)}
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default TableHeader;
