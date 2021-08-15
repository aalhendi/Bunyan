import './App.css';
/* Global Library */
import { Switch, Route } from 'react-router'
import Register from './components/authentication/Register';
import Login from './components/authentication/Login';
import { Redirect } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
}

export default App;
