import React from "react";
import { useSelector, useDispatch } from "react-redux";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import {
  completeTask,
  removeTask,
  updateTask,
  addTask,
} from "../JS/tasksSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import "../App.css";

function TaskList() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const completedTasks = useSelector((state) => state.tasks.completedTasks);
  const nonCompletedTasks = tasks.filter((task) => !task.isComplete);

  //add a task
  const handleAddTask = (task) => {
    dispatch(addTask(task));
  };

  //to filter the completed tasks and change the value of the completion of the task when clicking of a task
  const handleCompleteTask = (id) => {
    dispatch(completeTask(id));
  };

  //removing a task
  const handleRemoveTask = (id) => {
    dispatch(removeTask(id));
  };

  //update a task
  const handleUpdateTask = (id, newTask) => {
    dispatch(updateTask({ id, newTask }));
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        {/*display all the tasks*/}
        <Routes>
          <Route
            path="/"
            element={
              <div>
                {tasks.length ? (
                  <p className="nb">
                    You have completed {completedTasks.length} out of{" "}
                    {tasks.length}
                  </p>
                ) : (
                  <p className="nb">
                    you have no tasks, please enter a new task
                  </p>
                )}
                <TaskForm onSubmit={handleAddTask} />
                <TaskItem
                  tasks={tasks}
                  completeTask={handleCompleteTask}
                  removeTask={handleRemoveTask}
                  updateTask={handleUpdateTask}
                />
              </div>
            }
          />
          {/*display the completed tasks*/}
          <Route
            path="/completed"
            element={
              <TaskItem
                tasks={completedTasks}
                completeTask={handleCompleteTask}
                removeTask={handleRemoveTask}
                updateTask={handleUpdateTask}
              />
            }
          />
          {/*display the incompleted tasks*/}
          <Route
            path="noncompleted"
            element={
              <TaskItem
                tasks={nonCompletedTasks}
                completeTask={handleCompleteTask}
                removeTask={handleRemoveTask}
                updateTask={handleUpdateTask}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default TaskList;
