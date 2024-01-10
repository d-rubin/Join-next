"use client";

import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSWRConfig } from "swr";
import BoardTask from "./BoardTask";
import { Contact, TSubtask, Task } from "../types";
import { DnDContext } from "../contexts/DnD.context";
import { patchTaskStatus } from "../utils/serverActions";

const DropArea = ({
  status,
  tasks,
  contacts,
  subtasks,
}: {
  status: string;
  tasks: Task[];
  contacts: Contact[];
  subtasks: TSubtask[];
}) => {
  const { task } = useContext(DnDContext);
  const { mutate } = useSWRConfig();

  const handleDrop = () => {
    if (task)
      patchTaskStatus(task, status).then((res) => {
        // eslint-disable-next-line no-console
        if (res && "message" in res) console.error(res.message);
        mutate("board");
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
      <div className="h-full w-full" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        <span className="flex w-full flex-row items-center justify-center rounded-xl border-2 border-dotted border-gray-500 bg-gray-200 p-2 text-gray-500">
          No tasks {getText()}
        </span>
      </div>
    );

  if (tasks && contacts && tasks.length > 0)
    return (
      <div className="h-full w-full overflow-x-auto" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        <div className="flex w-fit flex-row gap-4 lg:w-full lg:flex-col">
          {tasks.map((item) => (
            <BoardTask key={uuidv4()} task={item} contacts={contacts} subtasks={subtasks} />
          ))}
        </div>
      </div>
    );

  return (
    <div className="flex w-fit flex-row gap-4 lg:w-full lg:flex-col">
      <div className="min-w-40 h-40 w-40 animate-pulse rounded-3xl bg-gray-500 lg:h-40 lg:w-full" />
      <div className="min-w-40 h-40 w-40 animate-pulse rounded-3xl bg-gray-500 lg:h-40 lg:w-full" />
      <div className="min-w-40 h-40 w-40 animate-pulse rounded-3xl bg-gray-500 lg:h-40 lg:w-full" />
    </div>
  );
};

export default DropArea;
