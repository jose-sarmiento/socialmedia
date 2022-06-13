import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;

const slice = createSlice({
  name: 'chats',
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
      chats.createdChat = action.payload.chat;
      chats.list.unshift(action.payload.chat);
      chats.activeChatId = action.payload.chat._id;
      chats.loading.create = false;
    },
    createChatFailed: (chats, action) => {
      chats.loading.create = false;
      chats.error.create = action.payload.error;
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
      chats.loading.message = false;
      chats.newMessage = action.payload;
      const idx = chats.list.findIndex(
        (x) => x._id === action.payload.conversationId
      );
      chats.list[idx].messages.push(action.payload.message);
    },
    sendMessageFailed: (chats, action) => {
      chats.loading.message = false;
      chats.error.message = action.payload.error;
    },
    messageReceived: (chats, action) => {
      const idx = chats.list.findIndex(
        (x) => x._id === action.payload.conversationId
      );
      chats.list[idx].messages.push(action.payload.message);
    },
    newChatReceived: (chats, action) => {
      chats.list.unshift(action.payload.chat);
    },
    readMessagesRequested: (chats) => {
      chats.loading.read = true;
      chats.error.read = null;
    },
    readMessagesSuccess: (chats, action) => {
      const { conversationId, messages } = action.payload;
      const idx = chats.list.findIndex((x) => x._id === conversationId);
      chats.list[idx].messages = messages;
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
// 	chats => state.list,
// 	(list, activeChatId) => list.find
// );

export const getAllConversations = () => async (dispatch, getState) => {
  try {
    dispatch(listChatsRequested());
    const { auth } = getState();
    const { data } = await axios({
      headers: { Authorization: `Bearer ${auth.token}` },
      url: '/conversations',
    });
    dispatch(listChatsSuccess({ list: data.conversations }));
  } catch (error) {
    dispatch(listChatsFailed({ error: "Something wen't wrong" }));
  }
};

export const createNewConversation =
  (receiverId) => async (dispatch, getState) => {
    try {
      dispatch(createChatRequested());
      const state = getState();
      const { auth } = state;
      const { data } = await axios({
        method: 'post',
        headers: { Authorization: `Bearer ${auth.token}` },
        url: '/conversations',
        data: { receiverId },
      });
      dispatch(createChatSuccess({ chat: data }));
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
        method: 'patch',
        headers: { Authorization: `Bearer ${auth.token}` },
        url: `/conversations/${conversationId}`,
      });
      dispatch(
        readMessagesSuccess({ messages: data.messages, conversationId })
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
        method: 'patch',
        headers: { Authorization: `Bearer ${auth.token}` },
        url: `/conversations/${conversationId}/messages/${messageId}`,
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
      method: 'post',
      headers: { Authorization: `Bearer ${auth.token}` },
      url: `/conversations/${activeChatId}/messages`,
      data: {
        text,
        receiverId,
      },
    });
    dispatch(
      sendMessageSuccess({
        message: {
          ...data.message,
          sender: {
            _id: users.user._id,
            firstname: users.user.firstname,
            lastname: users.user.lastname,
            profileImage: users.user.profileImage,
          },
        },
        conversationId: data.conversationId,
        activeChatId,
      })
    );
  } catch (error) {
    dispatch(sendMessageFailed({ error: "Something wen't wrong" }));
  }
};
