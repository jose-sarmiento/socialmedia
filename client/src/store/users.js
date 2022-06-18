import axios from 'axios';
import { createSlice, createSelector } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import _ from 'lodash';

import { updateAuthorImage } from './posts';


const slice = createSlice({
  name: 'users',
  initialState: {
    user: null,
    people: [],
    friends: [],
    friendRequests: [],
    pendingRequests: [],
    birthdays: [],
    viewUser: null,
    loading: {},
    error: {},
    success: {},
    searchResults: [],
  },
  reducers: {
    getUserRequested: (users) => {
      users.loading.get = true;
      users.error.get = null;
    },
    getUserSuccess: (users, action) => {
      users.loading.get = false;
      users.user = action.payload.user;
      users.friends = action.payload.friends;
      users.friendRequests = action.payload.friendRequests;
      users.pendingRequests = action.payload.pendingRequests;
      users.birthdays = action.payload.birthdays;
    },
    getUserFailed: (users, action) => {
      users.loading.get = false;
      users.error.get = action.payload.error;
    },
    viewUserRequested: (users) => {
      users.loading.view = true;
      users.error.view = null;
    },
    viewUserSuccess: (users, action) => {
      users.loading.view = false;
      users.viewUser = action.payload;
    },
    viewUserFailed: (users, action) => {
      users.loading.view = false;
      users.error.view = action.payload.error;
    },
    updateUserRequested: (users) => {
      users.loading.update = true;
      users.error.update = null;
      users.success.update = false;
    },
    updateUserSuccess: (users, action) => {
      users.loading.update = false;
      users.success.update = true;
      users.user = {
        ...users.user,
        ...action.payload.fields,
        school: {
          ...users.user.school,
          ...action.payload.fields.school,
        },
      };
    },
    updateUserFailed: (users, action) => {
      users.loading.update = false;
      users.error.update = action.payload.error;
    },
    uploadCoverRequested: (users) => {
      users.loading.cover = true;
      users.error.cover = null;
    },
    uploadCoverSuccess: (users, action) => {
      users.loading.cover = false;
      users.user.coverImage = action.payload.coverImage.path;
      users.user.photos.push(action.payload.coverImage);
    },
    uploadCoverFailed: (users, action) => {
      users.loading.cover = false;
      users.error.cover = action.payload.error;
    },
    uploadProfileRequested: (users) => {
      users.loading.profile = true;
      users.error.profile = null;
    },
    uploadProfileSuccess: (users, action) => {
      users.loading.profile = false;
      users.user.profileImage = action.payload.profileImage.path;
      users.user.photos.push(action.payload.profileImage);
    },
    uploadProfileFailed: (users, action) => {
      users.loading.profile = false;
      users.error.profile = action.payload.error;
    },
    deletePhotoRequested: (users) => {
      users.loading.photo = true;
      users.error.photo = null;
    },
    deletePhotoSuccess: (users, action) => {
      users.loading.photo = false;
      users.user.photos = users.user.photos.filter(
        (x) => x._id !== action.payload._id
      );
    },
    deletePhotoFailed: (users, action) => {
      users.loading.photo = false;
      users.error.photo = action.payload.error;
    },
    getPeopleRequested: (users) => {
      users.loading.people = true;
      users.error.people = null;
    },
    getPeopleSuccess: (users, action) => {
      users.loading.people = false;
      users.people = [...users.people, ...action.payload.people];
    },
    getPeopleFailed: (users, action) => {
      users.loading.people = false;
      users.error.people = action.payload.error;
    },
    getFriendsRequested: (users) => {
      users.loading.friends = true;
      users.error.friends = null;
    },
    getFriendsSuccess: (users, action) => {
      users.loading.friends = false;
      users.friends = [...users.friends, ...action.payload.friends];
    },
    getFriendsFailed: (users, action) => {
      users.loading.friends = false;
      users.error.friends = action.payload.error;
    },
    addFriendRequested: (users) => {
      users.loading.add = true;
      users.error.add = null;
      users.success.add = false;
    },
    addFriendSuccess: (users, action) => {
      users.loading.add = false;
      users.success.add = true;
      const idx = users.people.findIndex(
        (x) => x._id === action.payload.friendId
      );
      users.people[idx].isPending = true;
      users.pendingRequests.push({ ...users.people[idx], status: 1 });
    },
    addFriendFailed: (users, action) => {
      users.loading.add = false;
      users.error.add = action.payload.error;
    },
    addFriendReset: (users) => {
      users.success.add = false;
    },
    acceptFriendRequested: (users) => {
      users.loading.accept = true;
      users.error.accept = null;
    },
    acceptFriendSuccess: (users, action) => {
      users.loading.accept = false;
      users.success.accept = true;
      users.friends.push(action.payload.friend);
      users.friendRequests = users.friendRequests.filter(
        (friend) => friend._id !== action.payload.friend._id
      );
    },
    acceptFriendFailed: (users, action) => {
      users.loading.accept = false;
      users.error.accept = action.payload.error;
    },
    acceptFriendReset: (users) => {
      users.success.accept = false;
    },
    rejectFriendRequested: (users) => {
      users.loading.reject = true;
      users.error.reject = null;
      users.success.reject = false;
    },
    rejectFriendSuccess: (users, action) => {
      users.loading.reject = false;
      users.success.reject = true;
      const idx = users.friendRequests.findIndex(
        (x) => x._id === action.payload._id
      );
      users.friendRequests.splice(idx, 1);
    },
    rejectFriendFailed: (users, action) => {
      users.loading.reject = false;
      users.error.reject = action.payload.error;
    },
    friendRequestAdded: (users, action) => {
      users.friendRequests.unshift(action.payload.friendRequest);
      const idx = users.people.findIndex(
        (x) => x._id === action.payload.friendRequest._id
      );
      if (idx !== -1) {
        users.people[idx].status = 2;
      }
    },
    friendRequestAccepted: (users, action) => {
      users.friends.push(action.payload.friend);
      users.pendingRequests = users.pendingRequests.filter(
        (x) => x._id !== action.payload.friend._id
      );
    },
    searchUsersRequested: (users) => {
      users.loading.search = true;
      users.error.search = null;
      users.success.search = false;
    },
    searchUsersSuccess: (users, action) => {
      users.loading.search = false;
      users.success.search = true;
      users.searchResults = action.payload;
    },
    searchUsersFailed: (users) => {
      users.loading.search = false;
      users.error.search = "Something wen't wrong";
    },
    clearSearchResults: (users) => {
      users.searchResults = [];
      users.success.search = false;
    },
  },
});

export const {
  getUserRequested,
  getUserSuccess,
  getUserFailed,
  viewUserRequested,
  viewUserSuccess,
  viewUserFailed,
  updateUserRequested,
  updateUserSuccess,
  updateUserFailed,
  uploadCoverRequested,
  uploadCoverSuccess,
  uploadCoverFailed,
  uploadProfileRequested,
  uploadProfileSuccess,
  uploadProfileFailed,
  deletePhotoRequested,
  deletePhotoSuccess,
  deletePhotoFailed,
  getPeopleRequested,
  getPeopleSuccess,
  getPeopleFailed,
  getFriendsRequested,
  getFriendsSuccess,
  getFriendsFailed,
  addFriendRequested,
  addFriendSuccess,
  addFriendFailed,
  addFriendReset,
  acceptFriendRequested,
  acceptFriendSuccess,
  acceptFriendFailed,
  acceptFriendReset,
  rejectFriendRequested,
  rejectFriendSuccess,
  rejectFriendFailed,
  friendRequestAdded,
  friendRequestAccepted,
  searchUsersRequested,
  searchUsersSuccess,
  searchUsersFailed,
  clearSearchResults,
} = slice.actions;
export default slice.reducer;

// Selectors
export const selectRecentPhotos = createSelector(
  (users) => users.user.photos,
  (photos) => {
    const sorted = [...photos].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    return sorted.slice(0, 6);
  }
);

function dispatchError(dispatch, fn, error) {
  dispatch(
    fn({
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Something went wrong. Please try again',
    })
  );
}

function filterByStatus(arr, status) {
  return arr
    .filter((el) => el.status === status)
    .map((el) => ({
      status: el.status,
      ...el.recipientInfo,
    }));
}

export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch(getUserRequested());
    const { auth } = getState();
    const { data } = await axios({
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
      url: `/api/v1/users/${auth.user._id}`,
    });
    const friends = filterByStatus(data.friends, 3);
    dispatch(
      getUserSuccess({
        user: _.omit(data, ['friends']),
        friends,
        friendRequests: filterByStatus(data.friends, 2),
        pendingRequests: filterByStatus(data.friends, 1),
        birthdays: friends.filter((friend) => {
          const bdate = new Date(friend.birthdate);
          const now = new Date();
          if (
            bdate.getDate() === now.getDate() &&
            bdate.getMonth() === now.getMonth()
          )
            return true;
          return false;
        }),
      })
    );
  } catch (error) {
    dispatchError(dispatch, getUserFailed, error);
  }
};

export const viewUserProfile = (id) => async (dispatch, getState) => {
  try {
    dispatch(viewUserRequested());
    const { auth } = getState();
    const { data } = await axios({
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
      url: `/api/v1/users/${id}`,
    });
    dispatch(
      viewUserSuccess({
        ...data,
        friends: filterByStatus(data.friends, 3),
      })
    );
  } catch (error) {
    dispatchError(dispatch, viewUserFailed, error);
  }
};

export const updateUser = (fields) => async (dispatch, getState) => {
  try {
    dispatch(updateUserRequested());
    const { auth } = getState();
    await axios({
      method: 'patch',
      url: `/api/v1/users/${auth.user._id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
      data: fields,
    });
    dispatch(updateUserSuccess({ fields }));
    toast.success('Profile updated successfully!', {
      autoClose: 3000,
      hideProgressBar: true,
    });
  } catch (error) {
    dispatchError(dispatch, updateUserFailed, error);
    toast.warn("Something wen't wrong!", {
      autoClose: 3000,
      hideProgressBar: true,
    });
  }
};

export const uploadCover = (formData) => async (dispatch, getState) => {
  try {
    dispatch(uploadCoverRequested());
    const { auth } = getState();
    const { data } = await axios({
      method: 'post',
      url: '/api/v1/users/cover',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${auth.token}`,
      },
      data: formData,
    });
    dispatch(uploadCoverSuccess({ coverImage: data.newCover }));
    toast.success('Cover photo changed!', {
      autoClose: 3000,
      hideProgressBar: true,
    });
  } catch (error) {
    dispatchError(dispatch, uploadCoverFailed, error);
    toast.warn("Something wen't wrong!", {
      autoClose: 3000,
      hideProgressBar: true,
    });
  }
};

export const uploadProfile = (formData) => async (dispatch, getState) => {
  try {
    dispatch(uploadProfileRequested());
    const { auth } = getState();
    const { data } = await axios({
      method: 'post',
      url: '/api/v1/users/profile',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${auth.token}`,
      },
      data: formData,
    });
    dispatch(
      uploadProfileSuccess({
        profileImage: data.newProfile,
      })
    );
    toast.success('Profile photo changed!', {
      autoClose: 3000,
      hideProgressBar: true,
    });
    dispatch(updateAuthorImage({ profileImage: data.newProfile }));
  } catch (error) {
    dispatchError(dispatch, uploadProfileFailed, error);
    toast.warn("Something wen't wrong!", {
      autoClose: 3000,
      hideProgressBar: true,
    });
  }
};

export const deletePhoto = (photoId) => async (dispatch, getState) => {
  try {
    dispatch(deletePhotoRequested());
    const { auth } = getState();
    await axios({
      method: 'delete',
      url: `/api/v1/users/photos/${photoId}`,
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    dispatch(deletePhotoSuccess({ _id: photoId }));
    toast.success('Photo deleted successfully!', {
      autoClose: 3000,
      hideProgressBar: true,
    });
  } catch (error) {
    dispatchError(dispatch, deletePhotoFailed, error);
    toast.warn("Something wen't wrong!", {
      autoClose: 3000,
      hideProgressBar: true,
    });
  }
};

export const getPeople = () => async (dispatch, getState) => {
  try {
    dispatch(getPeopleRequested());
    const { auth } = getState();
    const { data } = await axios({
      url: '/api/v1/users',
      headers: { Authorization: `Bearer ${auth.token}` },
    });
    dispatch(getPeopleSuccess({ people: data }));
  } catch (error) {
    dispatchError(dispatch, getPeopleFailed, error);
  }
};

export const getFriends = (userId) => async (dispatch, getState) => {
  try {
    dispatch(getFriendsRequested());
    const { auth } = getState();
    const { data } = await axios({
      url: `/api/v1/users/${userId}/friends`,
      headers: { Authorization: `Bearer ${auth.token}` },
    });
    dispatch(getFriendsSuccess({ friends: data.friends }));
  } catch (error) {
    dispatchError(dispatch, getFriendsFailed, error);
  }
};

export const addFriend = (recipient) => async (dispatch, getState) => {
  try {
    dispatch(addFriendRequested());
    const { auth } = getState();
    const { data } = await axios({
      method: 'post',
      url: `/api/v1/users/${recipient._id}/friends`,
      headers: { Authorization: `Bearer ${auth.token}` },
    });

    dispatch(addFriendSuccess({ friendId: data.recipientId }));
  } catch (error) {
    dispatchError(dispatch, addFriendFailed, error);
  }
};

export const acceptRequest = (friend) => async (dispatch, getState) => {
  try {
    dispatch(acceptFriendRequested());
    const { auth } = getState();
    await axios({
      method: 'put',
      url: `/api/v1/users/${friend._id}/friends`,
      headers: { Authorization: `Bearer ${auth.token}` },
    });
    dispatch(acceptFriendSuccess({ friend }));
  } catch (error) {
    dispatchError(dispatch, acceptFriendFailed, error);
  }
};

export const rejectRequest = (id) => async (dispatch, getState) => {
  try {
    dispatch(rejectFriendRequested());
    const { auth } = getState();
    await axios({
      method: 'delete',
      url: `/api/v1/users/${id}/friends`,
      headers: { Authorization: `Bearer ${auth.token}` },
    });
    dispatch(rejectFriendSuccess({ _id: id }));
  } catch (error) {
    dispatchError(dispatch, rejectFriendFailed, error);
  }
};

export const searchUsers = (q) => async (dispatch, getState) => {
  try {
    dispatch(searchUsersRequested());
    const { auth } = getState();
    const { data } = await axios({
      url: '/api/v1/users/search',
      headers: { Authorization: `Bearer ${auth.token}` },
      params: { q },
    });
    dispatch(searchUsersSuccess(data));
  } catch (error) {
    dispatchError(dispatch, searchUsersFailed, error);
  }
};
