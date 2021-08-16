/* Imports */
import { Switch, Route } from "react-router";
import { Link } from "react-router-dom";
/* Components */
import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";
/* State and Store */
import authStore from "./stores/authStore";
import { observer } from "mobx-react";

const App = () => {
  return (
    <Switch>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route exact path="/">
        <h1>Hello</h1>
        {authStore.user && (
          <button onClick={() => authStore.logout()}>Logout</button>
        )}
        {!authStore.user && (
          <button>
            <Link to="/login">Login</Link>
          </button>
        )}
      </Route>
    </Switch>
  );
};

export default observer(App);
