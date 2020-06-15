import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';

function App() {
  const [sidebar, setSidebar] = useState(false)
  const toggleSidebar = () => setSidebar(!sidebar)

  return (
    <Router>
      <Sidebar
        open={sidebar}
        onToggle={toggleSidebar}
      />

      <Header onMenuClick={toggleSidebar} />

      <Switch>
        <Route exact path="/faq">
          <h1>FAQ Screen</h1>
        </Route>

        <Route exact path="/">
          <h1>Map Screen</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
