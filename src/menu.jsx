export const MENU_ITEMS = [
  {
    icon: "home",
    title: "Home",
    path: ""
  },
  {
    icon: "columns",
    title: "Layout",
    path: "layout",
    children: [
      { title: "Layout", path: "layout" },
      { title: "Areas", path: "areas" }
    ]
  },
  {
    icon: "window-maximize",
    title: "Components",
    path: "components",
    children: [
      { title: "Sidebar", path: "sidebar" },
      { title: "Topbar", path: "topbar" },
      { title: "Button", path: "button" },
      { title: "Card", path: "card" },
      {
        title: "Forms",
        path: "forms",
        children: [
          {
            title: "Input",
            path: "input"
          }
        ]
      }
    ]
  }
];
