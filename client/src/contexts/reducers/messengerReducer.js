import * as chat from "../constants/messengerConstants";

const messengerReducer = (state, action) => {
    switch (action.type) {   
        case chat.setActiveConversation:
            return { ...state, activeConversation: action.payload}
        case chat.unsetActiveConversation:
            return {
                ...state, 
                activeConversation: null,
                messages: []
            }

        case chat.getConversationsRequested:
            return { ...state, getConversationsLoading: true };
        case chat.getConversationsSuccess:
            const {data, userId} = action.payload
            return {
                ...state,
                conversations: data.map(c => {
                    return {
                        _id: c._id,
                        createdAt: c.createdAt,
                        updatedAt: c.updatedAt,
                        me: c.members.find(m => m._id === userId),
                        friend: c.members.find(m => m._id !== userId),
                        messages: c.messages
                    }
                }),
                getConversationsLoading: false,
            };
        case chat.getConversationsFailed:
            return {
                ...state,
                getConversationsLoading: false,
                getConversationsError: action.payload,
            };

        case chat.getMessagesRequested:
            return { ...state, getMessagesLoading: true };
        case chat.getMessagesSuccess:
            return {
                ...state,
                messages: action.payload,
                getMessagesLoading: false,
            };
        case chat.getMessagesFailed:
            return {
                ...state,
                getMessagesLoading: false,
                getMessagesError: action.payload,
            };

        case chat.createMessageRequested:
            return { ...state, createMessageLoading: true, createMessageSuccess: false };
        case chat.createMessageSuccess:
            const { message, createdConversation, userId: senderId } = action.payload
            console.log(message)
            console.log(createdConversation)
            console.log(senderId)
            let newState = {
                ...state,
                messages: [...state.messages, message],
                createMessageLoading: false,
                createMessageSuccess: action.payload
            }

            if(createdConversation) {
                newState.conversations = [
                    ...state.conversations,
                    {
                        _id: createdConversation._id,
                        createdAt: createdConversation.createdAt,
                        updatedAt: createdConversation.updatedAt,
                        me: createdConversation.members.find(m => m._id === senderId),
                        friend: createdConversation.members.find(m => m._id !== senderId),
                        messages: [message]
                    }
                ]
            }
            return newState;  
        case chat.createMessageFailed:
            return {
                ...state,
                createMessageLoading: false,
                createMessageError: action.payload,
            };

        case chat.addMessageToConversation:
            return { 
                ...state, 
                conversations: state.conversations.map(c => {

                    if(c._id === action.payload.conversationId) {
                        c.messages.push({...action.payload})
                    }
                    return c
                }),
                messages: state.messages.length === 0 ? [] : [...state.messages, action.payload]
            };

        case chat.setOnlineFriends:
            return {
                ...state,
                onlines: [...action.payload]
            }

        default:
            throw new Error("Invalid action type");
    }
};

export default messengerReducer;
