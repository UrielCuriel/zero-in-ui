import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { string } from "prop-types";

type ActionReserve = "add" | "edit" | "selectionMultiple" | "delete" ;
export type Action<T> = {
  name: ActionReserve & string;
  type: "table" | "row";
  icon?: IconProp;
  title?: string;
  action(data: T | T[]): any;
};

export type TableSettings<T> = {
  actions?: Action<T>[];
  key: keyof T;
  orderBy?: Array<string>;
  columns: {
    [K in keyof T]?: Column<T, K>;
  };
};
export type Column<T, K extends keyof T> = {
  title: string;
  class?: string;
  width?: string;
  type?: "text" | "textarea" | "list" | "checkbox";
  editable?: boolean;
  format?: "date" | "currency";
  formatOptions?: Intl.DateTimeFormatOptions | Intl.NumberFormatOptions;
  align?: "center" | "left" | "right";
  renderComponent?: any;
  editor?: Editor ;
  filer?: Editor;
  sort?: boolean;
  sortObject?: string;
  filterFunction?(cell: T[K], search: string): any;
  valuePrepareFunction?(cell?: T[K], row?: T): string;
};
type Editor = {
  type: "text" | "textarea" | "list" | "checkbox";
  config?: {
    true?: string;
    false?: string;
    list?: {
      value: any;
      title: string;
    }[];
    completer?: boolean;
  };
};

export type TableSource<T> = Array<T>;
