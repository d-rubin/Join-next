"use client";

import { useContext, useEffect, useState } from "react";
import BoardTask from "./BoardTask";
import { Contact, Task } from "../types";
import { DnDContext } from "../contexts/DnD.context";
import { patchTaskStatus } from "../helper/serverActions";

const DropArea = ({ tasks, contacts, status }: { tasks: Task[]; contacts: Contact[]; status: string }) => {
  const { task } = useContext(DnDContext);
  const [tasksMatchingStatus, setTasksMatchingStatus] = useState<Task[]>();
  const handleDrop = () => {
    if (task) patchTaskStatus(task, status);
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

  useEffect(() => {
    console.log("useEffect Triggered");
    setTasksMatchingStatus(tasks.filter((item) => item.status === status));
  }, [status, tasks]);

  if (tasksMatchingStatus?.length === 0)
    return (
      <div className="w-full h-full" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        <span className="w-full flex flex-row items-center justify-center bg-gray-200 border-gray-500 text-gray-500 border-dotted border-2 rounded-xl p-2">
          No tasks {getText()}
        </span>
      </div>
    );

  if (tasksMatchingStatus && tasksMatchingStatus.length > 0)
    return (
      <div className="w-full overflow-x-auto h-full" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        <div className="flex flex-row lg:flex-col gap-4 w-fit lg:w-full">
          {tasksMatchingStatus?.map((item) => <BoardTask key={item.id} task={item} contacts={contacts} />)}
        </div>
      </div>
    );

  return (
    <div className="flex flex-row lg:flex-col gap-4 w-fit lg:w-full">
      <div className="animate-pulse bg-gray-500 min-w-40 h-40 w-40 rounded-3xl lg:h-40 lg:w-full" />
      <div className="animate-pulse bg-gray-500 min-w-40 h-40 w-40 rounded-3xl lg:h-40 lg:w-full" />
      <div className="animate-pulse bg-gray-500 min-w-40 h-40 w-40 rounded-3xl lg:h-40 lg:w-full" />
    </div>
  );
};

export default DropArea;
