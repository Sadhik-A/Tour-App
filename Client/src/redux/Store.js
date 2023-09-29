// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Userslice';
import tourReducer from './Tourslice';
import thunk from 'redux-thunk'; 
export const store = configureStore({
  reducer: {
    user: userReducer, 
    Tour: tourReducer
  },
  middleware: [thunk],
});
