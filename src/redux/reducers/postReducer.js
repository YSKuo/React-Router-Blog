import { createSlice } from "@reduxjs/toolkit";
import {
  getPost as getPostAPI,
  sendNewPost,
  editOldPost,
  deletePost as deletePostAPI,
} from "../../WebAPI";

export const postReducer = createSlice({
  name: "posts",
  initialState: {
    isLoadingPost: false,
    post: "",
    newPostResponse: null,
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

export const {
  setIsLoadingPost,
  setPost,
  setNewPostResponse,
} = postReducer.actions;

export const getPost = (id) => (dispatch) => {
  dispatch(setIsLoadingPost(true));
  getPostAPI(id)
    .then((res) => {
      dispatch(setPost(res[0]));
      dispatch(setIsLoadingPost(false));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const newPost = (data) => (dispatch) => {
  // return promise
  return sendNewPost(data).then((res) => {
    // return promise 這個方法解決發文頁面重複出現舊文的狀況
    // 可以不用 dispatch(setNewPostResponse(res));
    // newPostResponse 這個 state 其實也可省去
    return res;
  });
};

export const editPost = (data) => (dispatch) => {
  return editOldPost(data).then((res) => {
    return res;
  });
};

export const deletePost = (data) => (dispatch) => {
  return deletePostAPI(data).then((res) => {
    return res;
  });
};

export default postReducer.reducer;
