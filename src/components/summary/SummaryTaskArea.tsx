import Link from "next/link";
import Card from "../Card";
import Icon from "../Icon";
import { Task } from "../../types";
import { getCurrentUser, getTasks } from "../../helper/serverActions";

const SummaryTaskArea = async () => {
  const tasks = await getTasks();
  const user = await getCurrentUser();

  const getNextDeadline = (items: Array<Task>) => {
    let nextDeadline: Date = new Date(0);

    if (Array.isArray(items)) {
      tasks.forEach((task) => {
        const deadline = new Date(task.due_date);
        if (deadline > nextDeadline) nextDeadline = deadline;
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
    <div className="flex gap-36 items-center justify-center xl:justify-start w-full">
      <div className="flex flex-col gap-8 w-full max-w-screen-sm">
        <div className="flex flex-row gap-4 w-full">
          <Link href="board" className="w-1/2 group outline-none">
            <Card className="flex flex-row gap-2 h-32 p-4 transition-all group-hover:scale-105 group-hover:bg-primary group-focus:scale-105 group-focus:bg-primary">
              <span className="rounded-full w-12 h-12 bg-primary flex items-center justify-center transition-all group-hover:scale-105 group-hover:bg-white group-focus:scale-105 group-focus:bg-white">
                <Icon
                  icon="pencil"
                  className="stroke-white fill-white transition-all group-hover:scale-105 group-hover:fill-primary group-hover:stroke-primary group-focus:scale-105 group-focus:fill-primary group-focus:stroke-primary"
                  iconSize="h-8 w-8"
                />
              </span>
              <div className="flex flex-col items-center">
                <p className="text-4xl font-semibold transition-all group-hover:text-white group-hover:scale-105 group-focus:text-white group-focus:scale-105">
                  {getCounts(tasks).toDo}
                </p>
                <p className="transition-all group-hover:text-white group-hover:scale-105 group-focus:text-white group-focus:scale-105">
                  To-do
                </p>
              </div>
            </Card>
          </Link>
          <Link href="board" className="w-1/2 group outline-none">
            <Card className="flex flex-row gap-2 h-32 p-4 transition-all group-hover:bg-primary group-hover:scale-105 group-focus:bg-primary group-focus:scale-105">
              <span className="rounded-full w-12 h-12 bg-primary flex items-center justify-center transition-all group-hover:bg-white group-hover:scale-105 group-focus:bg-white group-focus:scale-105">
                <Icon
                  icon="check"
                  className="stroke-white fill-white transition-all group-hover:stroke-primary group-hover:fill-primary group-hover:scale-105 group-focus:stroke-primary group-focus:fill-primary group-focus:scale-105"
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
        <Link href="board" className="block outline-none group">
          <Card className="flex flex-row justify-around gap-2 h-32 p-4 transition-all group-hover:bg-primary group-hover:scale-105 group-focus:bg-primary group-focus:scale-105">
            <span className="flex flex-row justify-evenly gap-2 w-1/2">
              <span className="rounded-full w-12 h-12 bg-red flex items-center justify-center transition-all group-hover:scale-105 group-focus:scale-105">
                <Icon
                  icon="urgent"
                  className="stroke-white fill-white transition-all group-hover:scale-105 group-focus:scale-105"
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
            <div className="h-4/5 border-grey border-l-2" />
            <div className="w-1/2 text-center">
              <p className="text-lg font-semibold transition-all group-hover:text-white group-focus:text-white">
                {getNextDeadline(tasks)}
              </p>
              <p className="group-hover:text-white group-focus:text-white transition-all">Upcoming Deadline</p>
            </div>
          </Card>
        </Link>
        <div className="flex flex-row gap-4">
          <Link href="board" className="w-1/3 outline-none group">
            <Card className="flex flex-row gap-2 h-32 p-4 transition-all group-hover:bg-primary hover:scale-105 group-focus:bg-primary group-focus:scale-105">
              <div className="flex flex-col items-center">
                <p className="text-4xl font-semibold transition-all group-hover:text-white group-focus:text-white">
                  {tasks.length}
                </p>
                <p className="group-hover:text-white group-focus:text-white transition-all text-center">
                  Tasks in Board
                </p>
              </div>
            </Card>
          </Link>
          <Link href="board" className="w-1/3 outline-none group">
            <Card className="flex flex-row gap-2 h-32 p-4 transition-all group-hover:bg-primary group-hover:scale-105 group-focus:bg-primary group-focus:scale-105">
              <div className="flex flex-col items-center">
                <p className="text-4xl font-semibold group-hover:text-white group-focus:text-white transition-all">
                  {getCounts(tasks).inProgress}
                </p>
                <p className="group-hover:text-white group-focus:text-white transition-all text-center">
                  Tasks in Progress
                </p>
              </div>
            </Card>
          </Link>
          <Link href="board" className="w-1/3 outline-none group">
            <Card className="flex flex-row gap-2 h-32 p-4 transition-all group-hover:bg-primary group-hover:scale-105 group-focus:bg-primary group-focus:scale-105">
              <div className="flex flex-col items-center">
                <p className="text-4xl font-semibold group-hover:text-white group-focus:text-white transition-all">
                  {getCounts(tasks).awaitingFeedback}
                </p>
                <p className="group-hover:text-white group-focus:text-white transition-all text-center">
                  Awaiting Feedback
                </p>
              </div>
            </Card>
          </Link>
        </div>
      </div>
      <span className="w-fit flex-col gap-2 hidden xl:flex">
        <p className="text-4xl font-semibold">Good morning,</p>
        <p className="text-5xl font-semibold text-underline">{user.username}</p>
      </span>
    </div>
  );
};

export default SummaryTaskArea;
