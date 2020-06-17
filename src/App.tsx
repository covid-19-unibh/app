import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import MapScreen from './pages/MapScreen/MapScreen';
import FAQScreen from './pages/FAQScreen/FAQScreen';

const useStyles = makeStyles((theme) => ({
  content: {
    paddingTop: theme.spacing(7),
  }
}));

function App() {
  const classes = useStyles();
  const [sidebar, setSidebar] = useState(false)
  const toggleSidebar = () => setSidebar(!sidebar)

  return (
    <Router>
      <Sidebar
        open={sidebar}
        onToggle={toggleSidebar}
      />

      <Header onMenuClick={toggleSidebar} />

      <main className={classes.content}>
        <Switch>
          <Route exact path="/faq">
            <FAQScreen />
          </Route>

          <Route exact path="/">
            <MapScreen />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
