import { generalHelper, getAssignee, getBackgroundForCategory } from "../helper/generalHelper";
import { Task, User } from "../interface";

const ShowTaskTemplate = (
  openTask: Task,
  contacts: User[],
  closeDialog: () => void,
  setEditTask: (bool: boolean) => void,
) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { category, title, description, priority, due_date, status, assignee } = openTask;

  return (
    <div className="flex flex-col gap-2">
      <p
        className="text-white px-4 py-1 w-fit rounded-lg"
        style={{ backgroundColor: getBackgroundForCategory(category) }}
      >
        {generalHelper(category)}
      </p>
      <p className="text-lg font-bold">{title}</p>
      <p>{description}</p>
      <p>Priority: {priority}</p>
      <p>Due Date: {due_date}</p>
      <p>Status: {status}</p>
      <p>Assigned to: {getAssignee(assignee, contacts)}</p>
      <div className="flex flex-row justify-end gap-2">
        <button onClick={closeDialog}>Close</button>
        <button onClick={() => setEditTask(true)}>Edit</button>
      </div>
    </div>
  );
};

export default ShowTaskTemplate;
