import React from "react";
import { Card } from "../../lib/src/components/Card";
import { Area } from "../../lib/src/components/Layout";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Input from "../../lib/src/components/Forms/Input";
import Select, { SelectOption } from "../../lib/src/components/Forms/Select";
import Checkbox from "../../lib/src/components/Forms/Checkbox";
const Forms = () => {
  let match = useRouteMatch();
  return (
    <Card>
      <Area area="card-header">
        <h1>Forms</h1>
      </Area>
      <Area area="card-body">
        <Switch>
          <Route path={`${match && match.path}/input`}>
            <InputPage />
          </Route>
          <Route path={`${match && match.path}`}>
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
      <Input id={"input"} label="Field label" />
      <Input id={"input"} label="Field label" hideLabel/>
      <Select
        value={1}
        onSelect={value => console.log(value)}
        placeholder="Select"
      >
        <SelectOption value={1} locked>Option 1</SelectOption>
        <SelectOption value={2}>Option 2</SelectOption>
        <SelectOption value={3}>Option 3</SelectOption>
        <SelectOption value="1">option 1</SelectOption>
        <SelectOption value="2">option 2</SelectOption>
        <SelectOption value="3" locked>option 3</SelectOption>
        <SelectOption value="4">option 4</SelectOption>
        <SelectOption value="5">option 5</SelectOption>
      </Select>
      <Checkbox
        onChange={value => console.log(value)}
        label="checkbox"
      ></Checkbox>
      <Select
        value={1}
        onSelect={value => console.log(value)}
        placeholder="Select"
        serchable
        key={'select-serchable'}
      >
        <SelectOption value={1}>Option 1</SelectOption>
        <SelectOption value={2}>Option 2</SelectOption>
        <SelectOption value={3}>Option 3</SelectOption>
        <SelectOption value="1">option 1</SelectOption>
        <SelectOption value="2">option 2</SelectOption>
        <SelectOption value="3">option 3</SelectOption>
        <SelectOption value="4">option 4</SelectOption>
        <SelectOption value="5">option 5</SelectOption>
      </Select>
     
    </>
  );
};
export default Forms;
