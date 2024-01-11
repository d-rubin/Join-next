"use client";

import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useSWR from "swr";
import Link from "next/link";
import { useDebouncedCallback } from "use-debounce";
import BoardTask from "./BoardTask";
import { Task, Tags } from "../types";
import { DnDContext } from "../contexts/DnD.context";
import { getContacts, getSubtasks, getTasks, patchTaskStatus } from "../utils/serverActions";
import Icon from "./Basics/Icon";
import Text from "./Basics/Text";
import DefaultInput from "./inputs/Default";
import { getText } from "../utils/generalHelper";

const DropArea = () => {
  const { task } = useContext(DnDContext);
  const { data, isLoading, error, mutate } = useSWR(Tags.Board, () =>
    Promise.all([getTasks(), getContacts(), getSubtasks()]),
  );

  const [searchValue, setSearchValue] = useState<string>();

  const handleSearch = useDebouncedCallback((value) => {
    if (value) setSearchValue(value);
    else setSearchValue("");
  }, 300);

  if ((!Array.isArray(data) || error) && !isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center p-4 text-3xl">
        <Text text="Ups, Something went wrong! Try again." />
      </div>
    );
  }

  const tasks = data && data[0];
  const contacts = data && Array.isArray(data[1]) && data[1];
  const subtasks = data && data[2] && !("message" in data[2]) && data[2];

  const filterTasks = (status: string) => {
    const searchedTasks =
      searchValue &&
      tasks?.filter((item) => item.title.includes(searchValue) || item.description.includes(searchValue));

    return searchedTasks
      ? searchedTasks.filter((item) => item.status === status)
      : tasks?.filter((item) => item.status === status);
  };

  const handleDrop = async (status: string) => {
    if (task && tasks && contacts && subtasks) {
      const updatedTasks: Task[] = tasks.map((item) => (item.id === task.id ? { ...item, status } : { ...item }));

      await mutate(Promise.all([patchTaskStatus(task, status), getContacts(), getSubtasks()]), {
        optimisticData: [updatedTasks, contacts, subtasks],
      });
    }
  };

  const renderTaskArea = (status: string) => {
    const filteredTasks = filterTasks(status);
    if (!filteredTasks?.length)
      return (
        <div className="h-full w-full" onDrop={() => handleDrop(status)} onDragOver={(e) => e.preventDefault()}>
          <span className="flex w-full flex-row items-center justify-center rounded-xl border-2 border-dotted border-gray-500 bg-gray-200 p-2 text-gray-500">
            No tasks {getText(status)}
          </span>
        </div>
      );

    if (contacts && filteredTasks?.length)
      return (
        <div
          className="h-full w-full overflow-x-auto"
          onDrop={() => handleDrop(status)}
          onDragOver={(e) => e.preventDefault()}
        >
          <div className="flex w-fit flex-row gap-4 lg:w-full lg:flex-col">
            {filteredTasks.map((item: Task) => (
              <BoardTask key={uuidv4()} task={item} contacts={contacts} subtasks={subtasks || undefined} />
            ))}
          </div>
        </div>
      );

    return null;
  };

  return (
    <>
      <div className="flex w-full flex-col items-center justify-between gap-8 md:flex-row">
        <h1 className="whitespace-nowrap text-5xl font-bold dark:text-textDark">Add Task</h1>
        <search className="w-full md:max-w-md">
          <DefaultInput
            type="text"
            block
            placeholder="Search for a task..."
            icon="search"
            onChange={(event) => handleSearch(event.target.value)}
          />
        </search>
      </div>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex flex-col gap-4 overflow-x-hidden lg:w-1/4">
          <div className="flex flex-row items-center justify-between gap-2">
            <h2 className="overflow-hidden text-ellipsis whitespace-nowrap text-2xl font-semibold dark:text-textDark">
              To do
            </h2>
            <Link href="add-task?status=toDo" className="group outline-none">
              <span className="block h-fit w-fit rounded-xl border-2 border-primary bg-white fill-primary p-1 transition-all group-hover:border-underline group-focus-visible:border-underline dark:border-textDark dark:bg-defaultColorDark">
                <Icon icon="plus" className="group-hover:fill-underline group-focus-visible:fill-underline" />
              </span>
            </Link>
          </div>
          {renderTaskArea("toDo")}
        </div>
        <div className="flex flex-col gap-4 lg:w-1/4">
          <div className="flex flex-row items-center justify-between gap-2">
            <h2 className="overflow-hidden text-ellipsis whitespace-nowrap text-2xl font-semibold dark:text-textDark">
              In progress
            </h2>
            <Link href="add-task?status=inProgress" className="group outline-none">
              <span className="block h-fit w-fit rounded-xl border-2 border-primary bg-white fill-primary p-1 transition-all group-hover:border-underline group-focus-visible:border-underline dark:border-textDark dark:bg-defaultColorDark">
                <Icon icon="plus" className="group-hover:fill-underline group-focus-visible:fill-underline" />
              </span>
            </Link>
          </div>
          {renderTaskArea("inProgress")}
        </div>
        <div className="flex flex-col gap-4 lg:w-1/4">
          <div className="flex flex-row items-center justify-between gap-2">
            <h2 className="overflow-hidden text-ellipsis whitespace-nowrap text-2xl font-semibold dark:text-textDark">
              Awaiting feedback
            </h2>
            <Link href="add-task?status=awaitingFeedback" className="group outline-none">
              <span className="block h-fit w-fit rounded-xl border-2 border-primary bg-white fill-primary p-1 transition-all group-hover:border-underline group-focus-visible:border-underline dark:border-textDark dark:bg-defaultColorDark">
                <Icon icon="plus" className="group-hover:fill-underline group-focus-visible:fill-underline" />
              </span>
            </Link>
          </div>
          {renderTaskArea("awaitingFeedback")}
        </div>
        <div className="flex flex-col gap-4 lg:w-1/4">
          <div className="flex flex-row items-center justify-between gap-2">
            <h2 className="overflow-hidden text-ellipsis whitespace-nowrap text-2xl font-semibold dark:text-textDark">
              Done
            </h2>
            <Link href="add-task?status=done" className="group outline-none">
              <span className="block h-fit w-fit rounded-xl border-2 border-primary bg-white fill-primary p-1 transition-all group-hover:border-underline group-focus-visible:border-underline dark:border-textDark dark:bg-defaultColorDark">
                <Icon icon="plus" className="group-hover:fill-underline group-focus-visible:fill-underline" />
              </span>
            </Link>
          </div>
          {renderTaskArea("done")}
        </div>
      </div>
    </>
  );

  // return (
  //   <div className="flex w-fit flex-row gap-4 lg:w-full lg:flex-col">
  //     <div className="min-w-40 h-40 w-40 animate-pulse rounded-3xl bg-gray-500 lg:h-40 lg:w-full" />
  //     <div className="min-w-40 h-40 w-40 animate-pulse rounded-3xl bg-gray-500 lg:h-40 lg:w-full" />
  //     <div className="min-w-40 h-40 w-40 animate-pulse rounded-3xl bg-gray-500 lg:h-40 lg:w-full" />
  //   </div>
  // );
};

export default DropArea;
