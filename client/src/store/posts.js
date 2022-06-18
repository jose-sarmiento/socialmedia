import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const slice = createSlice({
  name: 'posts',
  initialState: {
    post: null,
    list: [],
    myPosts: [],
    userPosts: [],
    loading: {},
    error: {},
    success: {},
  },
  reducers: {
    createPostRequested: (posts) => {
      posts.loading.create = true;
      posts.error.create = false;
      posts.success.create = false;
    },
    createPostSuccess: (posts, action) => {
      posts.loading.create = false;
      posts.success.create = true;
      posts.uploadPercentage = null;
      posts.myPosts.unshift(action.payload.post);
    },
    createPostFailed: (posts, action) => {
      posts.loading.create = false;
      posts.error.create = action.payload.error;
    },
    uploadProgress: (posts, action) => {
      posts.uploadPercentage = action.payload.progress;
    },
    sharePostRequested: (posts) => {
      posts.loading.share = true;
      posts.error.share = false;
      posts.success.share = false;
    },
    sharePostSuccess: (posts, action) => {
      const { userId, sharedPostId, post } = action.payload;
      posts.loading.share = false;
      posts.success.share = true;
      posts.myPosts.unshift(post);
      // increase meta share
      const inListIdx = posts.list.findIndex((x) => x._id === sharedPostId);
      if (inListIdx >= 0) {
        posts.list[inListIdx].meta.shares += 1;
        posts.list[inListIdx].rePosters.push(userId);
      }
      if (posts.post && posts.post._id === sharedPostId) {
        posts.post.meta.shares += 1;
        posts.post.rePosters.push(userId);
      }
    },
    sharePostFailed: (posts, action) => {
      posts.loading.share = false;
      posts.error.share = action.payload.error;
    },
    getPostRequested: (posts) => {
      posts.loading.get = true;
      posts.error.get = false;
    },
    getPostSuccess: (posts, action) => {
      posts.loading.get = false;
      const comments = action.payload.post.comments.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      posts.post = { ...action.payload.post, comments };
    },
    getPostFailed: (posts, action) => {
      posts.loading.get = false;
      posts.error.get = action.payload.error;
    },
    deletePostRequested: (posts) => {
      posts.loading.delete = true;
      posts.error.delete = null;
      posts.success.delete = false;
    },
    deletePostSuccess: (posts, action) => {
      const { deletedPost, userId } = action.payload;
      posts.loading.delete = false;
      posts.success.delete = true;
      // remove from my posts
      let idx = posts.myPosts.findIndex((x) => x._id === deletedPost._id);
      posts.myPosts.splice(idx, 1);
      // update original post
      idx = posts.list.findIndex((x) => x._id === deletedPost.sharedPost);
      if (idx !== -1) {
        posts.list[idx].meta.shares -= 1;
        const reposterIdx = posts.list[idx].rePosters.indexOf(userId);
        posts.list[idx].rePosters.splice(reposterIdx, 1);
      }
      // remove from single post
      if (posts.post && posts.post._id === deletedPost._id) {
        posts.post = null;
      }
    },
    deletePostFailed: (posts, action) => {
      posts.loading.delete = false;
      posts.error.delete = action.payload.error;
    },
    deletePostReset: (posts) => {
      posts.success.delete = false;
    },
    setSharePost: (posts, action) => {
      posts.postToBeShared = action.payload;
    },
    unsetSharePost: (posts) => {
      posts.postToBeShared = undefined;
    },
    listPostsSuccess: (posts, action) => {
      posts.loading.list = false;
      posts.list = [...new Set([...posts.list, ...action.payload.posts])];
    },
    listMyPostsSuccess: (posts, action) => {
      posts.loading.myPosts = false;
      posts.myPosts = [...new Set([...posts.myPosts, ...action.payload.posts])];
    },
    listMyPostsReset: (posts) => {
      posts.myPosts = [];
    },
    listUserPostsSuccess: (posts, action) => {
      posts.loading.userPosts = false;
      posts.userPosts = [
        ...new Set([...posts.userPosts, ...action.payload.posts]),
      ];
    },
    createCommentRequested: (posts) => {
      posts.loading.createComment = true;
      posts.error.createComment = false;
      posts.success.createComment = false;
    },
    createCommentSuccess: (posts, action) => {
      posts.loading.createComment = false;
      posts.success.createComment = true;

      if (posts.post?._id === action.payload.postId) {
        posts.post.comments.push(action.payload.comment);
        posts.post.meta.comments += 1;
      }

      let idx = posts.list.findIndex(
        (item) => item._id === action.payload.postId
      );
      if (idx >= 0) {
        posts.list[idx].comments.push(action.payload.comment);
        posts.list[idx].meta.comments += 1;
      }

      // check if post is in myPosts
      idx = posts.myPosts.findIndex(
        (item) => item._id === action.payload.postId
      );
      if (idx >= 0) {
        posts.myPosts[idx].comments.push(action.payload.comment);
        posts.myPosts[idx].meta.comments += 1;
      }
    },
    createCommentFailed: (posts, action) => {
      posts.loading.createComment = false;
      posts.error.createComment = action.payload.error;
    },
    reactPostRequested: (posts) => {
      posts.loading.reactPost = true;
      posts.error.reactPost = false;
      posts.success.reactPost = false;
    },
    reactPostSuccess: (posts, action) => {
      const { postId, reactorId } = action.payload;
      posts.loading.reactPost = false;
      posts.success.reactPost = true;

      let idx;
      let ridx;

      if (posts.post && posts.post._id === postId) {
        ridx = posts.post.reactors.findIndex((id) => id === reactorId);

        if (ridx === -1) {
          posts.post.reactors.push(reactorId);
          posts.post.meta.likes += 1;
        } else {
          posts.post.reactors.splice(ridx, 1);
          posts.post.meta.likes -= 1;
        }
      }

      idx = posts.list.findIndex((x) => x._id === postId);

      // update if in posts list
      if (idx >= 0) {
        ridx = posts.list[idx].reactors.findIndex((id) => id === reactorId);
        if (ridx < 0) posts.list[idx].reactors.push(reactorId);
        else posts.list[idx].reactors.splice(ridx, 1);
      }

      // check if post is in myPosts
      idx = posts.myPosts.findIndex((item) => item._id === postId);

      if (idx >= 0) {
        ridx = posts.myPosts[idx].reactors.findIndex((id) => id === reactorId);
        if (ridx < 0) posts.myPosts[idx].reactors.push(reactorId);
        else posts.myPosts[idx].reactors.splice(ridx, 1);
      }
    },
    reactPostFailed: (posts, action) => {
      posts.loading.reactPost = false;
      posts.error.reactPost = action.payload.error;
    },
    reactCommentRequested: (posts) => {
      posts.loading.reactComment = true;
      posts.error.reactComment = false;
      posts.success.reactionType = null;
    },
    reactCommentSuccess: (posts, action) => {
      posts.loading.reactComment = false;
      posts.success.reactComment = true;

      const idx = posts.post.comments.findIndex(
        (item) => item._id === action.payload.commentId
      );
      if (action.payload.created) {
        posts.post.comments[idx].meta.likes += 1;
        posts.post.comments[idx].reactors.push(action.payload.userId);
        posts.success.reactionType = 'created';
      } else {
        const ridx = posts.post.comments[idx].reactors.findIndex(
          (x) => x.userId
        );
        posts.post.comments[idx].meta.likes -= 1;
        posts.post.comments[idx].reactors.splice(ridx, 1);
        posts.success.reactionType = 'deleted';
      }
    },
    reactCommentFailed: (posts, action) => {
      posts.loading.reactComment = false;
      posts.error.reactComment = action.payload.error;
    },
    updateAuthorImage: (posts, action) => {
      posts.myPosts = posts.myPosts.map((x) => ({
        ...x,
        author: {
          ...x.author,
          profileImage: action.payload.profileImage.path,
        },
      }));
    },
    createReplyRequested: (posts) => {
      posts.loading.createReply = true;
      posts.error.createReply = null;
    },
    createReplySuccess: (posts, action) => {
      posts.loading.createReply = false;
      posts.createdReply = action.payload.reply;

      const idx = posts.post.comments.findIndex(
        (item) => item._id === action.payload.commentId
      );

      posts.post.comments[idx].meta.replies += 1;
      posts.post.comments[idx].replies.push(action.payload.reply);
    },
    createReplyFailed: (posts) => {
      posts.loading.createReply = false;
      posts.error.createReply = "Something wen't wrong";
    },
    createReplyReset: (posts) => {
      posts.createdReply = null;
    },
    reactReplyRequested: (posts) => {
      posts.loading.reactReply = true;
      posts.error.reactReply = false;
      posts.success.replyReactionType = null;
    },
    reactReplySuccess: (posts, action) => {
      posts.loading.reactReply = false;
      posts.success.reactReply = true;

      const idx = posts.post.comments.findIndex(
        (item) => item._id === action.payload.commentId
      );

      const replyIdx = posts.post.comments[idx].replies.findIndex(
        (item) => item._id === action.payload.replyId
      );

      if (action.payload.created) {
        posts.post.comments[idx].replies[replyIdx].meta.likes += 1;
        posts.post.comments[idx].replies[replyIdx].reactors.push(
          action.payload.userId
        );
        posts.success.replyReactionType = 'created';
      } else {
        const reactionIdx = posts.post.comments[idx].replies[
          replyIdx
        ].reactors.findIndex((x) => x.userId === action.payload.userId);
        posts.post.comments[idx].replies[replyIdx].meta.likes -= 1;
        posts.post.comments[idx].replies[replyIdx].reactors.splice(
          reactionIdx,
          1
        );
        posts.success.replyReactionType = 'deleted';
      }
    },
    reactReplyFailed: (posts, action) => {
      posts.loading.reactReply = false;
      posts.error.reactReply = action.payload.error;
    },
  },
});

export const {
  createPostRequested,
  createPostSuccess,
  createPostFailed,
  uploadProgress,
  sharePostRequested,
  sharePostSuccess,
  sharePostFailed,
  getPostRequested,
  getPostSuccess,
  getPostFailed,
  deletePostRequested,
  deletePostSuccess,
  deletePostFailed,
  deletePostReset,
  setSharePost,
  unsetSharePost,
  listPostsSuccess,
  listMyPostsSuccess,
  listMyPostsReset,
  listUserPostsSuccess,
  createCommentRequested,
  createCommentSuccess,
  createCommentFailed,
  reactPostRequested,
  reactPostSuccess,
  reactPostFailed,
  reactCommentRequested,
  reactCommentSuccess,
  reactCommentFailed,
  updateAuthorImage,
  createReplyRequested,
  createReplySuccess,
  createReplyFailed,
  createReplyReset,
  reactReplySuccess,
  reactReplyFailed,
  reactReplyRequested,
} = slice.actions;

export default slice.reducer;

// selectors

// actions to dispatch
export const createPost = (post) => async (dispatch, getState) => {
  try {
    dispatch(createPostRequested());
    const { auth } = getState();
    const response = await axios({
      method: 'post',
      url: '/api/v1/posts',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${auth.token}`,
      },
      data: post,
      onUploadProgress: (progressEvent) => {
        dispatch(
          uploadProgress({
            // eslint-disable-next-line radix
            progress: parseInt(
              Math.round(progressEvent.loaded * 100) / progressEvent.total
            ),
          })
        );
      },
    });
    dispatch(createPostSuccess({ post: response.data }));
  } catch (error) {
    dispatch(
      createPostFailed({
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
  }
};

export const sharePost = (params) => async (dispatch, getState) => {
  const { post, authorName, postId } = params;
  try {
    dispatch(sharePostRequested());
    const { auth } = getState();
    const response = await axios({
      method: 'post',
      url: `/api/v1/posts/${post.sharedPost}/shares`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
      data: post,
    });
    dispatch(
      sharePostSuccess({
        post: response.data,
        sharedPostId: postId,
        userId: auth.user._id,
      })
    );
    toast.success(`You shared ${authorName}'s post`, {
      autoClose: 3000,
      hideProgressBar: true,
    });
  } catch (error) {
    dispatch(
      sharePostFailed({
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
    toast.warn("Something wen't wrong", {
      autoClose: 3000,
      hideProgressBar: true,
    });
  }
};

export const getPost = (id) => async (dispatch, getState) => {
  try {
    dispatch(getPostRequested());
    const { auth } = getState();

    const response = await axios({
      headers: { Authorization: `Bearer ${auth.token}` },
      url: `/api/v1/posts/${id}`,
    });

    dispatch(getPostSuccess({ post: response.data }));
  } catch (error) {
    dispatch(
      getPostFailed({
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
  }
};

export const deletePost = (id) => async (dispatch, getState) => {
  try {
    dispatch(deletePostRequested());
    const { auth } = getState();

    const { data } = await axios({
      method: 'delete',
      headers: { Authorization: `Bearer ${auth.token}` },
      url: `/api/v1/posts/${id}`,
    });

    dispatch(
      deletePostSuccess({
        deletedPost: data.deletedPost,
        userId: auth.user._id,
      })
    );
    toast.success('Post deleted successfully', {
      autoClose: 3000,
      hideProgressBar: true,
    });
  } catch (error) {
    dispatch(
      deletePostFailed({
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
  }
};

export const createComment =
  (postId, comment) => async (dispatch, getState) => {
    try {
      dispatch(createCommentRequested());
      const { auth } = getState();

      const response = await axios({
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        url: `/api/v1/posts/${postId}/comments`,
        data: { comment },
      });

      dispatch(
        createCommentSuccess({
          comment: response.data.comment,
          postId,
        })
      );
    } catch (error) {
      dispatch(
        createCommentFailed({
          error:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
      );
    }
  };

export const reactPost = (postId, authorName) => async (dispatch, getState) => {
  try {
    dispatch(reactPostRequested());
    const { auth } = getState();

    const response = await axios({
      method: 'patch',
      url: `/api/v1/posts/${postId}/likes`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
    });

    dispatch(
      reactPostSuccess({
        ...response.data,
        postId,
        reactorId: auth.user._id,
      })
    );
    if (response.data.deleted) {
      return toast.success(`You unlike  ${authorName}'s post`, {
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
    return toast.success(`You like ${authorName}'s post`, {
      autoClose: 3000,
      hideProgressBar: true,
    });
  } catch (error) {
    dispatch(
      reactPostFailed({
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
    return toast.warn("Something wen't wrong", {
      autoClose: 3000,
      hideProgressBar: true,
    });
  }
};

export const reactComment =
  (postId, authorName, commentId) => async (dispatch, getState) => {
    try {
      dispatch(reactCommentRequested());
      const { auth } = getState();

      const { data } = await axios({
        method: 'post',
        url: `/api/v1/posts/${postId}/comments/${commentId}/likes`,
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      dispatch(
        reactCommentSuccess({
          ...data,
          postId,
          commentId,
          userId: auth.user._id,
        })
      );
      if (data.created) {
        toast.success(`You like ${authorName}'s comment`, {
          autoClose: 3000,
          hideProgressBar: true,
        });
      } else {
        toast.success(`You unlike ${authorName}'s comment`, {
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    } catch (error) {
      dispatch(
        reactCommentFailed({
          error:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
      );
      toast.warn("Something wen't wrong", {
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

export const createReply =
  (postId, commentId, reply) => async (dispatch, getState) => {
    try {
      dispatch(createReplyRequested());
      const { auth } = getState();

      const { data } = await axios({
        method: 'post',
        url: `/api/v1/posts/${postId}/comments/${commentId}/replies`,
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        data: { reply },
      });

      dispatch(
        createReplySuccess({
          ...data,
          postId,
          commentId,
          userId: auth.user._id,
        })
      );
      toast.success('Reply added', {
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) {
      dispatch(
        createReplyFailed({
          error:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
      );

      toast.warn("Something wen't wrong", {
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

export const reactReply =
  (postId, commentId, replyId) => async (dispatch, getState) => {
    try {
      dispatch(reactReplyRequested());
      const { auth } = getState();

      const { data } = await axios({
        method: 'put',
        url: `/api/v1/posts/${postId}/comments/${commentId}/replies/${replyId}/likes`,
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      dispatch(
        reactReplySuccess({
          ...data,
          postId,
          commentId,
          replyId,
        })
      );
      if (data.created) {
        toast.success('Success like reply!', {
          autoClose: 3000,
          hideProgressBar: true,
        });
      } else {
        toast.success('Like removed!', {
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    } catch (error) {
      dispatch(
        reactReplyFailed({
          error:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
      );

      toast.warn("Something wen't wrong", {
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };
