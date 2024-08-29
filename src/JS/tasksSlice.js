import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    completedTasks: [],
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    completeTask: (state, action) => {
      const taskIndex = state.tasks.findIndex(
        (task) => task.id === action.payload
      );
      state.tasks[taskIndex].isComplete = !state.tasks[taskIndex].isComplete;
      state.completedTasks = state.tasks.filter((task) => task.isComplete);
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      state.completedTasks = state.tasks.filter((task) => task.isComplete);
    },
    updateTask: (state, action) => {
      const { id, newTask } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...newTask };
    },
  },
});

export const { addTask, completeTask, removeTask, updateTask } =
  tasksSlice.actions;

export default tasksSlice.reducer;
