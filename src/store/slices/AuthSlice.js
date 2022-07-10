import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  uid: null,
  isLoading: true
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
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
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
  setIsLoading,
  setUserProperty
} = authSlice.actions;

export default authSlice.reducer;
