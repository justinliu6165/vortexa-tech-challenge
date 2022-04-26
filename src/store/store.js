import { configureStore } from '@reduxjs/toolkit';
import fetchDataReducer from '../features/app/appSlice';

export const store = configureStore({
  reducer: {
    app: fetchDataReducer
  },
});
