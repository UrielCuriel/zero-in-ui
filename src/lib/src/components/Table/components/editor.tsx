import * as React from "react";
import { TableSettings, Column } from "../source";
import Checkbox from "../../Forms/Checkbox";
import Input from "../../Forms/Input";
import Select, { SelectOption } from "../../Forms/Select";
import { Button } from "../../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDeepObjectValue } from "../../../Utils";

export interface TableEditorProps<T> {
  settings: TableSettings<T>;
  item?: T;
  onCancel?(): any;
  onSuccess?(data: T): any;
}

export interface TableEditorState<T> {
  item: T;
  columns: [string, Column<T, keyof T>][];
}

class TableEditor<T> extends React.Component<
  TableEditorProps<T>,
  TableEditorState<T>
> {
  constructor(props: TableEditorProps<T>) {
    super(props);
    this.state = {
      item: props.item || ({} as T),
      columns: Object.entries(props.settings.columns)
    };
  }
  setValue(key, value) {
    this.setState(state => ({ item: { ...state.item, [key]: value } }));
  }
  getEditor(key, col: Column<T, keyof T>): React.ReactNode {
    const value = col.valuePrepareFunction && getDeepObjectValue(key, this.state.item)
      ? col.valuePrepareFunction(getDeepObjectValue(key, this.state.item))
      : getDeepObjectValue(key, this.state.item);
    console.log(value)
    switch ((col.editor && col.editor.type) || "text") {
      case "checkbox":
        return <Checkbox checked={value} onChange={value => this.setValue(key, value)} />;
      case "list":
        return (
          <Select
            value={value}
            onSelect={value => this.setValue(key, value)}
            serchable={col.editor.config.completer}
          >
            {col.editor.config.list.map(option => (
              <SelectOption value={option.value}>{option.title}</SelectOption>
            ))}
          </Select>
        );
      case "text":
        return (
          <Input
            id={key}
            value={value}
            onChange={(key, value) => this.setValue(key, value)}
            label={key}
            hideLabel
          />
        );
      default:
        return (
          <Input
            id={key}
            value={value}
            onChange={(key, value) => this.setValue(key, value)}
            label={key}
            hideLabel
          />
        );
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="columns column-actions">
          <Button iconOnly button={{ onClick: () => this.props.onCancel() }}>
            <FontAwesomeIcon icon="times" />
          </Button>
          <Button
            iconOnly
            button={{ onClick: () => this.props.onSuccess(this.state.item) }}
          >
            <FontAwesomeIcon icon="save" />
          </Button>
        </div>
        {this.state.columns.map(([key, col]) => (
          <div
            key={`edit-${key}`}
            className="column"
            style={{ justifyContent: col.align || "left" }}
          >
            {this.getEditor(key, col)}
          </div>
        ))}{" "}
      </React.Fragment>
    );
  }
}

export default TableEditor;
