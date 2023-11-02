"use client";

import { Fragment, useContext, useState } from "react";
import { Contact, Task } from "../types";
import { generalHelper, getAssignee, getBackgroundForCategory } from "../helper/generalHelper";
import { DnDContext } from "../contexts/DnD.context";
import AddTaskFormMobile from "./forms/AddTask/AddTaskFormMobile";
import { updateTask } from "../helper/serverActions";

const BoardTask = ({ task, contacts }: { task: Task; contacts: Contact[] }) => {
  const { updateDraggedTask } = useContext(DnDContext);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

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
          <div className=" w-fit h-fit bg-white rounded-3xl p-10">
            <AddTaskFormMobile
              contacts={contacts}
              action={updateTask}
              task={task}
              text="Edit"
              icon="pencil"
              className=""
            />
          </div>
        </div>
      </dialog>
    </Fragment>
  );
};

export default BoardTask;
