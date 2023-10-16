import Link from "next/link";
import { getContacts, getTasks } from "../../../helper/fetchApi";
import PagePadding from "../../../components/PagePadding";
import BigButton from "../../../components/buttons/BigButton";
import DefaultButton from "../../../components/buttons/Default";

const BoardPage = async () => {
  const [tasks, contacts] = await Promise.all([getTasks(), getContacts()]);

  // const getTasksByStatus = (status: string) => {
  //   return (
  //     contacts &&
  //     tasks?.map((task: Task) => {
  //       if (task?.status === status) {
  //         return (
  //           // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
  //           <article
  //             className="p-4 bg-white rounded-3xl flex flex-col gap-2 h-fit cursor-pointer"
  //             draggable
  //             onClick={() => handleTaskClick(task)}
  //             onDragStart={() => setDraggedTask(task)}
  //             key={task.id}
  //           >
  //             <p
  //               className="text-white px-4 py-1 w-fit rounded-lg"
  //               style={{ backgroundColor: getBackgroundForCategory(task.category) }}
  //             >
  //               {generalHelper(task.category)}
  //             </p>
  //             <p className="text-lg font-bold">{task.title}</p>
  //             <p>{task.description}</p>
  //             <p>Assigned to: {getAssignee(task.assignee, contacts)}</p>
  //           </article>
  //         );
  //       }
  //
  //       return null;
  //     })
  //   );
  // };
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
            <span className="w-full flex flex-row items-center justify-center bg-gray-200 border-gray-500 text-gray-500 border-dotted border-2 rounded-xl p-2">
              No tasks to do
            </span>
          </div>
          <div className="flex flex-col gap-4 lg:w-1/4">
            <div className="flex flex-row justify-between items-center gap-2">
              <h2 className="text-2xl font-semibold text-ellipsis whitespace-nowrap overflow-hidden">In progress</h2>
              <Link href="add-task">
                <DefaultButton text="" icon="plus" outlined className="px-1" />
              </Link>
            </div>
            <span className="w-full flex flex-row items-center justify-center bg-gray-200 border-gray-500 text-gray-500 border-dotted border-2 rounded-xl p-2">
              No tasks in progress
            </span>
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
            <span className="w-full flex flex-row items-center justify-center bg-gray-200 border-gray-500 text-gray-500 border-dotted border-2 rounded-xl p-2">
              No tasks awaiting feedback
            </span>
          </div>
          <div className="flex flex-col gap-4 lg:w-1/4">
            <div className="flex flex-row justify-between items-center gap-2">
              <h2 className="text-2xl font-semibold text-ellipsis whitespace-nowrap overflow-hidden">Done</h2>
              <Link href="add-task">
                <DefaultButton text="" icon="plus" outlined className="px-1" />
              </Link>
            </div>
            <span className="w-full flex flex-row items-center justify-center bg-gray-200 border-gray-500 text-gray-500 border-dotted border-2 rounded-xl p-2">
              No tasks done
            </span>
          </div>
        </div>
      </div>
    </PagePadding>
  );
};

export default BoardPage;
