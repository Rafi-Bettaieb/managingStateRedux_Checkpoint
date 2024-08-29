import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import TaskForm from "./TaskForm";
import { completeTask, removeTask, updateTask } from "../JS/tasksSlice";
import "../App.css";

function TaskItem({ tasks }) {
  //setting the state
  const [edit, setEdit] = useState({
    id: null,
    name: "",
    description: "",
    isComplete: false,
  });

  const dispatch = useDispatch();

  // update the new task
  const submitUpdate = (val) => {
    const updatedTask = {
      ...val,
      isComplete: edit.isComplete,
    };
    dispatch(updateTask({ id: edit.id, newTask: updatedTask }));
    setEdit({
      id: null,
      name: "",
      description: "",
      isComplete: false,
    });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      dispatch(removeTask(id));
    }
  };

  if (edit.id) {
    return <TaskForm edit={edit} onSubmit={submitUpdate} />;
  }

  //convert the id of the task to a date to keep track of the last modification
  const getDate = (x) => {
    const today = new Date(x);
    const formattedDate = today.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
    return `${formattedDate}`;
  };
  
  //displaying all the tasks
  return (
    <div className="task-grid">
      {tasks.map((task) => (
        <div className="task-container" key={task.id}>
          <div
            className={task.isComplete ? "complete" : "incomplete"}
            onClick={() => dispatch(completeTask(task.id))}
          >
            <div>
            {task.name}
              <br />
              {task.description}
              <br />
              <>Last Modification on {getDate(task.id)}</>
            </div>
            <div className="icons">
              <MdDelete
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(task.id);
                }}
                className="delete-icon"
              />
              <FaEdit
                onClick={(e) => {
                  e.stopPropagation();
                  setEdit({
                    id: task.id,
                    name: task.name,
                    description: task.description,
                    isComplete: task.isComplete,
                  });
                }}
                className="edit-icon"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskItem;
