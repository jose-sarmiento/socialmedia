import {combineReducers} from "redux"
import authReducer from "./auth"
import entitiesReducer from "./entities"

const appReducer = combineReducers({
	auth: authReducer,
	entities: entitiesReducer,
	// ui
})

const rootReducer = (state, action) => {
	if (action.type === 'auth/logoutSuccess') {
		return appReducer(undefined, action);
	}
	return appReducer(state,action);
}

export default rootReducer;