import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { HashRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import store from "./store";
import Main from "./Main";

const themeOptions = {};

const history = createBrowserHistory();

const theme = createMuiTheme({
  ...themeOptions,
});

function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <HashRouter history={history}>
          <Main />
        </HashRouter>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
