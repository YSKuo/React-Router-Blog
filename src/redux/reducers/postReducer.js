import { createSlice } from '@reduxjs/toolkit';
import { getPost as getPostAPI, sendNewPost } from '../../WebAPI';

export const postReducer = createSlice({
  name: 'posts',
  initialState: {
    isLoadingPost: false,
    post: '',
    newPostResponse: null
  },
  reducers: {
    setIsLoadingPost: (state, action) => {
      state.isLoadingPost = action.payload;
    },
    setPost: (state, action) => {
      state.post = action.payload;
    },
    setNewPostResponse: (state, action) => {
      state.newPostResponse = action.payload;
    },
  },
});

export const { setIsLoadingPost, setPost, setNewPostResponse } = postReducer.actions;

export const getPost = (id) => dispatch => {
  dispatch(setIsLoadingPost(true));
  getPostAPI(id).then(res => {
    dispatch(setPost(res[0]));
    dispatch(setIsLoadingPost(false));
  }).catch(err => {
    console.log(err);
  })
};

export const newPost = data => dispatch => {
  return sendNewPost(data).then((res) => {
    dispatch(setNewPostResponse(res));
    return res;
  });
};

export default postReducer.reducer;
