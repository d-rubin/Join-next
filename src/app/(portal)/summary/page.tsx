import Link from "next/link";
import { getTasks } from "../../../helper/fetchApi";
import { Task } from "../../../types";
import PagePadding from "../../../components/PagePadding";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";

const SummaryPage = async () => {
  const tasks = await getTasks();

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
    <PagePadding className="gap-8 flex flex-col">
      <div className="flex flex-col gap-2 lg:gap-4 lg:flex-row lg: lg:items-center cursor-default">
        <h1 className="text-5xl font-bold">Join 360</h1>
        <p className="lg:hidden">Key Metrics at a Glance</p>
        <div className="border-b-2 border-underline w-20 lg:hidden" />
        <div className="border-l-2 border-underline h-10 hidden lg:block" />
        <p className="hidden lg:block text-xl">Key Metrics at a Glance</p>
      </div>
      {tasks && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-row gap-4">
            <Link href="board" className="w-1/2 max-w-[12rem]">
              <Card className="flex flex-row gap-2 group hover:bg-primary h-28 p-4 transition-all hover:scale-105">
                <span className="rounded-full w-12 h-12 bg-primary group-hover:bg-white flex items-center justify-center transition-all group-hover:scale-105">
                  <Icon
                    icon="pencil"
                    className="stroke-white fill-white group-hover:stroke-primary group-hover:fill-primary transition-all group-hover:scale-105"
                    iconSize="h-8 w-8"
                  />
                </span>
                <div className="flex flex-col items-center">
                  <p className="text-4xl font-semibold group-hover:text-white transition-all group-hover:scale-105">
                    {getCounts(tasks).toDo}
                  </p>
                  <p className="group-hover:text-white transition-all group-hover:scale-105">To-do</p>
                </div>
              </Card>
            </Link>
            <Link href="board" className="w-1/2 max-w-[12rem]">
              <Card className="flex flex-row gap-2 group hover:bg-primary h-28 p-4 transition-all hover:scale-105">
                <span className="rounded-full w-12 h-12 bg-primary group-hover:bg-white flex items-center justify-center transition-all group-hover:scale-105">
                  <Icon
                    icon="check"
                    className="stroke-white fill-white group-hover:stroke-primary group-hover:fill-primary transition-all group-hover:scale-105"
                    iconSize="h-8 w-8"
                  />
                </span>
                <div className="flex flex-col items-center">
                  <p className="text-4xl font-semibold group-hover:text-white transition-all">
                    {getCounts(tasks).done}
                  </p>
                  <p className="group-hover:text-white transition-all">Done</p>
                </div>
              </Card>
            </Link>
          </div>
          <Link href="board" className="block w-full max-w-[25rem]">
            <Card className="flex flex-row justify-around gap-2 group hover:bg-primary h-28 p-4 transition-all hover:scale-105">
              <span className="rounded-full w-12 h-12 bg-red flex items-center justify-center transition-all group-hover:scale-105">
                <Icon
                  icon="urgent"
                  className="stroke-white fill-white transition-all group-hover:scale-105"
                  iconSize="h-8 w-8"
                />
              </span>
              <div className="flex flex-col items-center">
                <p className="text-4xl font-semibold group-hover:text-white transition-all">
                  {getCounts(tasks).urgent}
                </p>
                <p className="group-hover:text-white transition-all">Urgent</p>
              </div>
              <div className="h-4/5 border-grey border-l-2" />
              <div>
                <p className="text-lg font-semibold group-hover:text-white transition-all">{getNextDeadline(tasks)}</p>
                <p className="group-hover:text-white transition-all">Upcoming Deadline</p>
              </div>
            </Card>
          </Link>
          <div className="flex flex-row gap-4">
            <Link href="board" className="w-1/3 max-w-[7.6rem]">
              <Card className="flex flex-row gap-2 group hover:bg-primary h-28 p-4 transition-all hover:scale-105">
                <div className="flex flex-col items-center">
                  <p className="text-4xl font-semibold group-hover:text-white transition-all">{tasks.length}</p>
                  <p className="group-hover:text-white transition-all text-center">Tasks in Board</p>
                </div>
              </Card>
            </Link>
            <Link href="board" className="w-1/3 max-w-[7.6rem]">
              <Card className="flex flex-row gap-2 group hover:bg-primary h-28 p-4 transition-all hover:scale-105">
                <div className="flex flex-col items-center">
                  <p className="text-4xl font-semibold group-hover:text-white transition-all">
                    {getCounts(tasks).inProgress}
                  </p>
                  <p className="group-hover:text-white transition-all text-center">Tasks in Progress</p>
                </div>
              </Card>
            </Link>
            <Link href="board" className="w-1/3 max-w-[7.6rem]">
              <Card className="flex flex-row gap-2 group hover:bg-primary h-28 p-4 transition-all hover:scale-105">
                <div className="flex flex-col items-center">
                  <p className="text-4xl font-semibold group-hover:text-white transition-all">
                    {getCounts(tasks).awaitingFeedback}
                  </p>
                  <p className="group-hover:text-white transition-all text-center">Awaiting Feedback</p>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      )}
    </PagePadding>
  );
};

export default SummaryPage;
