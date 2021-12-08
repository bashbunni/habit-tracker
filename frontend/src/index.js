import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import * as Wails from "@wailsapp/runtime";

Wails.Init(() => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
});
