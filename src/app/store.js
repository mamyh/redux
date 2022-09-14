import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import authSliceReducer from '../features/auth/authSlice';
import consversationsSliceReducer from '../features/conversations/consversationsSlice';
import messageSliceReducer from '../features/messages/messageSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]:apiSlice.reducer,
    auth:authSliceReducer,
    messages:messageSliceReducer,
    conversations:consversationsSliceReducer
  },
  devTools:process.env.NODE_ENV !== 'production',
  middleware:(getDefaultMiddlewares)=>getDefaultMiddlewares().concat(apiSlice.middleware)
  
});
