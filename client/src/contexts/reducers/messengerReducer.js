import * as chat from "../constants/messengerConstants";

const messengerReducer = (state, action) => {
    const { type, payload } = action;

    if (type === chat.setActiveConversation) {
        return { ...state, activeConversation: payload };
    }

    if (type === chat.unsetActiveConversation) {
        return {
            ...state,
            activeConversation: null,
            messages: [],
        };
    }

    if (type === chat.getConversationsRequested) {
        return { ...state, getConversationsLoading: true };
    }

    if (type === chat.getConversationsSuccess) {
        const { data, userId } = payload;
        return {
            ...state,
            conversations: data.map((c) => {
                return {
                    _id: c._id,
                    createdAt: c.createdAt,
                    updatedAt: c.updatedAt,
                    me: c.members.find((m) => m._id === userId),
                    friend: c.members.find((m) => m._id !== userId),
                    messages: c.messages,
                };
            }),
            getConversationsLoading: false,
        };
    }

    if (type === chat.getConversationsFailed) {
        return {
            ...state,
            getConversationsLoading: false,
            getConversationsError: payload,
        };
    }

    if (type === chat.getMessagesRequested) {
        return { ...state, getMessagesLoading: true };
    }

    if (type === chat.getMessagesSuccess) {
        return {
            ...state,
            messages: payload,
            getMessagesLoading: false,
        };
    }
    if (type === chat.getMessagesFailed) {
        return {
            ...state,
            getMessagesLoading: false,
            getMessagesError: payload,
        };
    }

    if (type === chat.createMessageRequested) {
        return {
            ...state,
            createMessageLoading: true,
            createMessageSuccess: false,
        };
    }

    if (type === chat.createMessageSuccess) {
        const { message, createdConversation, userId: senderId } = payload;
        let newState = {
            ...state,
            messages: [...state.messages, message],
            createMessageLoading: false,
            createMessageSuccess: payload,
        };

        if (createdConversation) {
            newState.conversations = [
                ...state.conversations,
                {
                    _id: createdConversation._id,
                    createdAt: createdConversation.createdAt,
                    updatedAt: createdConversation.updatedAt,
                    me: createdConversation.members.find(
                        (m) => m._id === senderId
                    ),
                    friend: createdConversation.members.find(
                        (m) => m._id !== senderId
                    ),
                    messages: [message],
                },
            ];
        } else {
            newState.conversations = newState.conversations.map((c) => {
                if (c._id === message.conversationId) {
                    return {
                        ...c,
                        messages: [...c.messages, message],
                    };
                }
                return c;
            });
        }
        return newState;
    }
    if (type === chat.createMessageFailed) {
        return {
            ...state,
            createMessageLoading: false,
            createMessageError: action.payload,
        };
    }

    if (type === chat.addMessageToConversation) {
        console.log(action.payload);
        const {
            createdConversation: createdConversationSent,
            message: messageSent,
        } = action.payload;
        return {
            ...state,
            conversations: state.conversations.map((c) => {
                if (c._id === messageSent.conversationId) {
                    c.messages.push({ ...messageSent });
                }
                return c;
            }),
            messages:
                state.messages.length === 0
                    ? []
                    : [...state.messages, messageSent],
        };
    }

    if(type === chat.addConversationWithMessage){
        const {
            createdConversation,
            message,
            userId 
        } = payload
        console.log(action.payload)
        return {
            ...state,
            conversations: [
                ...state.conversations, 
                {
                    ...createdConversation,
                    me: createdConversation.members.find(x => x._id !== userId),
                    friend: createdConversation.members.find(x => x._id === userId),
                    messages: [message]
                }
            ],
            messages: [...state.messages, message]
        }}

    if (type === chat.setOnlineFriends) {
        return {
            ...state,
            onlines: [...payload],
        };
    }

    throw new Error("Invalid action type");
};

export default messengerReducer;
