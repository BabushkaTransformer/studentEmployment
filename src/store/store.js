import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit';
import { authAPI } from './services/AuthService';
import { vacancyAPI } from './services/VacancyService';
import { forumAPI } from './services/ForumService';
import authSlice from './slices/AuthSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  [authAPI.reducerPath]: authAPI.reducer,
  [vacancyAPI.reducerPath]: vacancyAPI.reducer,
  [forumAPI.reducerPath]: forumAPI.reducer
});

const serviceMiddlewares = [
  authAPI.middleware,
  vacancyAPI.middleware,
  forumAPI.middleware
]

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(serviceMiddlewares)
})