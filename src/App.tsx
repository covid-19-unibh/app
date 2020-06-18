import React, { useState, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Switch, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header/Header'
import MapScreen from './pages/MapScreen/MapScreen'
import FAQScreen from './pages/FAQScreen/FAQScreen'

const useStyles = makeStyles((theme) => ({
  content: {
    paddingTop: theme.spacing(7),
  },
}))

const chooseTitle = (pathname: string) => (pathname === '/' ? 'Mapa' : 'Chat')

function App() {
  const classes = useStyles()
  const [sidebar, setSidebar] = useState(false)
  const toggleSidebar = () => setSidebar(!sidebar)
  const location = useLocation()
  const title = useMemo(() => chooseTitle(location.pathname), [
    location.pathname,
  ])

  return (
    <>
      <Sidebar open={sidebar} onToggle={toggleSidebar} />

      <Header title={title} onMenuClick={toggleSidebar} />

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
    </>
  )
}

export default App
