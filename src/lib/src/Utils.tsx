import { DateTime } from "luxon";

export const getDeepObjectValue = (key: string, object: Object) => {
  const value = key
    .split(".")
    .map(_key => ({ key: _key, object }))
    .reduce((vp, vn) => ({ key: vn.key, object: vp.object[vp.key] }));
  return value.object[value.key];
};
export const groupBy = (input: any[], attr: any): any => {
  const objTmp = input.reduce((obj, item) => {
    const value = getDeepObjectValue(attr, item);
    obj[value] = obj[value] || [];
    obj[value].push(item);
    return obj;
  }, {});

  return Object.keys(objTmp).map(function(key) {
    return { group: key, items: objTmp[key] };
  });
};

export const fieldSorter = (fields: string[]) => {
  return (a, b) =>
    fields
      .map(field => {
        let dir = 1;
        if (field[0] === "-") {
          dir = -1;
          field = field.substring(1);
        }
        const aVal = getDeepObjectValue(field, a);
        const bVal = getDeepObjectValue(field, b);
        const aType = typeof aVal;
        const bType = typeof bVal;
        if (aType === bType) {
          switch (aType) {
            case "string":
              return dir === 1
                ? aVal.localeCompare(bVal)
                : bVal.localeCompare(aVal);

            case "number":
              return dir === 1 ? aVal - bVal : bVal - aVal;

            case "object":
              if (aVal instanceof Date) {
                return dir === 1
                  ? DateTime.fromJSDate(aVal) >= DateTime.fromJSDate(bVal)
                  : DateTime.fromJSDate(bVal) >= DateTime.fromJSDate(aVal);
              } else {
                return 0;
              }
            case "boolean":
              return dir === 1 ? aVal - bVal : bVal - aVal;

            default:
              return 0;
          }
        }
        return 0;
      })
      .reduce((p, n) => (p ? p : n), 0);
};
