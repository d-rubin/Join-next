import Link from "next/link";
import PagePadding from "../../../components/PagePadding";
import BigButton from "../../../components/buttons/BigButton";
import Icon from "../../../components/Icon";
import DropArea from "../../../components/DropArea";
import { DnDContextProvider } from "../../../contexts/DnD.context";

const BoardPage = async () => {
  return (
    <PagePadding>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between w-full">
          <h1 className="text-5xl font-bold">Add Task</h1>
          <Link href="add-task">
            <BigButton text="" icon="plus" />
          </Link>
        </div>
        <DnDContextProvider>
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex flex-col gap-4 lg:w-1/4 overflow-x-hidden">
              <div className="flex flex-row justify-between items-center gap-2">
                <h2 className="text-2xl font-semibold text-ellipsis whitespace-nowrap overflow-hidden">To do</h2>
                <Link href="add-task">
                  <span className="block w-fit h-fit border-primary border-2 rounded-xl p-1 bg-white fill-primary hover:stroke-underline hover:fill-underline hover:border-underline">
                    <Icon icon="plus" />
                  </span>
                </Link>
              </div>
              <DropArea status="toDo" />
            </div>
            <div className="flex flex-col gap-4 lg:w-1/4">
              <div className="flex flex-row justify-between items-center gap-2">
                <h2 className="text-2xl font-semibold text-ellipsis whitespace-nowrap overflow-hidden">In progress</h2>
                <Link href="add-task">
                  <span className="block w-fit h-fit border-primary border-2 rounded-xl p-1 bg-white fill-primary hover:stroke-underline hover:fill-underline hover:border-underline">
                    <Icon icon="plus" />
                  </span>{" "}
                </Link>
              </div>
              <DropArea status="inProgress" />
            </div>
            <div className="flex flex-col gap-4 lg:w-1/4">
              <div className="flex flex-row justify-between items-center gap-2">
                <h2 className="text-2xl font-semibold text-ellipsis whitespace-nowrap overflow-hidden">
                  Awaiting feedback
                </h2>
                <Link href="add-task">
                  <span className="block w-fit h-fit border-primary border-2 rounded-xl p-1 bg-white fill-primary hover:stroke-underline hover:fill-underline hover:border-underline">
                    <Icon icon="plus" />
                  </span>{" "}
                </Link>
              </div>
              <DropArea status="awaitingFeedback" />
            </div>
            <div className="flex flex-col gap-4 lg:w-1/4">
              <div className="flex flex-row justify-between items-center gap-2">
                <h2 className="text-2xl font-semibold text-ellipsis whitespace-nowrap overflow-hidden">Done</h2>
                <Link href="add-task">
                  <span className="block w-fit h-fit border-primary border-2 rounded-xl p-1 bg-white fill-primary hover:stroke-underline hover:fill-underline hover:border-underline">
                    <Icon icon="plus" />
                  </span>{" "}
                </Link>
              </div>
              <DropArea status="done" />
            </div>
          </div>
        </DnDContextProvider>
      </div>
    </PagePadding>
  );
};

export default BoardPage;
