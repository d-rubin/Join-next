"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import plusIcon from "../../../img/plus.svg";
import { getContacts, getTasks, updateTask } from "../../../helper/fetchApi";
import { Task, User } from "../../../interface";
import { generalHelper } from "../../../helper/generalHelper";

const BoardPage = () => {
  const [draggedTask, setDraggedTask] = useState<Task>();
  const [tasks, setTasks] = useState<Task[]>();
  const [contacts, setContacts] = useState<User[]>();
  const [openTask, setOpenTask] = useState<Task>();

  useEffect(() => {
    Promise.all([getTasks(), getContacts()]).then(([tasksResponse, contactsResponse]) => {
      setTasks(tasksResponse);
      setContacts(contactsResponse);
    });
  }, []);

  const getBackgroundForCategory = (category: string) => {
    switch (category) {
      case "media":
        return "var(--color-media)";
      case "marketing":
        return "var(--color-marketing)";
      case "backoffice":
        return "var(--color-backoffice)";
      case "sales":
        return "var(--color-sales)";
      default:
        return "var(--color-design)";
    }
  };

  const getAssignee = (assignee: number) => {
    const assignedPerson = contacts?.find((user) => user.id === assignee);
    return assignedPerson?.username;
  };

  const handleTaskClick = (task: Task) => {
    setOpenTask(task);
    const dialog = document.getElementById("dialog") as HTMLDialogElement | null;
    dialog?.showModal();
  };

  const getTasksByStatus = (status: string) => {
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
            <p>Assigned to: {getAssignee(task.assignee)}</p>
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

  const closeDialog = () => {
    const dialog = document.getElementById("dialog") as HTMLDialogElement | null;
    dialog?.close();
    console.log(dialog);
  };

  const editTask = () => {};

  return (
    <>
      {openTask && (
        <dialog className="outline-0 rounded-2xl shadow-2xl" id="dialog">
          <div className="flex flex-col gap-2">
            <p
              className="text-white px-4 py-1 w-fit rounded-lg"
              style={{ backgroundColor: getBackgroundForCategory(openTask.category) }}
            >
              {generalHelper(openTask.category)}
            </p>
            <p className="text-lg font-bold">{openTask.title}</p>
            <p>{openTask.description}</p>
            <p>Priority: {openTask.priority}</p>
            <p>Due Date: {openTask.due_date}</p>
            <p>Status: {openTask.status}</p>
            <p>Assigned to: {getAssignee(openTask.assignee)}</p>
            <div className="flex flex-row justify-end gap-2">
              <button onClick={closeDialog}>Close</button>
              <button onClick={editTask}>Edit</button>
            </div>
          </div>
        </dialog>
      )}
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
                {getTasksByStatus("toDo")}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold text-xl">In Progress</p>
              <span
                onDrop={() => updateStatus("inProgress")}
                onDragOver={(event) => event.preventDefault()}
                className="flex w-full max-w-full min-h-40 h-40 lg:min-h-fit lg:h-auto overflow-x-auto overflow-y-hidden lg:overflow-x-hidden lg:overflow-y-auto gap-4 lg:flex-col lg:w-fit"
              >
                {getTasksByStatus("inProgress")}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold text-xl">Awaiting feedback</p>
              <span
                onDrop={() => updateStatus("awaitingFeedback")}
                onDragOver={(event) => event.preventDefault()}
                className="flex w-full max-w-full min-h-40 h-40 lg:min-h-fit lg:h-auto overflow-x-auto overflow-y-hidden lg:overflow-x-hidden lg:overflow-y-auto gap-4 lg:flex-col lg:w-fit"
              >
                {getTasksByStatus("awaitingFeedback")}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold text-xl">Done</p>
              <span
                onDrop={() => updateStatus("done")}
                onDragOver={(event) => event.preventDefault()}
                className="flex w-full max-w-full min-h-40 h-40 lg:min-h-fit lg:h-auto overflow-x-auto overflow-y-hidden lg:overflow-x-hidden lg:overflow-y-auto gap-4 lg:flex-col lg:w-fit"
              >
                {getTasksByStatus("done")}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BoardPage;
