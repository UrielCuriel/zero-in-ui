import * as React from "react";
import * as ReactDOM from "react-dom";
import { MENU_ITEMS } from "./menu";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Home from "./pages/Home";
import Components from "./pages/Components";
import { Layout, Area } from "../lib/src/components/Layout";
import { TopBar } from "../lib/src/components/Topbar";
import { Button } from "../lib/src/components/Button";
import { Sidebar } from "../lib/src/components/Sidebar";
import { light, dark } from "../lib/src/theming/themes";
import { Theming } from "../lib/src/theming";
library.add(fas, fab);
const App = () => {
  const _theming = Theming();
  _theming.installTheme("light", light);
  _theming.installTheme("dark", dark);
  const toggleTheme = () => {
    const theme = _theming.theme === "light" ? "dark" : "light";
    _theming.setTheme(theme);
  };
  return (
    <Router>
      <Layout
        areas={["sidebar header", "sidebar content", "sidebar footer"]}
        columns="auto 1fr"
        rows="auto 1fr auto"
      >
        <Area area="header">
          <TopBar>
            <Area area="topbar-end">
              <Button>Buy me a coffee</Button>
              <Button iconOnly button={{ onClick: () => toggleTheme() }}>
                <FontAwesomeIcon
                  icon={_theming.theme === "light" ? "moon" : "sun"}
                />
              </Button>
            </Area>
          </TopBar>
        </Area>
        <Area area="sidebar">
          <Sidebar items={MENU_ITEMS} title="Focus UI" />
        </Area>
        <Area area="content">
          <Switch>
            <Route path="/components">
              <Components />
            </Route>
            <Route path="/layout" />
            <Route path="/sidebar">
              <div>Sidebar</div>
            </Route>
            <Route path="/layout" />

            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Area>
        <Area area="footer">
          <p />
        </Area>
      </Layout>
    </Router>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
