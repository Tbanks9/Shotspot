import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import './styles/main.scss'
import 'bulma'

import Home from './components/common/Home'
import CityIndex from './components/cities/CityIndex'
import UserProfile from './components/users/UserProfile'
import UserEdit from './components/users/UserEdit'

import Navbar from './components/common/Navbar'
import FailedPage from './components/common/FailedPage'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import SecureRoute from './components/common/SecureRoute'


function App() {
  return (
    <BrowserRouter>
      <>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <SecureRoute path="/users/:id/edit" component={UserEdit} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/cities" component={CityIndex} />
          <Route path="/profile" component={UserProfile} />
          <Route path="/*" component={FailedPage} />
        </Switch>
      </>
    </BrowserRouter>
  );
}

export default App