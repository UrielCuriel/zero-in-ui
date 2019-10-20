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
  },
  card: {
    background: "#ffffff"
  },
  forms: {
    background: "#f9f9f9",
    "background-hover": "#f4f4f4"
  }
});

export default light;
