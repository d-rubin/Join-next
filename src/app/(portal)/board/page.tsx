"use client";

import Link from "next/link";
import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";
import useSWR from "swr";
import PagePadding from "../../../components/PagePadding";
import Text from "../../../components/Basics/Text";
import Icon from "../../../components/Basics/Icon";
import DropArea from "../../../components/DropArea";
import { DnDContextProvider } from "../../../contexts/DnD.context";
import { getSubtasks, getTasks } from "../../../utils/serverActions";
import { getContacts } from "../../../utils/fetchApi";
import { TSubtask } from "../../../types";
import DefaultInput from "../../../components/inputs/Default";

const BoardPage = () => {
  const [searchValue, setSearchValue] = useState<string>();
  const fetcher = async () => Promise.all([getTasks(), getContacts(), getSubtasks()]);
  const { data, error, isLoading } = useSWR("board", fetcher);
  const handleSearch = useDebouncedCallback((value) => {
    if (value) setSearchValue(value);
    else setSearchValue("");
  }, 300);

  if (isLoading) return <div />;

  if (!Array.isArray(data) || error)
    return (
      <div className="flex h-full w-full items-center justify-center p-4 text-3xl">
        <Text text="Ups, Something went wrong! Try again." />
      </div>
    );

  const tasks = data[0];
  const contacts = data[1];
  const subtasks = !("message" in data[2]) && data[2];

  const filterTasks = (status: string) => {
    const searchedTasks =
      searchValue && tasks.filter((task) => task.title.includes(searchValue) || task.description.includes(searchValue));

    return searchedTasks
      ? searchedTasks.filter((item) => item.status === status)
      : tasks.filter((item) => item.status === status);
  };

  return (
    <PagePadding>
      <div className="flex flex-col gap-4">
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
        <DnDContextProvider>
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
              <DropArea
                contacts={contacts}
                status="toDo"
                tasks={filterTasks("toDo")}
                subtasks={subtasks as TSubtask[]}
              />
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
              <DropArea
                status="inProgress"
                tasks={filterTasks("inProgress")}
                subtasks={subtasks as TSubtask[]}
                contacts={contacts}
              />
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
              <DropArea
                status="awaitingFeedback"
                tasks={filterTasks("awaitingFeedback")}
                contacts={contacts}
                subtasks={subtasks as TSubtask[]}
              />
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
              <DropArea
                status="done"
                tasks={filterTasks("done")}
                contacts={contacts}
                subtasks={subtasks as TSubtask[]}
              />
            </div>
          </div>
        </DnDContextProvider>
      </div>
    </PagePadding>
  );
};

export default BoardPage;
