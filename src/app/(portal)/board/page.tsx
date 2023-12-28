import Link from "next/link";
import { Metadata } from "next";
import PagePadding from "../../../components/PagePadding";
import Button from "../../../components/Basics/Button";
import Icon from "../../../components/Basics/Icon";
import DropArea from "../../../components/DropArea";
import { DnDContextProvider } from "../../../contexts/DnD.context";
import { getSubtasks, getTasks } from "../../../utils/serverActions";
import { getContacts } from "../../../utils/fetchApi";
import { TSubtask } from "../../../types";

export const metadata: Metadata = {
  title: "Board",
};

const BoardPage = async () => {
  const [tasks, contacts, subtasks] = await Promise.all([getTasks(), getContacts(), getSubtasks()]);
  return (
    <PagePadding>
      <div className="flex flex-col gap-4">
        <div className="flex w-full justify-between">
          <h1 className="text-5xl font-bold dark:text-textDark">Add Task</h1>
          <Link href="add-task" className="group outline-none">
            <Button icon="plus" />
          </Link>
        </div>
        <DnDContextProvider>
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex flex-col gap-4 overflow-x-hidden lg:w-1/4">
              <div className="flex flex-row items-center justify-between gap-2">
                <h2 className="overflow-hidden text-ellipsis whitespace-nowrap text-2xl font-semibold dark:text-textDark">
                  To do
                </h2>
                <Link href="add-task" className="group outline-none">
                  <span className="block h-fit w-fit rounded-xl border-2 border-primary bg-white fill-primary p-1 transition-all group-hover:border-underline group-focus-visible:border-underline dark:border-textDark dark:bg-defaultColorDark">
                    <Icon icon="plus" className="group-hover:fill-underline group-focus-visible:fill-underline" />
                  </span>
                </Link>
              </div>
              <DropArea
                contacts={contacts}
                status="toDo"
                tasks={tasks.filter((item) => item.status === "toDo")}
                subtasks={subtasks as TSubtask[]}
              />
            </div>
            <div className="flex flex-col gap-4 lg:w-1/4">
              <div className="flex flex-row items-center justify-between gap-2">
                <h2 className="overflow-hidden text-ellipsis whitespace-nowrap text-2xl font-semibold dark:text-textDark">
                  In progress
                </h2>
                <Link href="add-task" className="group outline-none">
                  <span className="block h-fit w-fit rounded-xl border-2 border-primary bg-white fill-primary p-1 transition-all group-hover:border-underline group-focus-visible:border-underline dark:border-textDark dark:bg-defaultColorDark">
                    <Icon icon="plus" className="group-hover:fill-underline group-focus-visible:fill-underline" />
                  </span>
                </Link>
              </div>
              <DropArea
                status="inProgress"
                tasks={tasks.filter((item) => item.status === "inProgress")}
                subtasks={subtasks as TSubtask[]}
                contacts={contacts}
              />
            </div>
            <div className="flex flex-col gap-4 lg:w-1/4">
              <div className="flex flex-row items-center justify-between gap-2">
                <h2 className="overflow-hidden text-ellipsis whitespace-nowrap text-2xl font-semibold dark:text-textDark">
                  Awaiting feedback
                </h2>
                <Link href="add-task" className="group outline-none">
                  <span className="block h-fit w-fit rounded-xl border-2 border-primary bg-white fill-primary p-1 transition-all group-hover:border-underline group-focus-visible:border-underline dark:border-textDark dark:bg-defaultColorDark">
                    <Icon icon="plus" className="group-hover:fill-underline group-focus-visible:fill-underline" />
                  </span>
                </Link>
              </div>
              <DropArea
                status="awaitingFeedback"
                tasks={tasks.filter((item) => item.status === "awaitingFeedback")}
                contacts={contacts}
                subtasks={subtasks as TSubtask[]}
              />
            </div>
            <div className="flex flex-col gap-4 lg:w-1/4">
              <div className="flex flex-row items-center justify-between gap-2">
                <h2 className="overflow-hidden text-ellipsis whitespace-nowrap text-2xl font-semibold dark:text-textDark">
                  Done
                </h2>
                <Link href="add-task" className="group outline-none">
                  <span className="block h-fit w-fit rounded-xl border-2 border-primary bg-white fill-primary p-1 transition-all group-hover:border-underline group-focus-visible:border-underline dark:border-textDark dark:bg-defaultColorDark">
                    <Icon icon="plus" className="group-hover:fill-underline group-focus-visible:fill-underline" />
                  </span>
                </Link>
              </div>
              <DropArea
                status="done"
                tasks={tasks.filter((item) => item.status === "done")}
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
