import * as users from '../constants/userConstants';

const userReducer = (state, action) => {
    switch (action.type) {
        case users.getProfileRequested:
            return { ...state, loadingProfile: true };
        case users.getProfileSuccess:
            return { 
                ...state, 
                profile: action.payload, 
                loadingProfile: false 
            };
        case users.getProfileFailed:
            return {
                ...state,
                loadingProfile: false,
                errorProfile: action.payload,
            };

        case users.getUserRequested:
            return { ...state, loadingUser: true };
        case users.getUserSuccess:
            console.log('success')
            return {
                ...state,
                user: {
                    _id: action.payload._id,
                    firstname: action.payload.firstname,
                    lastname: action.payload.lastname,
                    middlename: action.payload.middlename,
                    email: action.payload.email,
                    profileImage: action.payload.profileImage,
                    coverImage: action.payload.coverImage,
                    birthdate: action.payload.birthdate,
                    sex: action.payload.sex,
                    address: action.payload.address,
                    phone: action.payload.phone,
                    school: action.payload.school,
                    status: action.payload.status,
                    bio: action.payload.bio,
                },
                profile: {
                    _id: action.payload._id,
                    firstname: action.payload.firstname,
                    lastname: action.payload.lastname,
                    middlename: action.payload.middlename,
                    email: action.payload.email,
                    profileImage: action.payload.profileImage,
                    coverImage: action.payload.coverImage,
                    birthdate: action.payload.birthdate,
                    sex: action.payload.sex,
                    address: action.payload.address,
                    phone: action.payload.phone,
                    school: action.payload.school,
                    status: action.payload.status,
                    bio: action.payload.bio,
                    friends: action.payload.userFriends.filter(
                        el => el.status === 3
                    ).map(el => ({status: el.status, ...el.recipientInfo})),
                    friendRequests: action.payload.userFriends.filter(
                        el => el.status === 2
                    ).map(el => ({status: el.status, ...el.recipientInfo})),
                },
                friends: action.payload.userFriends.filter(
                    el => el.status === 3
                ),
                friendRequests: action.payload.userFriends.filter(
                    el => el.status === 2
                ),
                loadingUser: false,
            };
        case users.getUserFailed:
            return {
                ...state,
                loadingUser: false,
                errorUser: action.payload,
            };

        case users.updateUserRequested:
            return { ...state, loadingUpdateUser: true };
        case users.updateUserSuccess:
            if (action.payload._id == state.user._id) {
                return {
                    ...state,
                    profile: { ...state.profile, ...action.payload },
                    user: { ...state.user, ...action.payload },
                    loadingUpdateUser: false,
                    errorUpdateUser: action.payload,
                };
            }
            return {
                ...state,
                profile: { ...state.profile, ...action.payload },
                loadingUpdateUser: false,
                errorUpdateUser: action.payload,
            };
        case users.updateUserFailed:
            return {
                ...state,
                errorUpdateUser: action.payload,
                loadingUpdateUser: false,
            };

        case users.getUsersRequested:
            return { ...state, loadingPeople: true };
        case users.getUsersSuccess:
            return { ...state, people: action.payload, loadingPeople: false };
        case users.getUsersFailed:
            return {
                ...state,
                loadingPeople: false,
                errorPeople: action.payload,
            };

        case users.getFriendsRequested:
            return { ...state, loadingFriends: true };
        case users.getFriendsSuccess:
            return {
                ...state,
                friends: action.payload.filter(el => el.status === 3),
                friendRequests: action.payload.filter(el => el.status === 2),
                loadingFriends: false,
            };
        case users.getFriendsFailed:
            return {
                ...state,
                loadingFriends: false,
                errorFriends: action.payload,
            };
        case users.uploadCoverRequested:
            return { ...state, uploadCoverLoading: true };
        case users.uploadCoverSuccess:
            return {
                ...state,
                user: {
                    ...state.user,
                    coverImage: action.payload.user.coverImage,
                },
                uploadCoverLoading: false,
            };
        case users.uploadCoverFailed:
            return {
                ...state,
                uploadCoverLoading: false,
                uploadCoverError: action.payload,
            };
        case users.uploadProfileRequested:
            return { ...state, uploadProfileLoading: true };
        case users.uploadProfileSuccess:
            return {
                ...state,
                user: {
                    ...state.user,
                    profileImage: action.payload.user.profileImage,
                },
                uploadProfileLoading: false,
            };
        case users.uploadProfileFailed:
            return {
                ...state,
                uploadProfileLoading: false,
                uploadProfileError: action.payload,
            };

        case users.addFriendRequested:
            return {
                ...state,
                addFriendLoading: true,
                addFriendSuccess: false,
            };
        case users.addFriendSuccess:
            return {
                ...state,
                addFriendSuccess: true,
                addFriendLoading: false,
            };
        case users.addFriendFailed:
            return {
                ...state,
                addFriendLoading: false,
                addFriendError: action.payload,
            };

        case users.confirmFriendRequested:
            return { ...state, confirmFriendLoading: true };
        case users.confirmFriendSuccess:
            return {
                ...state,
                friends: [...state.friends, { ...action.payload.friend }],
                friendRequests: state.friendRequests.filter(
                    friend => friend._id !== action.payload.friend._id
                ),
                confirmFriendLoading: false,
            };
        case users.confirmFriendFailed:
            return {
                ...state,
                confirmFriendLoading: false,
                confirmFriendError: action.payload,
            };

        case users.rejectFriendRequested:
            return { ...state, rejectFriendLoading: true };
        case users.rejectFriendSuccess:
            return {
                ...state,
                friendRequests: state.friendRequests.filter(
                    el => el._id !== action.payload.userId
                ),
                rejectFriendLoading: false,
            };
        case users.rejectFriendFailed:
            return {
                ...state,
                rejectFriendLoading: false,
                rejectFriendError: action.payload,
            };

        default:
            throw new Error('Invalid action type');
    }
};

export default userReducer;
