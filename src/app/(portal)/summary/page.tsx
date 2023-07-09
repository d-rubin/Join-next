"use client";

import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getTasks, getUser } from "../../../helper/fetchApi";
import { Task } from "../../../interface";

interface Counts {
  toDo: number;
  inProgress: number;
  awaitingFeedback: number;
  done: number;
  urgent: number;
  taskCount: number;
}

const SummaryPage = () => {
  const cookieStore = new Cookies();
  const router = useRouter();
  const authToken = cookieStore.get("authToken");
  const [response, setResponse] = useState<Task[]>();
  const [counts, setCounts] = useState<Counts>();
  // const [user, setUser] = useState();

  const getNextDeadline = () => {
    let nextDeadline: Date;

    response!.forEach((task) => {
      const taskDueDate = new Date(task.due_date);
      if (!nextDeadline || taskDueDate < nextDeadline) {
        nextDeadline = taskDueDate;
      }
    });

    return new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "long", year: "numeric" }).format(nextDeadline!);
  };

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

    setCounts({
      toDo,
      inProgress,
      awaitingFeedback,
      done,
      urgent,
      taskCount,
    });
  };

  useEffect(() => {
    if (authToken) {
      getTasks().then((res) => {
        setResponse(res);
        getCounts(res);
      });
      // Todo: getUser
      // getUser(authToken).then((res) => setUser(res));
    } else {
      router.push("/login");
    }
  }, []);

  return (
    counts && (
      <>
        <div className="flex flex-col gap-8">
          <div className="gap-4 flex flex-col md:flex-row md:items-center md:relative md:justify-between md:w-[27rem]">
            <p className="md:hidden">Kanban Project Management Tool</p>
            <h2 className="text-4xl font-bold">Summary</h2>
            <p className="text-xl">Everything in a nutshell!</p>
            <div className="border-[--color-underline] border-2 w-28 md:w-12 md:rotate-90 md:absolute md:left-40" />
          </div>
          <div className="flex gap-8 flex-col text-center max-w-[40rem]">
            <div className="flex gap-4">
              <div className="w-1/3 bg-white h-36 rounded-3xl shadow-xl flex flex-col items-center justify-around py-4">
                <p className="text-5xl font-bold">{counts.taskCount}</p>
                <p>Tasks in Board</p>
              </div>
              <div className="w-1/3 bg-white h-36 rounded-3xl shadow-xl flex flex-col items-center justify-around py-4">
                <p className="text-5xl font-bold">{counts.inProgress}</p>
                <p>Tasks in progress</p>
              </div>
              <div className="w-1/3 bg-white h-36 rounded-3xl shadow-xl flex flex-col items-center justify-around py-4">
                <p className="text-5xl font-bold">{counts.awaitingFeedback}</p>
                <p>Awaiting feedback</p>
              </div>
            </div>
            <div className="w-ful bg-white h-36 rounded-3xl shadow-xl flex flex-row p-4 gap-4 justify-around">
              <div className="flex flex-col items-center justify-around">
                <p className="text-5xl font-bold">{counts.urgent}</p>
                <p>Urgent</p>
              </div>
              <div className="border-[--color-outline] border-2 h-28 w-0" />
              <div className="flex flex-col items-center justify-center">
                <p className="text-lg font-bold">{getNextDeadline()}</p>
                <p>Upcoming Deadline</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/2 bg-white h-36 rounded-3xl shadow-xl flex flex-col items-center justify-around py-4">
                <p className="text-5xl font-bold">{counts.toDo}</p>
                <p>To-do</p>
              </div>
              <div className="w-1/2 bg-white h-36 rounded-3xl shadow-xl flex flex-col items-center justify-around py-4">
                <p className="text-5xl font-bold">{counts.done}</p>
                <p>Done</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-3/4 top-1/2 -translate-y-1/2 hidden xl:block">
          <h4 className="text-2xl">Good morning,</h4>
          <h3 className="text-3xl text-[--color-underline] font-semibold">User</h3>
        </div>
      </>
    )
  );
};

export default SummaryPage;
