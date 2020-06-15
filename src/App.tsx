import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import MapScreen from './pages/MapScreen/MapScreen';
import FAQScreen from './pages/FAQScreen/FAQScreen';

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
          <FAQScreen />
        </Route>

        <Route exact path="/">
          <MapScreen />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
