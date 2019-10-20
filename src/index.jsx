import React from "react";
import ReactDOM from "react-dom";
import { Theming } from "./lib/theming";
import { light, dark } from "./lib/theming/themes";
import { Layout, Area } from "./lib/components/Layout";
import { Sidebar } from "./lib/components/Sidebar";
import { TopBar } from "./lib/components/Topbar";
import { MENU_ITEMS } from "./menu";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "./lib/components/Button";
import Home from "./pages/Home";
import Components from "./pages/Components";
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
              <Button>
                Buy me a coffee
              </Button>
              <Button icononly={true} onClick={() => toggleTheme()}>
                <FontAwesomeIcon
                  icon={_theming.theme === "light" ? "moon" : "sun"}
                ></FontAwesomeIcon>
              </Button>
            </Area>
          </TopBar>
        </Area>
        <Area area="sidebar">
          <Sidebar items={MENU_ITEMS} title="Focus UI"></Sidebar>
        </Area>
        <Area area="content">
          <Switch>
            <Route path="/components">
              <Components/>
            </Route>
            <Route path="/layout">
              
            </Route>
            <Route path="/sidebar">
              <div>Sidebar</div>
            </Route>
            <Route path="/">
              <Home></Home>
            </Route>
          </Switch>
        </Area>
        <Area area="footer">
          <p></p>
        </Area>
      </Layout>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
