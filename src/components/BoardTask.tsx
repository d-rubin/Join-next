"use client";

import { Fragment, KeyboardEvent, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDrag } from "react-dnd";
import { TSubtask, TTask } from "../types";
import { firstCharToUpperCase, getBackgroundForCategory, getIconForPriority } from "../utils/generalHelper";
import { useSubTasks } from "../contexts/subtaskContext";

const BoardTask = ({
  task,
  subTasks,
  setOpenDialog,
  setEditTask,
}: {
  task: TTask;
  subTasks: TSubtask[];
  setOpenDialog: (bool: boolean) => void;
  setEditTask: (bool: boolean) => void;
}) => {
  const { setTask } = useSubTasks();
  const [{}, dragRef] = useDrag({
    type: "boardTask",
    item: task,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleTaskKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") setOpenDialog(true);
  };

  const getDoneSubtasks = (): number => {
    let count = 0;
    subTasks?.forEach((item) => {
      if (item.is_done) count++;
    });
    return count;
  };

  const openDialog = () => {
    setOpenDialog(true);
    setEditTask(false);
    setTask && setTask(task);
  };

  useEffect(() => {
    const clickEventCallback = (event: MouseEvent) => {
      if ((event.target as HTMLElement)?.classList.contains("Dialog")) {
        setOpenDialog(false);
        setEditTask(false);
      }
    };

    document.addEventListener("click", clickEventCallback);
    return document.removeEventListener("click", clickEventCallback);
  }, [setEditTask, setOpenDialog]);

  return (
    <Fragment key={uuidv4()}>
      <div
        className="min-w-40 flex w-52 cursor-pointer flex-col justify-start gap-2 rounded-3xl bg-white p-4 outline-none transition-all focus-visible:bg-grey dark:bg-bgDark dark:focus-visible:bg-primary lg:h-fit lg:w-full"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        ref={dragRef}
        draggable
        onClick={openDialog}
        onKeyDown={(e) => handleTaskKeyDown(e)}
      >
        <p
          className="w-fit rounded-lg px-4 py-1 text-white"
          style={{ backgroundColor: getBackgroundForCategory(task.category) }}
        >
          {firstCharToUpperCase(task.category)}
        </p>
        <p className="text-lg font-bold dark:text-textDark">{task.title}</p>
        <p className="text-gray-500 dark:text-gray-400">{task.description}</p>
        <div className="flex w-full items-center justify-between gap-4">
          <span className="flex w-full flex-row items-center gap-2">
            <span className="block h-3 w-full rounded-md bg-gray-200 dark:bg-gray-400">
              <span
                style={{
                  width: `${
                    subTasks && !Number.isNaN(getDoneSubtasks() / subTasks.length)
                      ? (getDoneSubtasks() / subTasks.length) * 100
                      : 0
                  }%`,
                }}
                className="block h-3 rounded-md bg-underline transition-all"
              />
            </span>
            {!!subTasks?.length && (
              <p className="dark:text-textDark">
                {getDoneSubtasks()}/{subTasks.length}
              </p>
            )}
          </span>
          <span className="flex w-fit justify-end align-bottom">{getIconForPriority(task.priority)}</span>
        </div>
      </div>
    </Fragment>
  );
};

export default BoardTask;
