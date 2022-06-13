import React, { useEffect } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  LoginScreen,
  RegisterScreen,
  HomeScreen,
  ProfileScreen,
  ViewPostScreen,
  FriendsScreen,
  MessagesScreen,
  ViewUserScreen,
  NotificationsScreen,
} from './pages';
import { AppLayout } from './container';
import { PrivateRoute, GuestRoute } from './components';

import { getUserDetails, getPeople } from './store/users';
import { getAllConversations } from './store/chats';
import { getAllNotifications } from './store/notifications';

function App() {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.user) return;

    dispatch(getUserDetails());
    dispatch(getPeople());
    dispatch(getAllConversations());
    dispatch(getAllNotifications());
  }, [auth, dispatch]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomeScreen />
          </PrivateRoute>
        }
      />

      <Route
        path="login"
        element={
          <GuestRoute>
            <LoginScreen />
          </GuestRoute>
        }
      />
      <Route
        path="register"
        element={
          <GuestRoute>
            <RegisterScreen />
          </GuestRoute>
        }
      />
      <Route
        path="users/*"
        element={
          <PrivateRoute>
            <AppLayout>
              <Outlet />
            </AppLayout>
          </PrivateRoute>
        }
      >
        <Route path="me/*" element={<ProfileScreen />} />
        <Route path=":id/*" element={<ViewUserScreen />} />
      </Route>
      <Route
        path="friends"
        element={
          <PrivateRoute>
            <FriendsScreen />
          </PrivateRoute>
        }
      />
      <Route
        path="/posts/:id"
        element={
          <PrivateRoute>
            <ViewPostScreen />
          </PrivateRoute>
        }
      />
      <Route
        path="/messages"
        element={
          <PrivateRoute>
            <MessagesScreen />
          </PrivateRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <PrivateRoute>
            <NotificationsScreen />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<h4>404</h4>} />
    </Routes>
  );
}

export default App;
