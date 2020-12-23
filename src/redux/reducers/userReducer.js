import { createSlice } from "@reduxjs/toolkit";
import { getMe as getMeAPI, login } from "../../WebAPI";

export const userReducer = createSlice({
  name: "users",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userReducer.actions;

export const getMe = () => (dispatch) => {
  return getMeAPI().then((res) => {
    if (res.ok) {
      dispatch(setUser(res.data));
    }
    return res;
  });
};

export const logout = () => (dispatch) => {
  dispatch(setUser(null));
};

export default userReducer.reducer;
