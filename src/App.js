/* Imports */
import { Switch, Route, Redirect } from "react-router";
/* Components */
import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";
import Navbar from "./components/navbar/Navbar"

import RegisterWorker from "./components/worker/RegisterWorker";
/* State and Store */
import authStore from "./stores/authStore";
import { observer } from "mobx-react";
/* Component */
import Home from "./components/dashboard/Home";
import ClientList from "./components/client/ClientList";

const App = () => {
  return (
    <Switch>
      <Route path="/task">
        <Navbar />
        {/* ToDo: Add Task Component */}
      </Route>
      <Route path="/clientlist">
        <Navbar />
        <ClientList />
      </Route>
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

        {(authStore.user) ? <><Navbar /> <Home /></> : <Redirect to="/login" />}
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
