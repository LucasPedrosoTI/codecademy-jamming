import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import ErrorBoundary from "./error/Error";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-oldschool-dark";
import App from "./containers/App/App";
import * as serviceWorker from "./serviceWorker";

const options = {
  position: "bottom center",
  timeout: 5000,
  offset: "30px",
  transition: "scale",
};

ReactDOM.render(
  <ErrorBoundary>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </ErrorBoundary>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
