import React, { useContext, useReducer } from 'react';
import reducer from './reducers/postReducer';

const PostsContext = React.createContext();

const initialState = {
  posts: []
};

export const PostsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <PostsContext.Provider value={{ ...state, dispatch }} >
      {children}
    </PostsContext.Provider>
  );
};

export const usePostsContext = () => {
  return useContext(PostsContext);
};
