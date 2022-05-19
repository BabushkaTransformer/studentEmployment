import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  uid: null
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUid: (state, action) => {
      state.uid = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserProperty: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload
      };
    },
  },
});

export const {
  setUid,
  setUser,
  setUserProperty
} = authSlice.actions;

export default authSlice.reducer;
