import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./index.css";
import App from "./App";
import Auth from "./Pages/Auth";
import Login from "./Pages/Auth/login";
import Register from "./Pages/Auth/register";
import * as serviceWorker from "./serviceWorker";

const SliderComponent = () => (
  <Switch>
    <Route path="/" component={App}>
      <Route path="auth" component={Auth}>
        <Route path="/sign_up" component={Register} />
        <Route path="/sign_in" component={Login} />
      </Route>
      {/* <Route path="*" component={NoMatch}/> */}
    </Route>
  </Switch>
);

ReactDOM.render(
  <HashRouter>
    <SliderComponent />
  </HashRouter>,
  document.getElementById("root")
);

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
