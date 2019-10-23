import { mergeThemes } from "..";
import base from "./base";
export const dark = mergeThemes(Object.assign({}, base),{
  color: {
    primary: "#f2f2f2ff",
    background: "#2e333bff",
    secondary: "#ab5e7aff",
    highlight: "#ffc719ff"
  },
  sidebar: {
    background: "#484f5c"
  },
  card: {
    background: "#484f5c"
  },
  forms: {
    input: {
      background: "#ffffff"
    }
  }
});
