import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./containers/app";
import "./resources/less/gitga.less";
import { Provider } from "react-redux";
import configureStore from "./store/git-store";
import { I18nextProvider, I18n } from "react-i18next";
import i18n from "./i18n";

const store = configureStore();

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <App />
    </Provider>
  </I18nextProvider>,
    document.getElementById("root"),
  );
