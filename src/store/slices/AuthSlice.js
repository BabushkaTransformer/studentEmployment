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
    }
  },
});

export const {
  setUid,
  setUser
} = authSlice.actions;

export default authSlice.reducer;
