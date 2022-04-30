import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const _axios = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    headers: { "Content-Type": "application/json" },
});

const AUTH_STORAGE_KEY = "socialmedia_userinfo";

const authFromStorage = localStorage.getItem(AUTH_STORAGE_KEY) 
    ? JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY)).user
    : null;

const tokenFromStorage = localStorage.getItem(AUTH_STORAGE_KEY) 
    ? JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY)).token
    : null;

const slice = createSlice({
    name: "auth",
    initialState: {
        user: authFromStorage,
        token: tokenFromStorage,
        loadings: {},
        errors: {},
    },
    reducers: {
        loginRequested: (auth, action) => {
            auth.loadings.login = false;
            auth.errors.login = false;
        },
        loginSuccess: (auth, action) => {
            auth.user = action.payload.user;
            auth.token = action.payload.token;
            auth.loadings.login = false;
        },
        loginFailed: (auth, action) => {
            auth.loadings.login = false;
            auth.errors.login = action.payload.error;
        },
        registerRequested: (auth, action) => {
            auth.loadings.register = false;
            auth.errors.register = false;
        },
        registerSuccess: (auth, action) => {
            auth.user = action.payload.user;
            auth.token = action.payload.token;
            auth.loadings.register = false;
        },
        registerFailed: (auth, action) => {
            auth.loadings.register = false;
            auth.errors.register = action.payload.error;
        },
        logoutSuccess: (auth, action) => {
            auth.user = null;
            auth.token = null;
        },
    },
});

export const {
    loginRequested,
    loginSuccess,
    loginFailed,
    registerRequested,
    registerSuccess,
    registerFailed,
    logoutSuccess
} = slice.actions;

export default slice.reducer;

export const login = reqObj => async (dispatch) => {
    dispatch(loginRequested());
    try {
        const { data, headers } = await _axios({
            method: "post",
            url: "/auth/login",
            data: reqObj,
        });
        const payload = { user: data, token: headers["x-auth-token"] };
        dispatch(loginSuccess(payload));
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(payload));
    } catch (error) {
        dispatch(
            loginFailed({
                error:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            })
        );
    }
};

export const register = data => async (dispatch) => {
    dispatch(registerRequested());
    try {
        const response = await _axios({
            method: "post",
            url: "/auth/register",
            data: data,
        });

        const payload = { 
            user: response.data, 
            token: response.headers["x-auth-token"] 
        };
        dispatch(registerSuccess(payload));
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(payload));
    } catch (error) {
        dispatch(
            registerFailed({
                error:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            })
        );
    }
};

export const logout = () => (dispatch) => {
    dispatch(logoutSuccess());
    localStorage.removeItem(AUTH_STORAGE_KEY);
};
