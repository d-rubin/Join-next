import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from "react";
import useSWR from "swr";
import { Tags, TSubtask, TTask } from "../types";
import { getSubtasks } from "../utils/serverActions";
import { isErrorResponse } from "../utils/generalHelper";

const SubtaskContext = createContext<{
  subtasks: TSubtask[];
  task?: TTask;
  setTask?: Dispatch<SetStateAction<TTask | undefined>>;
}>({
  subtasks: [],
});

export const SubtaskProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useSWR(Tags.Subtasks, getSubtasks);
  const [task, setTask] = useState<TTask>();

  const getSubtasksForTask = useMemo(() => {
    if (data && !isErrorResponse(data) && task) {
      return data.filter((subtask) => subtask.task === task.id);
    }
    return [];
  }, [data, task]);

  const value = useMemo(() => ({ subtasks: getSubtasksForTask, task, setTask }), [getSubtasksForTask, task]);

  return <SubtaskContext.Provider value={value}>{children}</SubtaskContext.Provider>;
};

export const useSubTasks = () => useContext(SubtaskContext);
