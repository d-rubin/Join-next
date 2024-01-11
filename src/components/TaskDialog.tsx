"use client";

import { ForwardedRef, forwardRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { firstCharToUpperCase, getAssignee, getBackgroundForCategory } from "../utils/generalHelper";
import { TTask, TContact } from "../types";
import Icon from "./Basics/Icon";
import { updateTask } from "../utils/serverActions";

type TaskDialogProps = {
  task: TTask;
  contacts: TContact[];
  closeDialog: () => void;
};

const TaskDialog = forwardRef((props: TaskDialogProps, ref: ForwardedRef<HTMLDialogElement>) => {
  const [editTask, setEditTask] = useState<boolean>(false);
  const { register, handleSubmit } = useForm();
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    task: { id, category, title, description, priority, due_date, status, assignee },
    contacts,
    closeDialog,
  } = props;
  const [prio, setPrio] = useState<"high" | "medium" | "low">(priority);

  const submitHandler = (data: FieldValues) => {
    updateTask({ ...(data as TTask), ...{ priority: prio }, ...{ id } }).then(() => {
      closeDialog();
    });
  };

  return (
    <dialog
      ref={(node) => {
        if (typeof ref === "object") {
          // eslint-disable-next-line no-param-reassign
          ref!.current = node;
        }
      }}
      id="dialog"
      className="rounded-2xl shadow-2xl outline-0"
    >
      <div className="flex flex-col gap-2">
        {!editTask ? (
          // @ts-ignore
          <div className="flex flex-col gap-2">
            <p
              className="w-fit rounded-lg px-4 py-1 text-white"
              style={{ backgroundColor: getBackgroundForCategory(category) }}
            >
              {firstCharToUpperCase(category)}
            </p>

            <p className="text-lg font-bold">{title}</p>
            <p>{description}</p>
            <p>Priority: {priority}</p>
            <p>Due Date: {due_date}</p>
            <p>Status: {status}</p>
            <p>Assigned to: {getAssignee(assignee, contacts)}</p>
            <div className="flex flex-row justify-end gap-2">
              <button onClick={() => closeDialog()}>Close</button>
              <button onClick={() => setEditTask(true)}>Edit</button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-2">
            <label htmlFor="title" className="flex flex-col gap-2">
              <p>Title</p>
              <input
                type="text"
                {...register("title", { required: true, maxLength: 30, value: title })}
                placeholder="Enter a title"
                className="h-8 rounded-lg border-2 border-outline px-2"
              />
            </label>
            <label htmlFor="description" className="flex flex-col gap-2">
              <p>Description</p>
              <textarea
                {...register("description", { required: true, maxLength: 100, value: description })}
                placeholder="Enter a description"
                className="h-32 rounded-lg border-2 border-outline px-2"
              />
            </label>
            <div className="flex flex-col gap-2">
              <p>Prio</p>
              <div className="flex gap-4">
                <button
                  onClick={() => setPrio("high")}
                  type="button"
                  className="flex w-1/3 items-center justify-around gap-2 rounded-lg border-2 border-outline bg-white p-2 shadow-xl"
                >
                  <span>Urgent</span>
                  <Icon icon="urgent" />
                </button>
                <button
                  onClick={() => setPrio("medium")}
                  type="button"
                  className="flex w-1/3 items-center justify-around gap-2 rounded-lg border-2 border-outline bg-white p-2 shadow-xl"
                >
                  <span>Medium</span>
                  <Icon icon="medium" />
                </button>
                <button
                  onClick={() => setPrio("low")}
                  type="button"
                  className="flex w-1/3 items-center justify-around gap-2 rounded-lg border-2 border-outline bg-white p-2 shadow-xl"
                >
                  <span>Low</span>
                  <Icon icon="low" />
                </button>
              </div>
            </div>
            <label htmlFor="due_date" className="flex flex-col gap-2">
              <p>Due date</p>
              <input
                type="date"
                {...register("due_date", { required: true, value: due_date })}
                className="h-8 w-full rounded-lg border-2 border-outline px-2"
              />
            </label>
            <div className="flex flex-col gap-2">
              <p>Category</p>
              <select
                {...register("category", { value: category })}
                className="h-8 w-full rounded-lg border-2 border-outline px-2"
              >
                <option value="backoffice">Backoffice</option>
                <option value="design">Design</option>
                <option value="marketing">Marketing</option>
                <option value="sales">Sales</option>
                <option value="media">Media</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <p>Assignee</p>
              <select
                {...register("assignee", { value: assignee })}
                className="h-8 w-full rounded-lg border-2 border-outline px-2"
              >
                {contacts.map((contact) => {
                  return (
                    <option value={contact.id} key={uuidv4()}>
                      {contact.username}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <p>Status</p>
              <select
                {...register("status", { value: status })}
                className="h-8 w-full rounded-lg border-2 border-outline px-2"
              >
                <option value="inProgress">In Progress</option>
                <option value="toDo">To do</option>
                <option value="awaitingFeedback">Awaiting feedback</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div className="flex w-full justify-end">
              <button
                type="submit"
                className="flex h-12 w-fit items-center gap-2 rounded-lg bg-primary px-4 text-xl text-white"
              >
                {/* <Image src={checkImage} alt="Create" /> */}
              </button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
});

TaskDialog.displayName = "TaskDialog";
export default TaskDialog;
