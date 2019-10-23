import * as React from "react";
import { TableSettings, Column, Action } from "../source";
import { getDeepObjectValue } from "../../../Utils";
import { Button } from "../../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Checkbox from "../../Forms/Checkbox";
import Select, { SelectOption } from "../../Forms/Select";

export type TableRowProps<T> = {
  item: T;
  onAction?(action: Action<T>, data: T);
  settings: TableSettings<T>;
};

export type TableRowState<T> = {
  item: T;
  columns: [string, Column<T, keyof T>][];
  settings: TableSettings<T>;
};

class TableRow<T> extends React.Component<TableRowProps<T>, TableRowState<T>> {
  format(
    value: any,
    format?: "date" | "currency",
    options?: Intl.DateTimeFormatOptions | Intl.NumberFormatOptions
  ): any {
    const userLang = navigator.language || "en-US";
    switch (format) {
      case "date":
        value = value instanceof Date ? value : new Date(value);
        options = options || Intl.DateTimeFormat().resolvedOptions();
        return new Intl.DateTimeFormat(userLang.split("-"), options).format(
          value
        );
      case "currency":
        value = typeof value === "number" ? value : Number(value);
        options = options || {
          currency: "MXN",
          currencyDisplay: "symbol",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
          style: "currency"
        };
        return new Intl.NumberFormat("es-MX", options).format(value);
      default:
        return value;
    }
  }
  constructor(props: TableRowProps<T>) {
    super(props);
    this.state = { ...props, columns: Object.entries(props.settings.columns) };
  }

  getRender(key, col: Column<T, keyof T>) {
    const value = col.format
      ? this.format(
          col.valuePrepareFunction
            ? col.valuePrepareFunction(getDeepObjectValue(key, this.state.item))
            : getDeepObjectValue(key, this.state.item),
          col.format,
          col.formatOptions
        )
      : col.valuePrepareFunction
      ? col.valuePrepareFunction(getDeepObjectValue(key, this.state.item))
      : getDeepObjectValue(key, this.state.item);
    switch (col.type || "text") {
      case "text":
        return <span>{value}</span>;
      case "checkbox":
        return <Checkbox checked={value} locked={true} />;
      case "list":
        return (
          <Select value={value} locked={true}>
            {col.editor.config.list.map(option => (
              <SelectOption value={option.value}>{option.title}</SelectOption>
            ))}
          </Select>
        );
      default:
        return <React.Fragment>{value}</React.Fragment>;
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="column column-actions">
          {this.state.settings.actions
            .filter(a => a.type === "row")
            .map(action => (
              <Button
                key={`action-${action.name}`}
                iconOnly={!action.title}
                button={{
                  onClick: () => this.props.onAction(action, this.state.item)
                }}
              >
                <FontAwesomeIcon icon={action.icon}></FontAwesomeIcon>{" "}
                {action.title}
              </Button>
            ))}
        </div>
        {this.state.columns.map(([key, col]) => (
          <div
            className="column"
            key={`view-${key}-${getDeepObjectValue(key, this.state.item)}`}
            style={{ justifyContent: col.align || "left" }}
          >
            {this.getRender(key, col)}
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default TableRow;
