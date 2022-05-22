import axios from "axios";
import { createSlice, createSelector } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

import { updateAuthorImage } from "./posts";

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;

const slice = createSlice({
    name: "users",
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
    },
    reducers: {
        getUserRequested: (users, action) => {
            users.loading.get = true;
            users.error.get = null;
        },
        getUserSuccess: (users, action) => {
            users.loading.get = false;
            users.user = action.payload.user;
            users.friends = action.payload.friends;
            users.friendRequests = action.payload.friendRequests;
            users.pendingRequests = action.payload.pendingRequests;
        },
        getUserFailed: (users, action) => {
            users.loading.get = false;
            users.error.get = action.payload.error;
        },
        viewUserRequested: (users, action) => {
            users.loading.view = true;
            users.error.view = null;
        },
        viewUserSuccess: (users, action) => {
            users.loading.view = false;
            users.viewUser = action.payload.user;
        },
        viewUserFailed: (users, action) => {
            users.loading.view = false;
            users.error.view = action.payload.error;
        },
        updateUserRequested: (users, action) => {
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
                } 
            };
        },
        updateUserFailed: (users, action) => {
            users.loading.update = false;
            users.error.update = action.payload.error;
        },
        uploadCoverRequested: (users, action) => {
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
        uploadProfileRequested: (users, action) => {
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
        deletePhotoRequested: (users, action) => {
            users.loading.photo = true;
            users.error.photo = null;
        },
        deletePhotoSuccess: (users, action) => {
            users.loading.photo = false;
            users.user.photos = users.user.photos.filter(x => x._id !== action.payload._id);
        },
        deletePhotoFailed: (users, action) => {
            users.loading.photo = false;
            users.error.photo = action.payload.error;
        },
        getPeopleRequested: (users, action) => {
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
        getFriendsRequested: (users, action) => {
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
        addFriendRequested: (users, action) => {
            users.loading.add = true;
            users.error.add = null;
            users.success.add = false;
        },
        addFriendSuccess: (users, action) => {
            users.loading.add = false;
            users.success.add = true;
        },
        addFriendFailed: (users, action) => {
            users.loading.add = false;
            users.error.add = action.payload.error;
        },
        acceptFriendRequested: (users, action) => {
            users.loading.accept = true;
            users.error.accept = null;
        },
        acceptFriendSuccess: (users, action) => {
            users.loading.accept = false;
            users.friends.push(action.payload.friend);
            users.friendRequests = users.friendRequests.filter(
                friend => friend._id !== action.payload.friend._id
            );
        },
        acceptFriendFailed: (users, action) => {
            users.loading.accept = false;
            users.error.accept = action.payload.error;
        },
        rejectFriendRequested: (users, action) => {
            users.loading.reject = true;
            users.error.reject = null;
        },
        rejectFriendSuccess: (users, action) => {
            users.loading.reject = false;
            users.friendRequests = users.friendRequests.filter(
                friend => friend._id !== action.payload._id
            );
        },
        rejectFriendFailed: (users, action) => {
            users.loading.reject = false;
            users.error.reject = action.payload.error;
        },
    },
});

const actions = slice.actions;
export default slice.reducer;

// Selectors
export const selectRecentPhotos = createSelector(
    users => users.user.photos,
    photos => {
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
                    : "Something went wrong. Please try again",
        })
    );
}

export const getUserDetails = () => async (dispatch, getState) => {
    try {
        dispatch(actions.getUserRequested());
        const { auth } = getState();
        const { data } = await axios({
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
            url: `/users/${auth.user._id}`,
        });
        dispatch(
            actions.getUserSuccess({
                user: {
                    _id: data._id,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    username: data.username,
                    middlename: data.middlename,
                    email: data.email,
                    profileImage: data.profileImage,
                    coverImage: data.coverImage,
                    birthdate: data.birthdate,
                    sex: data.sex,
                    address: data.address,
                    phone: data.phone,
                    bio: data.bio,
                    photos: data.photos,
                    school: data.school,
                },
                friends: data.friends
                    .filter(el => el.status === 3)
                    .map(el => ({
                        status: el.status,
                        ...el.recipientInfo,
                    })),
                friendRequests: data.friends
                    .filter(el => el.status === 2)
                    .map(el => ({
                        status: el.status,
                        ...el.recipientInfo,
                    })),
                pendingRequests: data.friends
                    .filter(el => el.status === 1)
                    .map(el => ({
                        status: el.status,
                        ...el.recipientInfo,
                    })),
            })
        );
    } catch (error) {
        dispatchError(dispatch, actions.getUserFailed, error);
    }
};

export const viewUserProfile = id => async (dispatch, getState) => {
    try {
        dispatch(actions.viewUserRequested());
        const { auth } = getState();
        const { data } = await axios({
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
            url: `/users/${id}`,
        });
        dispatch(actions.viewUserSuccess({ user: data }));
    } catch (error) {
        dispatchError(dispatch, actions.viewUserFailed, error);
    }
};

export const updateUser =
    (fields) =>
    async (dispatch, getState) => {
        try {
            dispatch(actions.updateUserRequested());
            const { auth } = getState();
            const { data } = await axios({
                method: "patch",
                url: `/users/${auth.user._id}`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.token}`,
                },
                data: fields,
            });
            dispatch(actions.updateUserSuccess({ fields: fields }));
            toast.success(`Profile updated successfully!`, {
                autoClose: 3000,
                hideProgressBar: true,
            });
        } catch (error) {
            dispatchError(dispatch, actions.updateUserFailed, error);
            toast.warn(`Something wen't wrong!`, {
                autoClose: 3000,
                hideProgressBar: true,
            });
        }
    };

export const uploadCover = formData => async (dispatch, getState) => {
    try {
        dispatch(actions.uploadCoverRequested());
        const { auth } = getState();
        const { data } = await axios({
            method: "post",
            url: `/users/cover`,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${auth.token}`,
            },
            data: formData,
        });
        dispatch(actions.uploadCoverSuccess({ coverImage: data.newCover }));
        toast.success(`Cover photo changed!`, {
            autoClose: 3000,
            hideProgressBar: true,
        });
    } catch (error) {
        dispatchError(dispatch, actions.uploadCoverFailed, error);
        toast.warn(`Something wen't wrong!`, {
            autoClose: 3000,
            hideProgressBar: true,
        });
    }
};

export const uploadProfile = formData => async (dispatch, getState) => {
    try {
        dispatch(actions.uploadProfileRequested());
        const { auth } = getState();
        const { data } = await axios({
            method: "post",
            url: `/users/profile`,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${auth.token}`,
            },
            data: formData,
        });
        dispatch(
            actions.uploadProfileSuccess({
                profileImage: data.newProfile,
            })
        );
        toast.success(`Profile photo changed!`, {
            autoClose: 3000,
            hideProgressBar: true,
        });
        dispatch(updateAuthorImage({profileImage: data.newProfile}))
    } catch (error) {
        dispatchError(dispatch, actions.uploadProfileFailed, error);
        toast.warn(`Something wen't wrong!`, {
            autoClose: 3000,
            hideProgressBar: true,
        });
    }
};

export const deletePhoto = photoId => async (dispatch, getState) => {
    try {
        dispatch(actions.deletePhotoRequested());
        const { auth } = getState();
        const { data } = await axios({
            method: "delete",
            url: `/users/photos/${photoId}`,
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
        });
        dispatch(actions.deletePhotoSuccess({_id: photoId}));
        toast.success(`Photo deleted successfully!`, {
            autoClose: 3000,
            hideProgressBar: true,
        });
    } catch (error) {
        dispatchError(dispatch, actions.deletePhotoFailed, error);
        toast.warn(`Something wen't wrong!`, {
            autoClose: 3000,
            hideProgressBar: true,
        });
    }
};

export const getPeople = () => async (dispatch, getState) => {
    try {
        dispatch(actions.getPeopleRequested());
        const { auth } = getState();
        const { data } = await axios({
            url: "/users",
            headers: { Authorization: `Bearer ${auth.token}` },
        });
        dispatch(actions.getPeopleSuccess({ people: data }));
    } catch (error) {
        dispatchError(dispatch, actions.getPeopleFailed, error);
    }
};

export const getFriends = userId => async (dispatch, getState) => {
    try {
        dispatch(actions.getFriendsRequested());
        const { auth } = getState();
        const { data } = await axios({
            url: `/users/${userId}/friends`,
            headers: { Authorization: `Bearer ${auth.token}` },
        });
        dispatch(actions.getFriendsSuccess({ friends: data.friends }));
    } catch (error) {
        dispatchError(dispatch, actions.getFriendsFailed, error);
    }
};

export const addFriend = recipient => async (dispatch, getState) => {
    try {
        dispatch(actions.addFriendRequested());
        const { auth } = getState();
        const { data } = await axios({
            method: "post",
            url: `/users/${recipient._id}/friends`,
            headers: { Authorization: `Bearer ${auth.token}` },
        });

        const { data: data2 } = await axios({
            method: "post",
            url: `/notifications`,
            headers: { Authorization: `Bearer ${auth.token}` },
            data: {
                to: {
                    _id: recipient._id,
                    fullname: `${recipient.firstname} ${recipient.lastname}`,
                    image: recipient.profileImage,
                },
                type: "friendrequest",
            },
        });
        dispatch(
            actions.addFriendSuccess({ recipient: data.recipient })
            // push notification
        );
    } catch (error) {
        dispatchError(dispatch, actions.addFriendFailed, error);
    }
};

export const acceptRequest = friend => async (dispatch, getState) => {
    try {
        dispatch(actions.acceptFriendRequested());
        const { auth } = getState();
        const { data } = await axios({
            method: "put",
            url: `/users/${friend._id}/friends`,
            headers: { Authorization: `Bearer ${auth.token}` },
        });
        dispatch(actions.acceptFriendSuccess({ friend: friend }));
    } catch (error) {
        dispatchError(dispatch, actions.acceptFriendFailed, error);
    }
};

export const rejectRequest = id => async (dispatch, getState) => {
    try {
        dispatch(actions.rejectFriendRequested());
        const { auth } = getState();
        const { data } = await axios({
            method: "delete",
            url: `/users/${id}/friends`,
            headers: { Authorization: `Bearer ${auth.token}` },
        });
        dispatch(actions.rejectFriendSuccess({ _id: id }));
    } catch (error) {
        dispatchError(dispatch, actions.rejectFriendFailed, error);
    }
};

// export const rejectRequest =
//     ({ userId, token }) =>
//     async (dispatch) => {
//         dispatch({ type: users.rejectFriendRequested });
//         try {
//             const { data } = await axios.delete(
//                 `${process.env.REACT_APP_API_ENDPOINT}/users/${userId}/friends`,
//                 {},
//                 {
//                     headers: { Authorization: `Bearer ${token}` },
//                 }
//             );
//             dispatch({
//                 type: users.rejectFriendSuccess,
//                 payload: { ...data, userId },
//             });
//         } catch (error) {
//             dispatch({
//                 type: users.rejectFriendFailed,
//                 payload:
//                     error.response && error.data.message
//                         ? error.response.data.message
//                         : error.message,
//             });
//         }
//     };
