import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

// store
import { store } from "./RTK/store";
// components
import App from "./App";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
