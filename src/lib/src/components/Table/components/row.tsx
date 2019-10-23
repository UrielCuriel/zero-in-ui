import * as React from "react";
import { TableSettings, Column } from "../source";
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
  render() {
    return this.state.columns.map(([key, col]) => (
      <div className="column" style={{ justifyContent: col.align || "left" }}>
        {col.format
          ? this.format(
              col.valuePrepareFunction
                ? col.valuePrepareFunction(
                    getDeepObjectValue(key, this.state.item)
                  )
                : getDeepObjectValue(key, this.state.item),
              col.format,
              col.formatOptions
            )
          : col.valuePrepareFunction
          ? col.valuePrepareFunction(getDeepObjectValue(key, this.state.item))
          : getDeepObjectValue(key, this.state.item)}
      </div>
    ));
  }
}

export default TableRow;
