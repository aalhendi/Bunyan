import './App.css';
/* Global Library */
import { Switch, Route } from 'react-router'
import Register from './components/authentication/Register';

function App() {
  return (
    <Switch>
      <Route path="/register">
        <Register />
      </Route>
    </Switch>
  );
}

export default App;
