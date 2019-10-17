import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import Login from "./Pages/Auth/login_page";
import Register from "./Pages/Auth/register_page";
import * as serviceWorker from "./serviceWorker";

const SliderComponent = () => (
  <Switch>
    <Route path="/" component={App}>
      {/* <Route path="auth" component={Auth}> */}
        <Route path="/sign_up" component={Register} />
        <Route path="/sign_in" component={Login} />
      {/* </Route> */}
      <Route path="*" component={App}/>
    </Route>
  </Switch>
);

ReactDOM.render(
  <Router>
    <SliderComponent />
  </Router>,
  document.getElementById("root")
);

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
