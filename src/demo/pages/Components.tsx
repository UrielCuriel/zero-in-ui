import React from "react";
import { Card } from "../../lib/src/components/Card";
import { Area } from "../../lib/src/components/Layout";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Forms from "./Forms";
import { TablePage } from "./Table";
const Components = () => {
  let match = useRouteMatch();
  return (
    <Card>
      <Area area="card-header">
        <h1>Components</h1>
      </Area>
      <Area area="card-body">
        <Switch>
          <Route path={`${match && match.path}/forms`}>
            <Forms />
          </Route>
          <Route path={`${match && match.path}/table`}>
            <TablePage></TablePage>
          </Route>
          <Route path={`${match && match.path}`}>
            <h3>Components</h3>
          </Route>
        </Switch>
      </Area>
    </Card>
  );
};
export default Components;
