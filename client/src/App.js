import React, { useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    LoginScreen,
    RegisterScreen,
    HomeScreen,
    ProfileScreen,
    ViewPostScreen,
    FriendsScreen,
    MessagesScreen
} from "./pages"
import { AppLayout } from "./container";
import {
    PrivateRoute,
    GuestRoute
} from "./components"

import { getUserDetails, getFriends, getPeople } from "./store/users";

function App() {
    const dispatch = useDispatch();

    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        if (!auth.user) return;

        dispatch(getUserDetails());
        dispatch(getFriends(auth.user._id));
        dispatch(getPeople());
    }, [auth]);

    return (
        <>
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
                    <Route path=":id" element={<h1>Other User Profile</h1>} />
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
                <Route path="*" element={<h4>404</h4>} />
            </Routes>
        </>
    );
}

export default App;
