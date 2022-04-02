import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import LoginScreen from '../pages/LoginScreen'
import RegisterScreen from '../pages/RegisterScreen'
import HomeScreen from '../pages/HomeScreen' 
import ProfileScreen from '../pages/ProfileScreen' 
import ViewPostScreen from '../pages/ViewPostScreen' 
import FriendsScreen from '../pages/FriendsScreen' 

function App() {

  return (
    <>
      <Switch>
        <PrivateRoute path="/" exact>
          <HomeScreen />
        </PrivateRoute>
        
        <Route path="/login">
          <LoginScreen />
        </Route>

        <Route path="/register">
          <RegisterScreen />
        </Route>

        <PrivateRoute path="/profile/:id">
          <ProfileScreen />
        </PrivateRoute>

        <PrivateRoute path="/profile">
          <ProfileScreen />
        </PrivateRoute>

        <PrivateRoute path="/friends">
          <FriendsScreen />
        </PrivateRoute>

        <PrivateRoute path="/posts/:id">
          <ViewPostScreen />
        </PrivateRoute>


        <Route path="*">
          <h4>404</h4>
        </Route>
      </Switch>
    </>
  )
}

export default App
