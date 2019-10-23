import * as React from "react";
import {  TableSettings, Column } from "../source";
import { getDeepObjectValue } from "../../../Utils";

export type TableRowProps<T> = {
  item: T;
  settings: TableSettings<T>;
};

export type TableRowState<T> = {
  item: T;
  columns: [string, Column<T, keyof T>][];
  settings: TableSettings<T>;
};

class TableRow<T> extends React.Component<TableRowProps<T>, TableRowState<T>> {
  constructor(props: TableRowProps<T>) {
    super(props);
    this.state = { ...props, columns: Object.entries(props.settings.columns) };
  }
  render() {
    return this.state.columns.map(([key, col]) => (
      <div className="column" style={{justifyContent:col.align||'left'}}>
        {col.valuePrepareFunction?col.valuePrepareFunction(getDeepObjectValue(key,this.state.item)) : getDeepObjectValue(key,this.state.item)}
      </div>
    ));
  }
}

export default TableRow;
