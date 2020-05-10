import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ContextProvider } from "./component/repository/ContextProvider";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ContextProvider>
    <App />
  </ContextProvider>,
  rootElement
);
