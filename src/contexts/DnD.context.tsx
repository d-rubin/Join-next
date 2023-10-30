"use client";

import { createContext, ReactNode, useState } from "react";
import { Task } from "../types";

export const DnDContext = createContext<{ task: Task | null; updateDraggedTask: (task: Task | null) => void }>({
  task: null,
  updateDraggedTask: () => null,
});

export const DnDContextProvider = ({ children }: { children: ReactNode }) => {
  const [task, setTask] = useState<Task | null>(null);

  const updateDraggedTask = (draggedTask: Task | null) => {
    setTask(draggedTask);
  };

  return <DnDContext.Provider value={{ task, updateDraggedTask }}>{children}</DnDContext.Provider>;
};
