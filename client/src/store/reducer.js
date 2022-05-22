import {combineReducers} from "redux"
import authReducer from "./auth"
import entitiesReducer from "./entities"
import uiReducer from "./ui"

const appReducer = combineReducers({
	auth: authReducer,
	entities: entitiesReducer,
	ui: uiReducer,
})

const rootReducer = (state, action) => {
	if (action.type === 'auth/logoutSuccess') {
		return appReducer(undefined, action);
	}
	return appReducer(state,action);
}

export default rootReducer;