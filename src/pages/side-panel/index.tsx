import React from "react";
import { createRoot } from "react-dom/client";
import "@assets/styles/tailwind.css";
import SidePanel from "@pages/side-panel/SidePanel";

function init() {
  const rootContainer = document.querySelector("#__root");
  if (!rootContainer) throw new Error("Can't find SidePanel root element");
  const root = createRoot(rootContainer);
  root.render(<SidePanel />);
}

init();
