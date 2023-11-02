"use client";

import { Fragment, useContext, useState } from "react";
import { Contact, Task } from "../types";
import { generalHelper, getAssignee, getBackgroundForCategory } from "../helper/generalHelper";
import { DnDContext } from "../contexts/DnD.context";
import AddTaskFormMobile from "./forms/AddTask/AddTaskFormMobile";
import { updateTask } from "../helper/serverActions";
import Icon from "./Icon";

const BoardTask = ({ task, contacts }: { task: Task; contacts: Contact[] }) => {
  const { updateDraggedTask } = useContext(DnDContext);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<boolean>(false);

  const deleteTask = () => {};

  return (
    <Fragment key={task.id}>
      <div
        className="p-4 min-w-40 w-52 bg-white rounded-3xl flex flex-col justify-between gap-2 lg:h-fit lg:w-full cursor-pointer"
        draggable
        onDragStart={() => updateDraggedTask(task)}
        onDragEnd={() => updateDraggedTask(null)}
        onClick={() => setDialogOpen(true)}
      >
        <p
          className="text-white px-4 py-1 w-fit rounded-lg"
          style={{ backgroundColor: getBackgroundForCategory(task.category) }}
        >
          {generalHelper(task.category)}
        </p>
        <p className="text-lg font-bold">{task.title}</p>
        <p>{task.description}</p>
        <p>Assigned to: {getAssignee(task.assignee, contacts)}</p>
      </div>
      <dialog className="fixed top-0 left-0 w-screen h-full bg-transparent" open={dialogOpen}>
        <div className="flex items-center justify-center w-full h-full bg-transparent">
          <div className=" w-fit h-fit bg-white rounded-3xl p-4 min-w-[20rem] relative">
            {editTask ? (
              <AddTaskFormMobile
                contacts={contacts}
                action={updateTask}
                task={task}
                text="Edit"
                icon="pencil"
                className=""
              />
            ) : (
              <div className="gap-2 flex flex-col relative">
                <Icon icon="x" onClick={() => setDialogOpen(false)} />
                <p
                  className="text-white px-4 py-1 w-fit rounded-lg"
                  style={{ backgroundColor: getBackgroundForCategory(task.category) }}
                >
                  {generalHelper(task.category)}
                </p>
                <p className="text-lg font-bold">{task.title}</p>
                <p>{task.description}</p>
                <span className="flex flex-row gap-2">
                  <p className="w-1/3">Assigned to:</p>
                  <p className="w-2/2"> {getAssignee(task.assignee, contacts)}</p>
                </span>
                <span className="flex flex-row gap-2">
                  <p className="w-1/3">Due Date:</p>
                  <p className="w-2/2">
                    {new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" }).format(
                      new Date(task.due_date),
                    )}
                  </p>
                </span>
                <span className="flex flex-row gap-2">
                  <p className="w-1/3">Priority:</p>
                  <p className="w-2/2">
                    {task.priority.charAt(0).toUpperCase()}
                    {task.priority.slice(1)}
                  </p>
                </span>
                <span className="flex flex-row gap-2 w-full justify-end">
                  <Icon
                    rounded-2xl
                    icon="pencil"
                    iconSize="h-8 w-8"
                    className="border-primary border-2 rounded-lg"
                    onClick={() => setEditTask(true)}
                  />
                  <Icon
                    icon="trash"
                    iconSize="h-8 w-8"
                    className="border-primary border-2 rounded-lg"
                    onClick={deleteTask}
                  />
                </span>
              </div>
            )}
          </div>
        </div>
      </dialog>
    </Fragment>
  );
};

export default BoardTask;
