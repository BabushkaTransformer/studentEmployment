import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit';

import authSlice from './slices/AuthSlice';
import { authAPI } from './services/AuthService';
import { vacancyAPI } from './services/VacancyService';
import { forumAPI } from './services/ForumService';
import { resumeAPI } from './services/ResumeService';
import { eventAPI } from './services/EventService';
import { imageLoaderAPI } from './services/ImageLoaderService';

const rootReducer = combineReducers({
  auth: authSlice,
  [authAPI.reducerPath]: authAPI.reducer,
  [vacancyAPI.reducerPath]: vacancyAPI.reducer,
  [forumAPI.reducerPath]: forumAPI.reducer,
  [resumeAPI.reducerPath]: resumeAPI.reducer,
  [eventAPI.reducerPath]: eventAPI.reducer,
  [imageLoaderAPI.reducerPath]: imageLoaderAPI.reducer
});

const serviceMiddlewares = [
  authAPI.middleware,
  vacancyAPI.middleware,
  forumAPI.middleware,
  resumeAPI.middleware,
  eventAPI.middleware,
  imageLoaderAPI.middleware
]

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(serviceMiddlewares)
})