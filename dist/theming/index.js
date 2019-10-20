import { useLayoutEffect, useState } from "react";
import * as _ from "lodash";
import "destyle.css/destyle.css";
import "./theming.scss";
function jsToCssVariable(key, value) {
  if (typeof value === "object") {
    for (const innerKey in value) {
      jsToCssVariable(`${key}-${innerKey}`, value[innerKey]);
    }
  } else {
    return document.documentElement.style.setProperty(`--${key}`, value);
  }
}

export const mergeThemes = (theme1, theme2) => {
  return Object.assign({}, _.defaultsDeep({}, theme1, theme2));
};

export const Theming = () => {
  const themes = {};
  const [theme, setTheme] = useState("light");

  const installTheme = (name, theme) => {
    themes[name] = theme;
  };

  useLayoutEffect(() => {
    const _theme = themes[theme];
    for (const key in _theme) {
      jsToCssVariable(key, _theme[key]);
    }
  });
  return { installTheme, theme, setTheme };
};

export default Theming;