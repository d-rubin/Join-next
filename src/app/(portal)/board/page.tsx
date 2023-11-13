import Link from "next/link";
import { Metadata } from "next";
import PagePadding from "../../../components/PagePadding";
import BigButton from "../../../components/buttons/BigButton";
import Icon from "../../../components/Icon";
import DropArea from "../../../components/DropArea";
import { DnDContextProvider } from "../../../contexts/DnD.context";
import { getSubtasks, getTasks } from "../../../helper/serverActions";
import { getContacts } from "../../../helper/fetchApi";

export const metadata: Metadata = {
  title: "Board",
};

const BoardPage = async () => {
  const [tasks, contacts, subtasks] = await Promise.all([getTasks(), getContacts(), getSubtasks()]);
  return (
    <PagePadding>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between w-full">
          <h1 className="text-5xl font-bold">Add Task</h1>
          <Link href="add-task" className="group outline-none">
            <BigButton text="" icon="plus" />
          </Link>
        </div>
        <DnDContextProvider>
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex flex-col gap-4 lg:w-1/4 overflow-x-hidden">
              <div className="flex flex-row justify-between items-center gap-2">
                <h2 className="text-2xl font-semibold text-ellipsis whitespace-nowrap overflow-hidden">To do</h2>
                <Link href="add-task" className="group outline-none">
                  <span className="block w-fit h-fit border-primary border-2 rounded-xl p-1 bg-white fill-primary group-hover:stroke-underline group-hover:fill-underline group-hover:border-underline group-focus:stroke-underline group-focus:fill-underline group-focus:border-underline">
                    <Icon icon="plus" />
                  </span>
                </Link>
              </div>
              <DropArea
                contacts={contacts}
                status="toDo"
                tasks={tasks.filter((item) => item.status === "toDo")}
                subtasks={subtasks}
              />
            </div>
            <div className="flex flex-col gap-4 lg:w-1/4">
              <div className="flex flex-row justify-between items-center gap-2">
                <h2 className="text-2xl font-semibold text-ellipsis whitespace-nowrap overflow-hidden">In progress</h2>
                <Link href="add-task" className="group outline-none">
                  <span className="block w-fit h-fit border-primary border-2 rounded-xl p-1 bg-white fill-primary group-hover:stroke-underline group-hover:fill-underline group-hover:border-underline group-focus:stroke-underline group-focus:fill-underline group-focus:border-underline">
                    <Icon icon="plus" />
                  </span>{" "}
                </Link>
              </div>
              <DropArea
                status="inProgress"
                tasks={tasks.filter((item) => item.status === "inProgress")}
                subtasks={subtasks}
                contacts={contacts}
              />
            </div>
            <div className="flex flex-col gap-4 lg:w-1/4">
              <div className="flex flex-row justify-between items-center gap-2">
                <h2 className="text-2xl font-semibold text-ellipsis whitespace-nowrap overflow-hidden">
                  Awaiting feedback
                </h2>
                <Link href="add-task" className="group outline-none">
                  <span className="block w-fit h-fit border-primary border-2 rounded-xl p-1 bg-white fill-primary group-hover:stroke-underline group-hover:fill-underline group-hover:border-underline group-focus:stroke-underline group-focus:fill-underline group-focus:border-underline">
                    <Icon icon="plus" />
                  </span>{" "}
                </Link>
              </div>
              <DropArea
                status="awaitingFeedback"
                tasks={tasks.filter((item) => item.status === "awaitingFeedback")}
                contacts={contacts}
                subtasks={subtasks}
              />
            </div>
            <div className="flex flex-col gap-4 lg:w-1/4">
              <div className="flex flex-row justify-between items-center gap-2">
                <h2 className="text-2xl font-semibold text-ellipsis whitespace-nowrap overflow-hidden">Done</h2>
                <Link href="add-task" className="group outline-none">
                  <span className="block w-fit h-fit border-primary border-2 rounded-xl p-1 bg-white fill-primary group-hover:stroke-underline group-hover:fill-underline group-hover:border-underline group-focus:stroke-underline group-focus:fill-underline group-focus:border-underline">
                    <Icon icon="plus" />
                  </span>{" "}
                </Link>
              </div>
              <DropArea
                status="done"
                tasks={tasks.filter((item) => item.status === "done")}
                contacts={contacts}
                subtasks={subtasks}
              />
            </div>
          </div>
        </DnDContextProvider>
      </div>
    </PagePadding>
  );
};

export default BoardPage;
