import Link from "next/link";
import Card from "../Basics/Card";
import Icon from "../Basics/Icon";
import { Task } from "../../types";
import { getCurrentUser, getTasks } from "../../utils/serverActions";

const SummaryTaskArea = async () => {
  const tasks = await getTasks();
  const user = await getCurrentUser();

  const getNextDeadline = (items: Array<Task>) => {
    if (!items.length) return "-";
    let nextDeadline: number = new Date("01-01-3000").getTime();

    if (Array.isArray(items)) {
      tasks.forEach((task) => {
        const deadline = new Date(task.due_date).getTime();
        if (deadline < nextDeadline) nextDeadline = deadline;
      });
    } else {
      return "No Deadline";
    }

    return new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "long", year: "numeric" }).format(nextDeadline);
  };
  const getCounts = (items: Task[]) => {
    let toDo = 0;
    let inProgress = 0;
    let awaitingFeedback = 0;
    let done = 0;
    let urgent = 0;
    let taskCount = 0;

    if (Array.isArray(items)) {
      items.forEach((task) => {
        switch (task.status) {
          case "toDo":
            toDo += 1;
            break;
          case "inProgress":
            inProgress += 1;
            break;
          case "awaitingFeedback":
            awaitingFeedback += 1;
            break;
          default:
            done += 1;
            break;
        }

        if (task.priority === "high") urgent += 1;
        taskCount += 1;
      });
    }

    return {
      toDo,
      inProgress,
      awaitingFeedback,
      done,
      urgent,
      taskCount,
    };
  };

  return (
    <div className="flex w-full items-center justify-center gap-36 xl:justify-start">
      <div className="flex w-full max-w-screen-sm flex-col gap-4 sm:gap-8">
        <div className="flex w-full flex-row gap-4">
          <Link href="board" className="group w-1/2 outline-none">
            <Card className="flex h-32 flex-row gap-2 p-4 transition-all group-hover:scale-105 group-hover:bg-primary group-focus:scale-105 group-focus:bg-primary">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary transition-all group-hover:scale-105 group-hover:bg-white group-focus:scale-105 group-focus:bg-white">
                <Icon
                  icon="pencil"
                  className="fill-white group-hover:scale-105 group-hover:fill-primary group-focus-visible:scale-105 group-focus-visible:fill-primary dark:fill-textDark"
                  iconSize="h-8 w-8"
                />
              </span>
              <div className="flex flex-col items-center">
                <p className="text-4xl font-semibold transition-all group-hover:scale-105 group-hover:text-white group-focus:scale-105 group-focus:text-white">
                  {getCounts(tasks).toDo}
                </p>
                <p className="transition-all group-hover:scale-105 group-hover:text-white group-focus:scale-105 group-focus:text-white">
                  To-do
                </p>
              </div>
            </Card>
          </Link>
          <Link href="board" className="group w-1/2 outline-none">
            <Card className="flex h-32 flex-row gap-2 p-4 transition-all group-hover:scale-105 group-hover:bg-primary group-focus:scale-105 group-focus:bg-primary">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary transition-all group-hover:scale-105 group-hover:bg-white group-focus:scale-105 group-focus:bg-white">
                <Icon
                  icon="check"
                  className="fill-white group-hover:scale-105 group-hover:fill-primary group-focus-visible:scale-105 group-focus-visible:fill-primary dark:fill-textDark"
                  iconSize="h-8 w-8"
                />
              </span>
              <div className="flex flex-col items-center">
                <p className="text-4xl font-semibold transition-all group-hover:text-white group-focus:text-white">
                  {getCounts(tasks).done}
                </p>
                <p className="transition-all group-hover:text-white group-focus:text-white">Done</p>
              </div>
            </Card>
          </Link>
        </div>
        <Link href="board" className="group block outline-none">
          <Card className="flex h-32 flex-row justify-around gap-2 p-4 transition-all group-hover:scale-105 group-hover:bg-primary group-focus:scale-105 group-focus:bg-primary">
            <span className="flex w-1/2 flex-row justify-evenly gap-2">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red transition-all group-hover:scale-105 group-focus:scale-105">
                <Icon
                  icon="urgent"
                  className="fill-white group-hover:scale-105 group-focus:scale-105 dark:fill-white"
                  iconSize="h-8 w-8"
                />
              </span>
              <div className="flex flex-col items-center">
                <p className="text-4xl font-semibold transition-all group-hover:text-white group-focus:text-white">
                  {getCounts(tasks).urgent}
                </p>
                <p className="transition-all group-hover:text-white group-focus:text-white">Urgent</p>
              </div>
            </span>
            <div className="h-4/5 border-l-2 border-grey" />
            <div className="w-1/2 text-center">
              <p className="text-lg font-semibold transition-all group-hover:text-white group-focus:text-white">
                {getNextDeadline(tasks)}
              </p>
              <p className="transition-all group-hover:text-white group-focus:text-white">Upcoming Deadline</p>
            </div>
          </Card>
        </Link>
        <div className="flex flex-row gap-4">
          <Link href="board" className="group w-1/3 outline-none">
            <Card className="flex h-32 flex-row gap-2 p-4 transition-all hover:scale-105 group-hover:bg-primary group-focus:scale-105 group-focus:bg-primary">
              <div className="flex flex-col items-center">
                <p className="text-4xl font-semibold transition-all group-hover:text-white group-focus:text-white">
                  {tasks.length}
                </p>
                <p className="text-center transition-all group-hover:text-white group-focus:text-white">
                  Tasks in Board
                </p>
              </div>
            </Card>
          </Link>
          <Link href="board" className="group w-1/3 outline-none">
            <Card className="flex h-32 flex-row gap-2 p-4 transition-all group-hover:scale-105 group-hover:bg-primary group-focus:scale-105 group-focus:bg-primary">
              <div className="flex flex-col items-center">
                <p className="text-4xl font-semibold transition-all group-hover:text-white group-focus:text-white">
                  {getCounts(tasks).inProgress}
                </p>
                <p className="text-center transition-all group-hover:text-white group-focus:text-white">
                  Tasks in Progress
                </p>
              </div>
            </Card>
          </Link>
          <Link href="board" className="group w-1/3 outline-none">
            <Card className="flex h-32 flex-row gap-2 p-4 transition-all group-hover:scale-105 group-hover:bg-primary group-focus:scale-105 group-focus:bg-primary">
              <div className="flex flex-col items-center">
                <p className="text-4xl font-semibold transition-all group-hover:text-white group-focus:text-white">
                  {getCounts(tasks).awaitingFeedback}
                </p>
                <p className="text-center transition-all group-hover:text-white group-focus:text-white">
                  Awaiting Feedback
                </p>
              </div>
            </Card>
          </Link>
        </div>
      </div>
      <span className="hidden w-fit cursor-default flex-col gap-2 xl:flex">
        <p className="text-4xl font-semibold dark:text-textDark">Good morning,</p>
        <p className="text-5xl font-semibold text-underline">
          {(user as { username: string; email: string }).username}
        </p>
      </span>
    </div>
  );
};

export default SummaryTaskArea;
