import { getTasks } from "../../../helper/fetchApi";
import { Task } from "../../../types";
import PagePadding from "../../../components/PagePadding";

const SummaryPage = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getNextDeadline = async () => {
    let nextDeadline: Date = new Date(0);

    const tasks = await getTasks();

    if (Array.isArray(tasks)) {
      tasks.forEach((task) => {
        const deadline = new Date(task.due_date);
        if (deadline > nextDeadline) nextDeadline = deadline;
      });
    } else {
      return "No Deadline";
    }

    return new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "long", year: "numeric" }).format(nextDeadline);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getCounts = (tasks: Task[]) => {
    let toDo = 0;
    let inProgress = 0;
    let awaitingFeedback = 0;
    let done = 0;
    let urgent = 0;
    let taskCount = 0;

    tasks!.forEach((task) => {
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
    <PagePadding>
      <div className="flex flex-col gap-2 lg:gap-4 lg:flex-row lg: lg:items-center">
        <h1 className="text-4xl font-bold">Join 360</h1>
        <p className="lg:hidden">Key Metrics at a Glance</p>
        <div className="border-b-2 border-underline w-20 lg:hidden" />
        <div className="border-l-2 border-underline h-10 hidden lg:block" />
        <p className="hidden lg:block text-xl">Key Metrics at a Glance</p>
      </div>
    </PagePadding>
  );
};

export default SummaryPage;
