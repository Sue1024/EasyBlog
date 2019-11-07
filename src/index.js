import React from "react";
import ReactDOM from "react-dom";
import {
  HashRouter,
  Route,
  Switch,
  BrowserRouter as Router
} from "react-router-dom";
import "./index.css";
import App from "./App";
import Login from "./Pages/Auth/login";
import Register from "./Pages/Auth/register";
import Auth from "./Pages/Auth";
import * as serviceWorker from "./serviceWorker";

const SliderComponent = () => (
  <Switch>
    <Route path="/" component={App}>
      <Route
        path="/auth"
        render={({ history, location, match }) => (
          <Auth history={history} location={location} match={location}>
            <Route path="/auth/sign_up" component={Register}></Route>
            <Route path="/auth/sign_in" component={Login}></Route>
          </Auth>
        )}
      />
      <Route path="*" component={App} />
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
