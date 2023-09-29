"use client";

import { ForwardedRef, forwardRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Image from "next/image";
import { generalHelper, getAssignee, getBackgroundForCategory } from "../../helper/generalHelper";
import { Task, User } from "../../interface";
import { updateTask } from "../../helper/fetchApi";
import highImage from "../../img/high.svg";
import mediumImage from "../../img/medium.svg";
import lowImage from "../../img/low.svg";
import checkImage from "../../img/check.svg";

type TaskDialogProps = {
  task: Task;
  contacts: User[];
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
    updateTask({ ...(data as Task), ...{ priority: prio }, ...{ id } }).then(() => {
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
      className="outline-0 rounded-2xl shadow-2xl"
    >
      <div className="flex flex-col gap-2">
        {!editTask ? (
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
                className="border-2 border-[--color-outline] h-8 rounded-lg px-2"
              />
            </label>
            <label htmlFor="description" className="flex flex-col gap-2">
              <p>Description</p>
              <textarea
                {...register("description", { required: true, maxLength: 100, value: description })}
                placeholder="Enter a description"
                className="border-2 border-[--color-outline] h-32 rounded-lg px-2"
              />
            </label>
            <div className="flex flex-col gap-2">
              <p>Prio</p>
              <div className="flex gap-4">
                <button
                  onClick={() => setPrio("high")}
                  type="button"
                  className="flex w-1/3 justify-around gap-2 rounded-lg p-2 bg-white shadow-xl border-[--color-outline] border-2 items-center"
                >
                  <span>Urgent</span>
                  <Image src={highImage} alt="Urgent" />
                </button>
                <button
                  onClick={() => setPrio("medium")}
                  type="button"
                  className="flex w-1/3 justify-around gap-2 rounded-lg p-2 bg-white shadow-xl border-[--color-outline] border-2 items-center"
                >
                  <span>Medium</span>
                  <Image src={mediumImage} alt="Medium" />
                </button>
                <button
                  onClick={() => setPrio("low")}
                  type="button"
                  className="flex w-1/3 justify-around gap-2 rounded-lg p-2 bg-white shadow-xl border-[--color-outline] border-2 items-center"
                >
                  <span>Low</span>
                  <Image src={lowImage} alt="Low" />
                </button>
              </div>
            </div>
            <label htmlFor="due_date" className="flex flex-col gap-2">
              <p>Due date</p>
              <input
                type="date"
                {...register("due_date", { required: true, value: due_date })}
                className="border-2 border-[--color-outline] h-8 w-full rounded-lg px-2"
              />
            </label>
            <div className="flex flex-col gap-2">
              <p>Category</p>
              <select
                {...register("category", { value: category })}
                className="border-2 border-[--color-outline] h-8 w-full rounded-lg px-2"
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
                className="border-2 border-[--color-outline] h-8 w-full rounded-lg px-2"
              >
                {contacts.map((contact) => {
                  return (
                    <option value={contact.id} key={contact.email}>
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
                className="border-2 border-[--color-outline] h-8 w-full rounded-lg px-2"
              >
                <option value="inProgress">In Progress</option>
                <option value="toDo">To do</option>
                <option value="awaitingFeedback">Awaiting feedback</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div className="w-full flex justify-end">
              <button
                type="submit"
                className="w-fit h-12 px-4 bg-[--color-primary] rounded-lg text-white text-xl flex items-center gap-2"
              >
                <Image src={checkImage} alt="Create" />
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
