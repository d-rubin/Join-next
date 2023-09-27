"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import plusIcon from "../../../img/plus.svg";
import { getContacts, getTasks, updateTask } from "../../../helper/fetchApi";
import { Task, User } from "../../../interface";
import { generalHelper, getAssignee, getBackgroundForCategory } from "../../../helper/generalHelper";
import TaskDialog from "../../../components/TaskDialog/TaskDialog";

const BoardPage = () => {
  const [draggedTask, setDraggedTask] = useState<Task>();
  const [tasks, setTasks] = useState<Task[]>();
  const [openedTask, setOpenedTask] = useState<Task>();
  const [contacts, setContacts] = useState<User[]>();
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    Promise.all([getTasks(), getContacts()]).then(([tasksResponse, contactsResponse]) => {
      setTasks(tasksResponse);
      setContacts(contactsResponse);
    });
  }, []);

  const handleTaskClick = (task: Task) => {
    setOpenedTask(task);
    dialogRef.current?.showModal();
  };

  const getTasksByStatus = (status: string, contactArray: User[]) => {
    return tasks?.map((task: Task) => {
      if (task?.status === status) {
        return (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <article
            className="p-4 bg-white rounded-3xl flex flex-col gap-2 h-fit cursor-pointer"
            draggable
            // @ts-ignore
            onClick={() => handleTaskClick(task)}
            onDragStart={() => setDraggedTask(task)}
            key={task.id}
          >
            <p
              className="text-white px-4 py-1 w-fit rounded-lg"
              style={{ backgroundColor: getBackgroundForCategory(task.category) }}
            >
              {generalHelper(task.category)}
            </p>
            <p className="text-lg font-bold">{task.title}</p>
            <p>{task.description}</p>
            <p>Assigned to: {getAssignee(task.assignee, contactArray)}</p>
          </article>
        );
      }

      return null;
    });
  };

  const updateStatus = (status: string) => {
    const updatedTask: Task = { ...draggedTask!, ...{ status } };
    updateTask(updatedTask).then(async () => {
      setTasks(await getTasks());
    });
  };

  const closeDialog = useCallback(() => {
    dialogRef.current?.close();
    console.log("close triggered");
  }, [dialogRef]);

  return (
    <>
      {openedTask && <TaskDialog task={openedTask} closeDialog={closeDialog} contacts={contacts} />}
      {tasks && contacts && (
        <div className="flex flex-col gap-4 max-w-screen-lg">
          <div className="flex justify-between w-full">
            <h2 className="text-4xl font-bold cursor-default">Board</h2>
            <Link href="/add-task">
              <button className="w-fit h-10 px-4 bg-[--color-primary] rounded-lg text-white text-xl">
                <Image width={18} height={18} src={plusIcon} alt="Add Task" />
              </button>
            </Link>
          </div>
          <div className="flex flex-col gap-4 lg:flex-row lg:overflow-y-auto max-h-[43rem]">
            <div className="flex flex-col gap-2">
              <p className="font-bold text-xl">To do</p>
              <span
                onDrop={() => updateStatus("toDo")}
                onDragOver={(event) => event.preventDefault()}
                className="flex w-full max-w-full min-h-40 h-40 lg:min-h-fit lg:h-auto overflow-x-auto overflow-y-hidden lg:overflow-x-hidden lg:overflow-y-auto gap-4 lg:flex-col lg:w-fit"
              >
                {getTasksByStatus("toDo", contacts)}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold text-xl">In Progress</p>
              <span
                onDrop={() => updateStatus("inProgress")}
                onDragOver={(event) => event.preventDefault()}
                className="flex w-full max-w-full min-h-40 h-40 lg:min-h-fit lg:h-auto overflow-x-auto overflow-y-hidden lg:overflow-x-hidden lg:overflow-y-auto gap-4 lg:flex-col lg:w-fit"
              >
                {getTasksByStatus("inProgress", contacts)}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold text-xl">Awaiting feedback</p>
              <span
                onDrop={() => updateStatus("awaitingFeedback")}
                onDragOver={(event) => event.preventDefault()}
                className="flex w-full max-w-full min-h-40 h-40 lg:min-h-fit lg:h-auto overflow-x-auto overflow-y-hidden lg:overflow-x-hidden lg:overflow-y-auto gap-4 lg:flex-col lg:w-fit"
              >
                {getTasksByStatus("awaitingFeedback", contacts)}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold text-xl">Done</p>
              <span
                onDrop={() => updateStatus("done")}
                onDragOver={(event) => event.preventDefault()}
                className="flex w-full max-w-full min-h-40 h-40 lg:min-h-fit lg:h-auto overflow-x-auto overflow-y-hidden lg:overflow-x-hidden lg:overflow-y-auto gap-4 lg:flex-col lg:w-fit"
              >
                {getTasksByStatus("done", contacts)}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BoardPage;
