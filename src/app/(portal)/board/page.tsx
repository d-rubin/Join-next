import Link from "next/link";
import { getContacts, getTasks } from "../../../helper/fetchApi";
import PagePadding from "../../../components/PagePadding";
import BigButton from "../../../components/buttons/BigButton";
import DefaultButton from "../../../components/buttons/Default";
import BoardTask from "../../../components/BoardTask";

const BoardPage = async () => {
  const [tasks, contacts] = await Promise.all([getTasks(), getContacts()]);

  const getTasksByStatus = (status: string) => {
    const tasksMatchingStatus = tasks.filter((task) => task.status === status);
    if (tasksMatchingStatus.length === 0)
      return (
        <span className="w-full flex flex-row items-center justify-center bg-gray-200 border-gray-500 text-gray-500 border-dotted border-2 rounded-xl p-2">
          No tasks to do
        </span>
      );

    return tasksMatchingStatus.map((task) => <BoardTask key={task.id} task={task} contacts={contacts} />);
  };

  return (
    <PagePadding>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between w-full">
          <h1 className="text-5xl font-bold">Add Task</h1>
          <Link href="add-task">
            <BigButton text="" icon="plus" />
          </Link>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="flex flex-col gap-4 lg:w-1/4">
            <div className="flex flex-row justify-between items-center gap-2">
              <h2 className="text-2xl font-semibold text-ellipsis whitespace-nowrap overflow-hidden">To do</h2>
              <Link href="add-task">
                <DefaultButton text="" icon="plus" outlined className="px-1" />
              </Link>
            </div>
            {getTasksByStatus("toDo")}
          </div>
          <div className="flex flex-col gap-4 lg:w-1/4">
            <div className="flex flex-row justify-between items-center gap-2">
              <h2 className="text-2xl font-semibold text-ellipsis whitespace-nowrap overflow-hidden">In progress</h2>
              <Link href="add-task">
                <DefaultButton text="" icon="plus" outlined className="px-1" />
              </Link>
            </div>
            {getTasksByStatus("inProgress")}
          </div>
          <div className="flex flex-col gap-4 lg:w-1/4">
            <div className="flex flex-row justify-between items-center gap-2">
              <h2 className="text-2xl font-semibold text-ellipsis whitespace-nowrap overflow-hidden">
                Awaiting feedback
              </h2>
              <Link href="add-task">
                <DefaultButton text="" icon="plus" outlined className="px-1" />
              </Link>
            </div>
            {getTasksByStatus("awaitingFeedback")}
          </div>
          <div className="flex flex-col gap-4 lg:w-1/4">
            <div className="flex flex-row justify-between items-center gap-2">
              <h2 className="text-2xl font-semibold text-ellipsis whitespace-nowrap overflow-hidden">Done</h2>
              <Link href="add-task">
                <DefaultButton text="" icon="plus" outlined className="px-1" />
              </Link>
            </div>
            {getTasksByStatus("done")}
          </div>
        </div>
      </div>
    </PagePadding>
  );
};

export default BoardPage;
