import { mergeThemes } from "..";
import base from "./base";

const light = mergeThemes(Object.assign({}, base), {
  color: {
    primary: "#2e333b",
    secondary: "#ab5e7a",
    highlight: "#ffc719",
    background: "#f3f3f3"
  },
  sidebar: {
    background: "#2e333b",
    color: "#ffffff"
  }
});

export default light;