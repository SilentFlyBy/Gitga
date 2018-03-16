import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/app";
import "./resources/less/gitga.less";
import { Provider } from "react-redux";
import configureStore from "./store/git-store";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
    document.getElementById("root"),
  );
