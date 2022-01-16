import * as actions from '../constants/postConstants';

const postReducer = (state, action) => {
   switch (action.type) {
      case actions.createPostRequested:
         return {
            ...state,
            loadingCreate: true,
            errorCreate: null,
            successCreate: false,
         };
      case actions.createPostSuccess:
         return { ...state, loadingCreate: false, successCreate: true };
      case actions.createPostFailed:
         return {
            ...state,
            loadingCreate: false,
            errorCreate: action.payload,
            successCreate: false,
         };
      case actions.uploadProgress:
         return { ...state, uploadPercentage: action.payload };
      case actions.uploadFinished:
         return { ...state, uploadPercentage: null };

      case actions.getPostRequested:
         return { ...state, loadingGet: true, errorGet: null };
      case actions.getPostSuccess:
         return { ...state, loadingGet: false, post: action.payload };
      case actions.getPostFailed:
         return { ...state, loadingGet: false, errorGet: action.payload };

      case actions.reactPostRequested:
         return { ...state, loadingReact: false, successReact: false };
      case actions.reactPostSuccess:
         return {
            ...state,
            loadingReact: false,
            updatedReactions: action.payload.result.reactions,
            successReact: true,
         };
      case actions.reactPostFailed:
         return { ...state, loadingReact: false, successReact: false };

      case actions.createCommentRequested:
         return { ...state, loadingComment: true, successComment: false };
      case actions.createCommentSuccess:
         return {
            ...state,
            loadingComment: false,
            updatedComments: action.payload.comments,
            successComment: true,
         };
      case actions.createCommentFailed:
         return { ...state, loadingComment: false, successComment: false };
      case actions.createCommentReset:
         return { ...state, successComment: false, updatedComments: null };

      case actions.reactCommentRequested:
         return {
            ...state,
            loadingCommentReact: false,
            successCommentReact: false,
         };
      case actions.reactCommentSuccess:
         return {
            ...state,
            loadingCommentReact: false,
            successCommentReact: true,
            updatedComments: action.payload,
         };
      case actions.reactCommentFailed:
         return {
            ...state,
            loadingCommentReact: false,
            successCommentReact: false,
         };
      case actions.reactCommentReset:
         return {
            ...state,
            updatedPost: null,
            successCommentReact: false,
         };

      default:
         throw new Error('Invalid action type');
   }
};

export default postReducer;
