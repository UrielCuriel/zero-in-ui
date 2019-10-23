import * as React from "react";
import { TableSettings, Action } from "../source";
import { Button } from "../../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface TableActionsProps<T> {
  settings: TableSettings<T>;
  onClick?(action: Action<T>): any;
}

export interface TableActionsState<T> {
  actions: Action<T>[];
}

class TableActions<T> extends React.Component<
  TableActionsProps<T>,
  TableActionsState<T>
> {
  constructor(props: TableActionsProps<T>) {
    super(props);
    this.state = {
      actions: props.settings.actions.filter(a => a.type === "table")
    };
  }
  render() {
    return (
      <div className="table-actions">
        {this.state.actions.map(action => (
          <Button
            key={`action-${action.name}`}
            iconOnly={!action.title}
            button={{ onClick: () => this.props.onClick(action) }}
          >
            <FontAwesomeIcon icon={action.icon}></FontAwesomeIcon>{" "}
            {action.title}
          </Button>
        ))}
      </div>
    );
  }
}

export default TableActions;
