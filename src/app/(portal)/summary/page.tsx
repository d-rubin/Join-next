// import Cookies from "universal-cookie";
// import { useRouter } from "next/navigation";
// import { getTasks } from "../../../helper/fetchApi";
// import { Task } from "../../../types";
//
// interface Counts {
//   toDo: number;
//   inProgress: number;
//   awaitingFeedback: number;
//   done: number;
//   urgent: number;
//   taskCount: number;
// }

const SummaryPage = async () => {
  // const getNextDeadline = () => {
  //   let nextDeadline: Date;
  //
  //   response!.forEach((task) => {
  //     const taskDueDate = new Date(task.due_date);
  //     if (!nextDeadline || taskDueDate < nextDeadline) {
  //       nextDeadline = taskDueDate;
  //     }
  //   });
  //
  //   return new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "long", year: "numeric" }).format(nextDeadline!);
  // };

  // const getCounts = (tasks: Task[]) => {
  //   let toDo = 0;
  //   let inProgress = 0;
  //   let awaitingFeedback = 0;
  //   let done = 0;
  //   let urgent = 0;
  //   let taskCount = 0;
  //
  //   tasks!.forEach((task) => {
  //     switch (task.status) {
  //       case "toDo":
  //         toDo += 1;
  //         break;
  //       case "inProgress":
  //         inProgress += 1;
  //         break;
  //       case "awaitingFeedback":
  //         awaitingFeedback += 1;
  //         break;
  //       default:
  //         done += 1;
  //         break;
  //     }
  //
  //     if (task.priority === "high") urgent += 1;
  //     taskCount += 1;
  //   });
  //
  //   setCounts({
  //     toDo,
  //     inProgress,
  //     awaitingFeedback,
  //     done,
  //     urgent,
  //     taskCount,
  //   });
  // };

  // useEffect(() => {
  //   if (authToken) {
  //     getTasks().then((res) => {
  //       setResponse(res);
  //       getCounts(res);
  //     });
  //     // Todo: getUser
  //     // getUser(authToken).then((res) => setUser(res));
  //   } else {
  //     router.push("/");
  //   }
  // }, []);

  return <div />;
};

export default SummaryPage;
