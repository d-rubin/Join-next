import { Contact, Task } from "../types";
import { generalHelper, getAssignee, getBackgroundForCategory } from "../helper/generalHelper";

const BoardTask = ({ task, contacts }: { task: Task; contacts: Contact[] }) => {
  return (
    <article
      className="p-4 min-w-40 w-40 bg-white rounded-3xl flex flex-col justify-between gap-2 lg:h-fit lg:w-full cursor-pointer"
      draggable
      // onClick={() => handleTaskClick(task)}
      // onDragStart={() => setDraggedTask(task)}
      key={task.id}
    >
      <p
        className="text-white px-4 py-1 w-fit rounded-lg"
        style={{ backgroundColor: getBackgroundForCategory(task.category) }}
      >
        {generalHelper(task.category)}
      </p>
      <p className="text-lg font-bold">{task.title}</p>
      <p>{task.description}</p>
      <p>Assigned to: {getAssignee(task.assignee, contacts)}</p>
    </article>
  );
};

export default BoardTask;
