import './App.css';
/* Global Library */
import { Switch, Route } from 'react-router'
import Register from './components/authentication/Register';
import Login from './components/authentication/Login';

function App() {
  return (
    <Switch>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
    </Switch>
  );
}

export default App;
