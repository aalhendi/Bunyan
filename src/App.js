import './App.css';
/* Global Library */
import { Switch, Route } from 'react-router'
import Signup from './components/authentication/Signup';

function App() {
  return (
    <Switch>
      <Route path="/signup">
        <Signup />
      </Route>
    </Switch>
  );
}

export default App;
