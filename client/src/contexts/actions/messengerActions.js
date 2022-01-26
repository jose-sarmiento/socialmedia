import axios from 'axios';
import * as chat from '../constants/messengerConstants';

export const getConversations = ({_id, token}) => async dispatch => {
	dispatch({type: chat.getConversationsRequested})
	try {
		const {data} = await axios.get(
			`${process.env.REACT_APP_API_ENDPOINT}/conversations/${_id}`,
			{},
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		dispatch({type: chat.getConversationsSuccess, payload: {data, userId: _id}})
	} catch (error) {
		dispatch({
			type: chat.getConversationsFailed,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
}

export const getMessagesInConversation = ({convoId, token}) => async dispatch => {
	dispatch({type: chat.getMessagesRequested})
	try {
		const {data} = await axios.get(
			`${process.env.REACT_APP_API_ENDPOINT}/messages/${convoId}`,
			{},
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		dispatch({type: chat.getMessagesSuccess, payload: data})
	} catch (error) {
		dispatch({
			type: chat.getMessagesFailed,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}	
}

export const createMessage = ({convoId, senderId, receiverId, message, token}) => async dispatch => {
	dispatch({type: chat.createMessageRequested})
	try {
		const {data} = await axios.post(
			`${process.env.REACT_APP_API_ENDPOINT}/messages`,
			{
				conversationId: convoId,
				sender: senderId,
				receiverId: receiverId,
				text: message,
			},
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		dispatch({type: chat.createMessageSuccess, payload: {...data, userId: senderId}})
	} catch (error) {
		dispatch({
			type: chat.createMessageFailed,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}	
}


