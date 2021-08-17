/* Imports */
import { Switch, Route } from "react-router";
import { Link } from "react-router-dom";
/* Components */
import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";
import RegisterWorker from "./components/worker/RegisterWorker";

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

      <Route path="/registerWorker">
        <RegisterWorker />
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

        {authStore.user && (
          <button>
            <Link to="/registerWorker">Register Worker</Link>
          </button>
        )}
      </Route>
    </Switch>
  );
};

export default observer(App);
