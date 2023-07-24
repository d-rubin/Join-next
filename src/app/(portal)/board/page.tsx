"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import plusIcon from "../../../img/plus.svg";
import { getContacts, getTasks } from "../../../helper/fetchApi";
import { Task, User } from "../../../interface";
import { generalHelper } from "../../../helper/generalHelper";

const BoardPage = () => {
  const [droppedTask, setDroppedTask] = useState<Task>();
  const [tasks, setTasks] = useState<Task[]>();
  const [contacts, setContacts] = useState<User[]>();

  // eslint-disable-next-line prefer-const
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

  const getTasksByStatus = (status: string) => {
    return tasks?.map((task) => {
      if (task.status === status) {
        return (
          <article
            className="p-4 bg-white rounded-3xl flex flex-col gap-2"
            draggable
            onDragStart={() => setDroppedTask(task)}
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

  const updateStatus = () => {
    console.log(droppedTask);
  };

  return (
    tasks &&
    contacts && (
      <div className="flex flex-col gap-4 max-w-screen-lg">
        <div className="flex justify-between w-full">
          <h2 className="text-4xl font-bold cursor-default">Board</h2>
          <Link href="/add-task">
            <button className="w-fit h-10 px-4 bg-[--color-primary] rounded-lg text-white text-xl">
              <Image width={18} height={18} src={plusIcon} alt="Add Task" />
            </button>
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-bold text-xl">To do</p>
          <span onDragEnd={() => updateStatus()} className="flex w-full max-w-full h-40 overflow-x-scroll gap-4">
            {getTasksByStatus("doDo")}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-bold text-xl">In Progress</p>
          <span onDrop={() => updateStatus()} className="flex w-full max-w-full h-40 overflow-x-scroll gap-4">
            {getTasksByStatus("inProgress")}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-bold text-xl">Awaiting feedback</p>
          <span onDrop={() => updateStatus()} className="flex w-full max-w-full h-40 overflow-x-scroll gap-4">
            {getTasksByStatus("awaitingFeedback")}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-bold text-xl">Done</p>
          <span onDrop={() => updateStatus()} className="flex w-full max-w-full h-40 overflow-x-scroll gap-4">
            {getTasksByStatus("done")}
          </span>
        </div>
      </div>
    )
  );
};

export default BoardPage;
