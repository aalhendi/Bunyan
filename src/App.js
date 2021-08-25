/* Imports */
import { Switch, Route, Redirect } from "react-router";
/* Components */
import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";
import Navbar from "./components/navbar/Navbar";

/* State and Store */
import authStore from "./stores/authStore";
import { observer } from "mobx-react";
/* Component */
import Home from "./components/dashboard/Home";
import ClientList from "./components/client/ClientList";
import WorkerList from "./components/worker/WorkerList";
import Profile from "./components/profile/Profile";
import TaskList from "./components/task/TaskList";
import TaskDetail from "./components/task/TaskDetail";

const App = () => {
  return (
    <Switch>
      {/* ToDo: slug */}
      <Route path="/task/:taskId/taskDetail">
        <Navbar />
        <TaskDetail />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/workerList">
        {/* TODO: Causes console error: <a> is not a valid child of <a> */}
        <Navbar />
        <WorkerList />
      </Route>
      <Route path="/task/:clientId">
        <Navbar />
        {/* ToDo: Add Task Component */}
        <TaskList />
      </Route>
      <Route path="/clientList">
        <Navbar />
        <ClientList />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route exact path="/">
        {authStore.user ? (
          <>
            {/* TODO: Causes console error: <a> is not a valid child of <a> */}
            <Redirect to="/clientList" />

            <Navbar />
            <Home />
          </>
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
    </Switch>
  );
};

export default observer(App);
