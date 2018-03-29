import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/app";
import "./resources/less/gitga.less";
import { Provider } from "react-redux";
import configureStore from "./store/git-store";
import { MuiThemeProvider } from "material-ui/styles";

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </Provider>,
    document.getElementById("root"),
  );
