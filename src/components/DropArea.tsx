"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useSWR from "swr";
import Link from "next/link";
import { useDebouncedCallback } from "use-debounce";
import { useDrop } from "react-dnd";
import { useRouter, useSearchParams } from "next/navigation";
import BoardTask from "./BoardTask";
import { TTask, Tags, TContact, TSubtask } from "../types";
import { getContacts, getSubtasks, getTasks, updateTask } from "../utils/serverActions";
import Icon from "./Basics/Icon";
import Text from "./Basics/Text";
import DefaultInput from "./inputs/Default";
import { getStatusText, isErrorResponse, updateTaskArray } from "../utils/generalHelper";
import Skeleton from "./Basics/Skeleton";
import Card from "./Basics/Card";
import BoardDialog from "./BoardDialog";
import { SubtaskProvider } from "../contexts/subtaskContext";

const DropArea = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const filter = searchParams.get("filter");
  const { data, isLoading, error, mutate } = useSWR(Tags.Board, () =>
    Promise.all([getTasks(), getContacts(), getSubtasks()]),
  );

  const [searchValue, setSearchValue] = useState<string>();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<boolean>(false);

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

  const customUseDrop = (status: string) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [{}, dropRef] = useDrop({
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
    if (tasks && (searchValue || filter)) {
      filteredTasks = tasks.filter((item) => {
        if (!searchValue && filter && filter !== "high") return item.status === filter;
        if (!searchValue && filter && filter === "high") return item.priority === filter;
        if (searchValue && !filter) {
          return (
            item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.description.toLowerCase().includes(searchValue.toLowerCase())
          );
        }
        if (searchValue && filter && filter !== "high")
          return (
            item.status === filter &&
            (item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.description.toLowerCase().includes(searchValue.toLowerCase()))
          );
        return (
          searchValue &&
          item.priority === filter &&
          (item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.description.toLowerCase().includes(searchValue.toLowerCase()))
        );
      });
    }
    return filteredTasks ? filteredTasks?.filter((item) => item.status === status) : [];
  };

  const renderTaskArea = (status: string) => {
    const dropRef = customUseDrop(status);
    const filteredTasks = filterTasks(status);
    if (!contacts || isLoading) return <Skeleton className="h-40 rounded-3xl lg:h-96" />;

    if (!filteredTasks?.length)
      return (
        <div className="h-full w-full" ref={dropRef}>
          <span className="flex w-full flex-row items-center justify-center rounded-xl border-2 border-dotted border-gray-500 bg-gray-200 p-2 text-gray-500">
            No tasks {getStatusText(status)}
          </span>
        </div>
      );

    if (contacts && tasks && subtasks)
      return (
        <div className="h-full w-full overflow-x-auto" ref={dropRef}>
          <div className="flex w-fit flex-row gap-4 lg:w-full lg:flex-col">
            {filteredTasks.map((item: TTask) => (
              <BoardTask
                key={uuidv4()}
                setOpenDialog={setIsDialogOpen}
                setEditTask={setEditTask}
                task={item}
                subTasks={subtasks.filter((subtask) => subtask.task === item.id)}
              />
            ))}
          </div>
        </div>
      );

    return null;
  };

  return (
    <SubtaskProvider>
      <div className="flex w-full flex-col items-center justify-between gap-8 md:flex-row">
        <h1 className="whitespace-nowrap text-5xl font-bold dark:text-textDark">Add Task</h1>
        {filter && (
          <div className="flex items-center gap-2 font-bold">
            <Text text="Filter:" className="text-2xl" />
            <Card className="whitespace-nowrap rounded-lg px-3 py-1.5">
              {filter && filter !== "high" ? getStatusText(filter) : "Urgent"}
              <Icon icon="x" onClick={() => replace("board")} />
            </Card>
          </div>
        )}
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
      <BoardDialog
        isDialogOpen={isDialogOpen}
        editTask={editTask}
        setIsDialogOpen={setIsDialogOpen}
        setEditTask={setEditTask}
        contacts={contacts || undefined}
      />
    </SubtaskProvider>
  );
};

export default DropArea;
