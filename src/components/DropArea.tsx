"use client";

import { useState } from "react";
import BoardTask from "./BoardTask";
import { Contact, Task } from "../types";
import { patchTaskStatus } from "../helper/serverActions";

const DropArea = ({ tasks, contacts, status }: { tasks: Task[]; contacts: Contact[]; status: string }) => {
  const [draggedTask, setDraggedTask] = useState<Task>();
  const handleDrop = () => {
    if (draggedTask) patchTaskStatus(draggedTask, status);
    console.log(draggedTask);
  };

  const getText = () => {
    switch (status) {
      case "toDo":
        return "to do";
      case "inProgress":
        return "in progress";
      case "awaitingFeedback":
        return "awaiting feedback";
      default:
        return "done";
    }
  };

  const tasksMatchingStatus = tasks.filter((task) => task.status === status);
  if (tasksMatchingStatus.length === 0)
    return (
      <div className="w-full h-full" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        <span className="w-full flex flex-row items-center justify-center bg-gray-200 border-gray-500 text-gray-500 border-dotted border-2 rounded-xl p-2">
          No tasks {getText()}
        </span>
      </div>
    );

  return (
    <div className="w-full overflow-x-auto h-full" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      <div className="flex flex-row lg:flex-col gap-4 w-fit lg:w-full">
        {tasksMatchingStatus.map((task) => (
          <BoardTask key={task.id} task={task} contacts={contacts} setTask={setDraggedTask} />
        ))}
      </div>
    </div>
  );
};

export default DropArea;
