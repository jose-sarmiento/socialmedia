import {combineReducers} from "redux"
import postsReducer from "./posts"
import usersReducer from "./users"
import chatsReducer from "./chats"

export default combineReducers({
	users: usersReducer,
	posts: postsReducer,
	chats: chatsReducer
})