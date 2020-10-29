import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import Home from 'Routes/Home'
import Search from 'Routes/Search'
import TV from 'Routes/TV'
import Header from 'Components/Header'

const router = () => (
  <Router>
    <Header />
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/tv' component={TV} />
      <Route path='/search' component={Search} />
      <Redirect from='*' to='/' />
    </Switch>
  </Router>
)

export default router
