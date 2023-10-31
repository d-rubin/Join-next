"use client";

import { createContext, ReactNode, useCallback, useMemo, useState } from "react";
import { Task } from "../types";

export const DnDContext = createContext<{ task: Task | null; updateDraggedTask: (task: Task | null) => void }>({
  task: null,
  updateDraggedTask: () => null,
});

export const DnDContextProvider = ({ children }: { children: ReactNode }) => {
  const [task, setTask] = useState<Task | null>(null);

  const updateDraggedTask = useCallback((draggedTask: Task | null) => {
    setTask(draggedTask);
  }, []);

  const value = useMemo(() => {
    return {
      task,
      updateDraggedTask,
    };
  }, [task, updateDraggedTask]);

  return <DnDContext.Provider value={value}>{children}</DnDContext.Provider>;
};
