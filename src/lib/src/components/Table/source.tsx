import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { string } from "prop-types";

export type TableSettings<T> = {
  actions?: {
    name: "add" | "edit" | "selectionMultiple" | string;
    type?: "table" | "row";
    icon?: IconProp;
    title?: string;
    action(data: T | T[]): any;
  }[];
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
  editable?: boolean;
  format?: "date" | "currency";
  formatOptions?: Intl.DateTimeFormatOptions | Intl.NumberFormatOptions;
  align?: "center" | "left" | "right";
  renderComponent?: any;
  editor?: Editor | false;
  filer?: Editor | false;
  sort?: boolean;
  sortObject?: string;
  filterFunction?(cell: T[K], search: string): any;
  valuePrepareFunction?(cell?: T[K], row?: T): any;
};
type Editor = {
  type: "text" | "textarea" | "completer" | "list" | "checkbox";
  config?: {
    true?: string;
    false?: string;
    list?: {
      value: any;
      title: string;
    }[];
    completer?: Completer;
  };
};
type Completer = {
  data?: any[];
  searchFields?: string;
  titleField?: string;
  descriptionField?: string;
};
export type TableSource<T> = Array<T>;
