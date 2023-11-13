"use client";

import { useContext } from "react";
import BoardTask from "./BoardTask";
import { Contact, Subtask, Task } from "../types";
import { DnDContext } from "../contexts/DnD.context";
import { patchTaskStatus } from "../helper/serverActions";

const DropArea = ({
  status,
  tasks,
  contacts,
  subtasks,
}: {
  status: string;
  tasks: Task[];
  contacts: Contact[];
  subtasks: Subtask[];
}) => {
  const { task } = useContext(DnDContext);

  const handleDrop = () => {
    if (task)
      patchTaskStatus(task, status).then((res) => {
        if (res) console.error(res.message);
      });
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

  if (tasks.length === 0)
    return (
      <div className="w-full h-full" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        <span className="w-full flex flex-row items-center justify-center bg-gray-200 border-gray-500 text-gray-500 border-dotted border-2 rounded-xl p-2">
          No tasks {getText()}
        </span>
      </div>
    );

  if (tasks && contacts && tasks.length > 0)
    return (
      <div className="w-full overflow-x-auto h-full" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        <div className="flex flex-row lg:flex-col gap-4 w-fit lg:w-full">
          {tasks.map((item) => (
            <BoardTask key={item.id} task={item} contacts={contacts} subtasks={subtasks} />
          ))}
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
