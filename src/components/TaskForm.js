import React, { useState } from "react";
import "../App.css";

function TaskForm({ edit, onSubmit }) {
  //setting the state
  const [taskName, setTaskName] = useState(edit ? edit.name : "");
  const [taskDescription, setTaskDescription] = useState(
    edit ? edit.description : ""
  );


  //adding a new task
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName.trim() || !taskDescription.trim()) {
      return;
    }

    const taskData = {
      id: Date.now(),
      name: taskName,
      description: taskDescription,
      isComplete: false,
    };
    onSubmit(taskData);
    setTaskDescription("");
    setTaskName("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      {/*if we are editing the displayed button is update task instead of add task*/}
      {edit ? (
        <>
          <div className="edit">
            <input
              type="text"
              placeholder="Update the name of the Task"
              value={taskName}
              className="task-name"
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Update the description of the Task"
              value={taskDescription}
              className="task-description"
              onChange={(e) => setTaskDescription(e.target.value)}
              required
            />
            <button className="task-btn">Update Task</button>
          </div>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter the name of the Task"
            value={taskName}
            className="task-name"
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter the description of the Task"
            value={taskDescription}
            className="task-description"
            onChange={(e) => setTaskDescription(e.target.value)}
            required
          />
          <button className="task-btn">Add Task</button>
        </>
      )}
    </form>
  );
}

export default TaskForm;
