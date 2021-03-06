import React, { useState, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Switch, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header/Header'
import MapScreen from './pages/MapScreen/MapScreen'
import ChatScreen from './pages/ChatScreen/ChatScreen'
import LocationRequired from './pages/LocationRequired/LocationRequired'
import LocationProtectedRoute from './components/LocationProtectedRoute/LocationProtectedRoute'
import QuestionaryScreen from './pages/QuestionaryScreen/QuestionaryScreen'

const useStyles = makeStyles((theme) => ({
  content: {
    paddingTop: theme.spacing(7),
  },
}))

const chooseTitle = (pathname: string) => {
  switch (pathname) {
    case '/': return 'Mapa'
    case '/faq': return 'Chat'
    case '/questionary': return 'Questionário'
    default: return 'Mapa'
  }
}

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
            <ChatScreen />
          </Route>

          <Route exact path="/questionary">
            <QuestionaryScreen />
          </Route>

          <LocationProtectedRoute exact path="/">
            <MapScreen />
          </LocationProtectedRoute>

          <Route exact path="/location-required">
            <LocationRequired />
          </Route>
        </Switch>
      </main>
    </>
  )
}

export default App
