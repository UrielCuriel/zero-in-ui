import * as React from "react";
import { TableSource, TableSettings, Column, Action } from "./source";
import * as classnames from "classnames";
import TableHeader from "./components/header";
import TableRow from "./components/row";
import { fieldSorter } from "../../Utils";
import "./Table.scss";
import TableActions from "./components/actions";
import TableEditor from "./components/editor";
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
  new?: boolean;
  onNew?(data: T | T[]): any;
  edit?: boolean;
  onEdit?(data: T | T[]): any;
  itemEdit?: T;
};

class Table<T> extends React.Component<TableProps<T>, TableState<T>> {
  constructor(props: TableProps<T>) {
    super(props);
    this.state = { ...props, orderBy: props.settings.orderBy, new: false };
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
  componentWillReceiveProps(props) {
    this.setState(state => ({ ...props, orderBy: props.settings.orderBy }));
    if (props.settings.orderBy) {
      this.orderSource(props.settings.orderBy);
    }
  }

  getColumnsSize() {
    return Object.values<Column<T, keyof T>>(this.state.settings.columns)
      .map(c => c.width || "1fr")
      .reduce((a, b) => `${a} ${b}`);
  }
  tableAction(action: Action<T>) {
    switch (action.name) {
      case "add":
        this.setState(state => ({ ...state, new: true, onNew: action.action }));

        break;

      default:
        break;
    }
  }
  rowAction(action: Action<T>, item: T) {
    switch (action.name) {
      case "edit":
        this.setState(state => ({
          ...state,
          edit: true,
          onEdit: action.action,
          itemEdit: item
        }));

        break;

      default:
        break;
    }
  }
  newItem(item) {
    this.setState(state => ({ ...state, new: false }));
    this.state.onNew && this.state.onNew(item);
  }
  onEdit(item) {
    this.setState(state => ({
      ...state,
      edit: false,
      onEdit: null,
      itemEdit: null
    }));
    this.state.onEdit && this.state.onEdit(item);
  }
  render() {
    const tableClassName = classnames({ table: true });
    return (
      <React.Fragment>
        <TableActions
          settings={this.state.settings}
          onClick={action => this.tableAction(action)}
        ></TableActions>
        <div
          id={this.props.id}
          className={`${tableClassName} ${this.props.className}`}
          style={{
            gridTemplateColumns: `auto  ${this.getColumnsSize()}`
          }}
        >
          <TableHeader
            settings={this.state.settings}
            onOrder={fields => this.orderSource.bind(this)(fields)}
          ></TableHeader>
          {this.state.new ? (
            <TableEditor
              key="new"
              settings={this.state.settings}
              item={{} as T}
              onCancel={() =>
                this.setState(state => ({ ...state, new: false }))
              }
              onSuccess={data => this.newItem(data)}
            ></TableEditor>
          ) : (
            <React.Fragment></React.Fragment>
          )}
          <React.Fragment>
            {this.state.source.map((item, i) =>
              !this.state.itemEdit ||
              item[this.state.settings.key] !==
                this.state.itemEdit[this.state.settings.key] ? (
                <TableRow
                  key={String(item[this.state.settings.key])}
                  settings={this.state.settings}
                  item={item}
                  onAction={(action, item) => this.rowAction(action, item)}
                ></TableRow>
              ) : (
                <TableEditor
                  key={String(item[this.state.settings.key])}
                  settings={this.state.settings}
                  item={item}
                  onCancel={() =>
                    this.setState(state => ({
                      ...state,
                      edit: false,
                      onEdit: null,
                      itemEdit: null
                    }))
                  }
                  onSuccess={data => this.onEdit(data)}
                ></TableEditor>
              )
            )}
          </React.Fragment>
        </div>
      </React.Fragment>
    );
  }
}

export default Table;
