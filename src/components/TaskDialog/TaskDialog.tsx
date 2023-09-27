"use client";

import { forwardRef, LegacyRef, useState } from "react";
import { generalHelper, getAssignee, getBackgroundForCategory } from "../../helper/generalHelper";
import { Task, User } from "../../interface";

type TaskDialogProps = {
  task: Task;
  contacts: User[];
  closeDialog: () => void;
};

const TaskDialog = forwardRef((props: TaskDialogProps, ref: LegacyRef<HTMLDialogElement>) => {
  const [editTask, setEditTask] = useState<boolean>(false);
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    task: { category, title, description, priority, due_date, status, assignee },
    contacts,
    closeDialog,
  } = props;

  return (
    <dialog className="outline-0 rounded-2xl shadow-2xl absolute flex justify-center align-middle" ref={ref}>
      {!editTask && (
        // @ts-ignore
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
      )}
    </dialog>
  );
});

export default TaskDialog;
