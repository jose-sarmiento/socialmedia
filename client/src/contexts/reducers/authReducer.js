import * as auth from '../constants/authConstants'

const authReducer = (state, action) => {
    switch (action.type) {
        case auth.loginRequested:
            return { ...state, loginLoading: true, loginError: null };
        case auth.loginSuccess:
            return { ...state, auth: action.payload, loginLoading: false };
        case auth.loginFailed: 
            return {
                ...state,
                loginLoading: false,
                loginError: action.payload,
            };
        case auth.registerRequested:
            return { ...state, registerLoading: true, registerError: null };
        case auth.registerSuccess:
            return { ...state, auth: action.payload, registerLoading: false };
        case auth.registerFailed:
            return {
                ...state,
                registerLoading: false,
                registerError: action.payload,
            };
        case auth.logout:
            return { ...state, auth: null };
        default:
            throw new Error('Invalid action type');
    }
};

export default authReducer;