import * as React from "react";
import { TableSource, TableSettings, Column } from "./source";
import * as classnames from "classnames";
import TableHeader from "./components/header";
import TableRow from "./components/row";
import { fieldSorter } from "../../Utils";
import "./Table.scss";
export type TableProps<T> = {
  source: TableSource<T>;
  settings: TableSettings<T>;
} & DefaultTableProps;

type DefaultTableProps = {
  id?: string;
  className?: string;
};

export type TableState<T> = {
  source: TableSource<T>;
  settings: TableSettings<T>;
  orderBy: string[];
};

class Table<T> extends React.Component<TableProps<T>, TableState<T>> {
  constructor(props: TableProps<T>) {
    super(props);
    this.state = { ...props, orderBy: props.settings.orderBy };
    if (props.settings.orderBy) {
      this.orderSource(props.settings.orderBy);
    }
  }
  static defaultProps: DefaultTableProps = {
    className: "",
    id: ""
  };
  orderSource(fields: string[]) {
    this.setState(state => {
      let source = [];
      state.source.sort(fieldSorter(fields)).forEach(item => {
        source.push(item);
      });
      source = source.slice();
      return { settings: state.settings, orderBy: fields, source };
    });
  }
  getColumnsSize(){
    return Object.values<Column<T,keyof T>>(this.state.settings.columns).map(c=>c.width||'1fr').reduce((a,b)=>`${a} ${b}`);
  }
  render() {
    const tableClassName = classnames({ table: true });
    return (
      <div
        id={this.props.id}
        className={`${tableClassName} ${this.props.className}`}
        style={{
          gridTemplateColumns:this.getColumnsSize()
        }}
      >
        <TableHeader
          settings={this.state.settings}
          onOrder={fields => this.orderSource.bind(this)(fields)}
        ></TableHeader>
        <React.Fragment>
          {this.state.source.map((item, i) => (
            <TableRow
              key={String(item[this.state.settings.key])}
              settings={this.state.settings}
              item={item}
            ></TableRow>
          ))}
        </React.Fragment>
      </div>
    );
  }
}

export default Table;
