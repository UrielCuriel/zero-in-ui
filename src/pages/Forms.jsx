import React from "react";
import Card from "../lib/components/Card";
import { Area } from "../lib/components/Layout";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Input from "../lib/components/Forms/Input";
import Select, { SelectOption } from "../lib/components/Forms/Select";
const Forms = () => {
  let match = useRouteMatch();
  return (
    <Card>
      <Area area="card-header">
        <h1>Forms</h1>
      </Area>
      <Area area="card-body">
        <Switch>
          <Route path={`${match.path}/input`}>
            <InputPage />
          </Route>
          <Route path={match.path}>
            <h3>Forms</h3>
          </Route>
        </Switch>
      </Area>
    </Card>
  );
};

const InputPage = () => {
  return (
    <>
      <h1>Inputs</h1>
      <Input id={"input"} label="Field label" locked={true} active={false} />
      <Select value={1} onSelect={value => console.log(value)} placeholder="Select">
        <SelectOption value={1}>Option 1</SelectOption>
        <SelectOption value={2}>Option 2</SelectOption>
        <SelectOption value={3}>Option 3</SelectOption>
      </Select>
    </>
  );
};

export default Forms;
