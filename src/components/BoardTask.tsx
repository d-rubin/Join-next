"use client";

import { Fragment, useContext, useState } from "react";
import { Contact, PrioType, Task } from "../types";
import { generalHelper, getAssignee, getBackgroundForCategory } from "../helper/generalHelper";
import { DnDContext } from "../contexts/DnD.context";
import Icon from "./Icon";
import DefaultInput from "./inputs/Default";
import Textarea from "./inputs/Textarea";
import Prio from "./Prio";
import SubmitButton from "./forms/SubmitButton";
import { AddTaskSchema } from "../schemas";
import { updateTask } from "../helper/serverActions";

const BoardTask = ({ task, contacts }: { task: Task; contacts: Contact[] }) => {
  const { updateDraggedTask } = useContext(DnDContext);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<boolean>(false);
  const [prio, setPrio] = useState<PrioType | undefined>(task ? task.priority : undefined);
  const [error, setError] = useState<boolean>(false);
  const submitHandler = async (formData: FormData) => {
    setError(false);
    try {
      const body = AddTaskSchema.parse({
        id: Number(formData.get("id")),
        title: formData.get("title"),
        description: formData.get("description"),
        assignee: formData.get("assignee"),
        due_date: formData.get("due_date"),
        category: formData.get("category"),
        priority: prio || "low",
      });
      await updateTask(body).then((res) => {
        if ("id" in res) {
          setDialogOpen(false);
        } else {
          setError(true);
        }
      });
    } catch (e) {
      console.error("Error while creating the Task", e);
      setError(true);
    }
  };

  const deleteTask = () => {};

  return (
    <Fragment key={task.id}>
      <div
        className="p-4 min-w-40 w-52 bg-white rounded-3xl flex flex-col justify-between gap-2 lg:h-fit lg:w-full cursor-pointer"
        draggable
        onDragStart={() => updateDraggedTask(task)}
        onDragEnd={() => updateDraggedTask(null)}
        onClick={() => setDialogOpen(true)}
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
      </div>
      <dialog className="fixed top-0 left-0 w-screen h-full bg-transparent" open={dialogOpen}>
        <div className="flex items-center justify-center w-full h-full bg-transparent">
          <div className="z-10 w-fit h-fit bg-white rounded-3xl p-4 min-w-[20rem] shadow-2xl">
            {editTask ? (
              <form action={submitHandler} className="flex flex-col gap-4 relative">
                <Icon
                  icon="arrowLeft"
                  className="hover:stroke-underline hover:fill-underline absolute right-0 top-0"
                  onClick={() => setEditTask(false)}
                />
                <input name="id" type="number" required defaultValue={task.id} className="hidden" />
                <DefaultInput
                  type="text"
                  name="title"
                  required
                  maxLength={50}
                  placeholder="Enter a title"
                  block
                  defaultValue={task ? task.title : undefined}
                  isError={error}
                  label="Title"
                />
                <Textarea
                  name="description"
                  placeholder="Enter a description"
                  block
                  required
                  maxLength={100}
                  isError={error}
                  label="Description"
                  className="h-20"
                  defaultValue={task ? task.description : undefined}
                />
                <div className="flex flex-col gap-1">
                  <p>Priority</p>
                  <div className="flex flex-row gap-2">
                    <Prio prio="urgent" active={prio === "high"} setPrio={setPrio} />
                    <Prio prio="medium" active={prio === "medium"} setPrio={setPrio} />
                    <Prio prio="low" active={prio === "low"} setPrio={setPrio} />
                  </div>
                </div>
                <DefaultInput
                  type="date"
                  required
                  name="due_date"
                  defaultValue={task ? task.due_date : undefined}
                  isError={error}
                  block
                  label="Due Date"
                />
                <div className="flex flex-col gap-1">
                  <p>Category</p>
                  <select
                    name="category"
                    required
                    defaultValue={task ? task.category : undefined}
                    className={`border-2 border-outline w-full rounded-lg px-3 focus:border-underline outline-none py-1.5 ${
                      error ? "border-red" : ""
                    }`}
                  >
                    <option value="">Select task category</option>
                    <option value="backoffice">Backoffice</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                    <option value="sales">Sales</option>
                    <option value="media">Media</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <p>Assignee</p>
                  <select
                    name="assignee"
                    required
                    defaultValue={task ? task.assignee : undefined}
                    className={`border-2 border-outline w-full rounded-lg px-3 focus:border-underline outline-none py-1.5 ${
                      error ? "border-red" : ""
                    }`}
                  >
                    <option value="">Select Assignee</option>
                    {contacts.map((contact) => {
                      return (
                        <option value={contact.id} key={contact.email}>
                          {contact.username}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <span className="w-full flex justify-end">
                  <SubmitButton text="Edit" icon="pencil" />
                </span>
              </form>
            ) : (
              <div className="gap-2 flex flex-col relative">
                <Icon
                  icon="x"
                  className="absolute right-0 top-0 hover:border-underline hover:stroke-underline hover:fill-underline"
                  onClick={() => setDialogOpen(false)}
                />
                <p
                  className="text-white px-4 py-1 w-fit rounded-lg"
                  style={{ backgroundColor: getBackgroundForCategory(task.category) }}
                >
                  {generalHelper(task.category)}
                </p>
                <p className="text-lg font-bold">{task.title}</p>
                <p>{task.description}</p>
                <span className="flex flex-row gap-2">
                  <p className="w-1/3">Assigned to:</p>
                  <p className="w-2/2"> {getAssignee(task.assignee, contacts)}</p>
                </span>
                <span className="flex flex-row gap-2">
                  <p className="w-1/3">Due Date:</p>
                  <p className="w-2/2">
                    {new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" }).format(
                      new Date(task.due_date),
                    )}
                  </p>
                </span>
                <span className="flex flex-row gap-2">
                  <p className="w-1/3">Priority:</p>
                  <p className="w-2/2">
                    {task.priority.charAt(0).toUpperCase()}
                    {task.priority.slice(1)}
                  </p>
                </span>
                <span className="flex flex-row gap-2 w-full justify-end">
                  <Icon
                    rounded-2xl
                    icon="pencil"
                    iconSize="h-8 w-8"
                    className="border-primary border-2 rounded-lg hover:border-underline hover:stroke-underline hover:fill-underline"
                    onClick={() => setEditTask(true)}
                  />
                  <Icon
                    icon="trash"
                    iconSize="h-8 w-8"
                    className="border-primary border-2 rounded-lg hover:border-underline hover:stroke-underline hover:fill-underline"
                    onClick={deleteTask}
                  />
                </span>
              </div>
            )}
          </div>
        </div>
      </dialog>
    </Fragment>
  );
};

export default BoardTask;
