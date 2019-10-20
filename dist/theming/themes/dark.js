import { mergeThemes } from "..";
import base from "./base";

const dark = {
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
};

export default mergeThemes(Object.assign({}, base), dark);