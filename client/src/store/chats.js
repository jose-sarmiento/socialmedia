import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "chats",
    initialState: {
        list: [],
        activeChatId: null,
        onlineUsers: [],
        loading: {},
        error: {},
        success: {},
    },
    reducers: {
        listChatsRequested: (chats) => {
            chats.loading.list = true;
            chats.error.list = null;
        },
        listChatsSuccess: (chats, action) => {
            chats.list = action.payload.list;
            chats.loading.list = false;
        },
        listChatsFailed: (chats, action) => {
            chats.loading.list = false;
            chats.error.list = action.payload.error;
        },
        activeChatSelected: (chats, action) => {
            chats.activeChatId = action.payload.chatId;
        },
        activeChatRemoved: (chats) => {
            chats.activeChatId = null;
        },
        newChatCreated: (chats, action) => {
            const idx = chats.list.find((x) => x._id === action.payload.chatId);
            if (!idx) {
                chats.list.push(action.payload.chat);
                chats.activeChatId = action.payload.chatId;
            }
        },
        createChatRequested: (chats) => {
            chats.loading.create = true;
            chats.error.create = null;
        },
        createChatSuccess: (chats, action) => {
            const { senderId, receiverId, chat } = action.payload;
            // check if convo already exists
            // if yes replace active chat id and createdChat
            const idx = chats.list.findIndex((elem) =>
                elem.members.every(
                    (el) => [senderId, receiverId].indexOf(el._id) > -1
                )
            );
            if (idx > -1) {
                chats.createdChat = chat;
                chats.list[idx] = chat;
                chats.activeChatId = chat._id;
                chats.loading.create = false;
            } else {
                chats.createdChat = chat;
                chats.list.unshift(chat);
                chats.activeChatId = chat._id;
                chats.loading.create = false;
            }
        },
        createChatFailed: (chats, action) => {
            chats.loading.create = false;
            chats.error.create = action.payload.error;
        },
        createEmptyChat: (chats, action) => {
            chats.list.unshift(action.payload.chat);
            chats.activeChatId = action.payload.chat._id;
        },
        createChatReset: (chats) => {
            chats.createdChat = null;
        },
        sendMessageRequested: (chats) => {
            chats.loading.message = true;
            chats.error.message = null;
            chats.newMessage = false;
        },
        sendMessageSuccess: (chats, action) => {
            const {
                conversation,
                conversationId,
                message,
                isNewChat,
                activeChatId,
            } = action.payload;
            chats.loading.message = false;
            chats.newMessage = {
                conversation,
                conversationId,
                message,
                isNewChat,
            };
            const idx = chats.list.findIndex((x) => x._id === activeChatId);
            chats.list[idx].messages.push(message);
            if (isNewChat) {
                chats.list[idx]._id = conversationId;
                chats.activeChatId = conversationId;
            }
        },
        sendMessageFailed: (chats, action) => {
            chats.loading.message = false;
            chats.error.message = action.payload.error;
        },
        messageReceived: (chats, action) => {
            const { conversation, conversationId, message, isNewChat } =
                action.payload;
            const idx = chats.list.findIndex((x) => x._id === conversationId);
            if (idx === -1) {
                const newConversation = {
                    ...conversation,
                    messages: [message],
                };
                console.log("newConversationn", newConversation);
                chats.list.unshift(newConversation);
            } else {
                chats.list[idx].messages.push(message);
            }
        },
        newChatReceived: (chats, action) => {
            chats.list.unshift(action.payload.chat);
        },
        readMessagesRequested: (chats) => {
            chats.loading.read = true;
            chats.error.read = null;
        },
        readMessagesSuccess: (chats, action) => {
            const { conversationId, messages, userId } = action.payload;
            const idx = chats.list.findIndex((x) => x._id === conversationId);
            chats.list[idx].messages = chats.list[idx].messages.map((x) => ({
                ...x,
                seenBy: [...x.seenBy, userId],
            }));
            chats.loading.read = false;
        },
        readMessagesFailed: (chats, action) => {
            chats.loading.read = false;
            chats.error.read = action.payload.error;
        },
        readMessageRequested: (chats) => {
            chats.loading.readMessage = true;
            chats.error.readMessage = null;
        },
        readMessageSuccess: (chats, action) => {
            const { conversationId, messageId, userId } = action.payload;
            const idx = chats.list.findIndex((x) => x._id === conversationId);
            const midx = chats.list[idx].messages.findIndex(
                (x) => x._id === messageId
            );
            chats.list[idx].messages[midx].seenBy.push(userId);
            chats.loading.readMessage = false;
        },
        readMessageFailed: (chats, action) => {
            chats.loading.readMessage = false;
            chats.error.readMessage = action.payload.error;
        },
        onlineUsersUpdated: (chats, action) => {
            chats.onlineUsers = action.payload;
        },
    },
});

export const {
    listChatsRequested,
    listChatsSuccess,
    listChatsFailed,
    createChatRequested,
    createChatSuccess,
    createChatFailed,
    createChatReset,
    createEmptyChat,
    activeChatSelected,
    activeChatRemoved,
    newChatCreated,
    sendMessageRequested,
    sendMessageSuccess,
    sendMessageFailed,
    messageReceived,
    newChatReceived,
    readMessagesRequested,
    readMessagesSuccess,
    readMessagesFailed,
    readMessageRequested,
    readMessageSuccess,
    readMessageFailed,
    onlineUsersUpdated,
} = slice.actions;

export default slice.reducer;

//  selectors
// export const selectActiveChatMessages = createSelector(
//  chats => state.list,
//  (list, activeChatId) => list.find
// );

export const getAllConversations = () => async (dispatch, getState) => {
    try {
        dispatch(listChatsRequested());
        const { auth } = getState();
        const { data } = await axios({
            headers: { Authorization: `Bearer ${auth.token}` },
            url: "/api/v1/conversations",
        });
        dispatch(listChatsSuccess({ list: data.conversations }));
    } catch (error) {
        dispatch(listChatsFailed({ error: "Something wen't wrong" }));
    }
};

export const createNewConversation =
    (payload) => async (dispatch, getState) => {
        try {
            dispatch(createChatRequested());
            const state = getState();
            const { auth } = state;
            const { data } = await axios({
                method: "post",
                headers: { Authorization: `Bearer ${auth.token}` },
                url: "/api/v1/conversations",
                data: payload,
            });
            dispatch(
                createChatSuccess({
                    senderId: auth.user._id,
                    receiverId: payload.receiverId,
                    chat: data,
                })
            );
        } catch (error) {
            dispatch(createChatFailed({ error: "Something wen't wrong" }));
        }
    };

export const readMessagesInConversation =
    (conversationId) => async (dispatch, getState) => {
        try {
            dispatch(readMessagesRequested());
            const state = getState();
            const { auth } = state;
            const { data } = await axios({
                method: "patch",
                headers: { Authorization: `Bearer ${auth.token}` },
                url: `/api/v1/conversations/${conversationId}`,
            });
            dispatch(
                readMessagesSuccess({
                    messages: data.messages,
                    conversationId,
                    userId: auth.user._id,
                })
            );
        } catch (error) {
            dispatch(readMessagesFailed({ error: "Something wen't wrong" }));
        }
    };

export const readMessageInConversation =
    (conversationId, messageId) => async (dispatch, getState) => {
        const state = getState();
        const {
            auth,
            entities: { chats },
        } = state;
        if (conversationId !== chats.activeChatId) return;

        try {
            dispatch(readMessageRequested());
            await axios({
                method: "patch",
                headers: { Authorization: `Bearer ${auth.token}` },
                url: `/api/v1/conversations/${conversationId}/messages/${messageId}`,
            });
            dispatch(
                readMessageSuccess({
                    userId: auth.user._id,
                    conversationId,
                    messageId,
                })
            );
        } catch (error) {
            dispatch(readMessageFailed({ error: "Something wen't wrong" }));
        }
    };

export const sendMessage = (params) => async (dispatch, getState) => {
    const { text, activeChatId, receiverId } = params;
    try {
        dispatch(sendMessageRequested());
        const state = getState();
        const {
            auth,
            entities: { users },
        } = state;
        const { data } = await axios({
            method: "post",
            headers: { Authorization: `Bearer ${auth.token}` },
            url: `/api/v1/conversations/${activeChatId}/messages`,
            data: {
                text,
                receiverId,
            },
        });
        dispatch(
            sendMessageSuccess({
                ...data,
                message: {
                    ...data.message,
                    sender: {
                        _id: users.user._id,
                        firstname: users.user.firstname,
                        lastname: users.user.lastname,
                        profileImage: users.user.profileImage,
                    },
                },
                activeChatId,
            })
        );
    } catch (error) {
        dispatch(sendMessageFailed({ error: "Something wen't wrong" }));
    }
};
