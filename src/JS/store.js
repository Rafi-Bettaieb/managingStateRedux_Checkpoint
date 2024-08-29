import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../JS/tasksSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});
