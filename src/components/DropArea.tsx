"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useSWR from "swr";
import Link from "next/link";
import { useDebouncedCallback } from "use-debounce";
import BoardTask from "./BoardTask";
import { TTask, Tags, TContact, TSubtask } from "../types";
import { getContacts, getSubtasks, getTasks, updateTask } from "../utils/serverActions";
import Icon from "./Basics/Icon";
import Text from "./Basics/Text";
import DefaultInput from "./inputs/Default";
import { getStatusText, isErrorResponse } from "../utils/generalHelper";
import { useDrop } from "react-dnd";

const DropArea = () => {
  const { data, error, mutate } = useSWR(Tags.Board, () => Promise.all([getTasks(), getContacts(), getSubtasks()]));
  const [searchValue, setSearchValue] = useState<string>();

  const handleSearch = useDebouncedCallback((value) => {
    if (value) setSearchValue(value);
    else setSearchValue("");
  }, 300);

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center p-4 text-3xl">
        <Text text="Ups, Something went wrong! Try again." />
      </div>
    );
  }

  const tasks = data && !isErrorResponse(data[0]) && data[0];
  const contacts = data && !isErrorResponse(data[1]) && data[1];
  const subtasks = data && !isErrorResponse(data[2]) && data[2];

  const updateTaskArray = (array: unknown, updatedTask: TTask) => {
    if (array && Array.isArray(array) && !isErrorResponse(array)) {
      return array.map((task) => (task.id === updatedTask.id ? updatedTask : task));
    }
    return [];
  };

  const customUseDrop = (status: string) => {
    const [{ isOver }, dropRef] = useDrop({
      accept: "boardTask",
      drop: (item: TTask) =>
        mutate(Promise.all([updateTask({ ...item, status }), getContacts(), getSubtasks()]), {
          optimisticData: [updateTaskArray(tasks, { ...item, status }), contacts as TContact[], subtasks as TSubtask[]],
        }),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    });
    return dropRef;
  };

  const filterTasks = (status: string): TTask[] => {
    let filteredTasks = tasks;
    if (tasks && searchValue) {
      filteredTasks = tasks.filter(
        (item) => item.title.includes(searchValue) || item.description.includes(searchValue),
      );
    }
    return filteredTasks ? filteredTasks?.filter((item) => item.status === status) : [];
  };

  const renderTaskArea = (status: string) => {
    const filteredTasks = filterTasks(status);
    if (!filteredTasks?.length)
      return (
        <div className="h-full w-full" ref={customUseDrop(status)}>
          <span className="flex w-full flex-row items-center justify-center rounded-xl border-2 border-dotted border-gray-500 bg-gray-200 p-2 text-gray-500">
            No tasks {getStatusText(status)}
          </span>
        </div>
      );

    if (contacts)
      return (
        <div className="h-full w-full overflow-x-auto" ref={customUseDrop(status)}>
          <div className="flex w-fit flex-row gap-4 lg:w-full lg:flex-col">
            {filteredTasks.map((item: TTask) => (
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
