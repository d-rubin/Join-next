"use client";

import { Fragment, useContext, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { Contact, PrioType, Task } from "../types";
import { generalHelper, getAssignee, getBackgroundForCategory } from "../helper/generalHelper";
import { DnDContext } from "../contexts/DnD.context";
import Icon from "./Icon";
import Text from "./Text";
import DefaultInput from "./inputs/Default";
import Textarea from "./inputs/Textarea";
import Prio from "./Prio";
import { taskSchema } from "../schemas";
import { deleteTask, updateTask } from "../helper/serverActions";
import BigButton from "./buttons/BigButton";

const BoardTask = ({ task, contacts }: { task: Task; contacts: Contact[] }) => {
  const { updateDraggedTask } = useContext(DnDContext);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({ resolver: zodResolver(taskSchema) });
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<boolean>(false);
  const [prio, setPrio] = useState<PrioType | undefined>(task ? task.priority : undefined);

  const onSubmit = async (fieldValues: FieldValues) => {
    await updateTask({ ...fieldValues, ...{ priority: prio || "low" } }).then((res) => {
      if (!res) {
        setDialogOpen(false);
        setEditTask(false);
      }
    });
  };

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
        <p className="text-gray-500">{task.description}</p>
      </div>
      <dialog className="fixed top-0 left-0 w-screen h-full bg-transparent" open={dialogOpen}>
        <div className="flex items-center justify-center w-full h-full bg-transparent">
          <div className="z-10 w-fit h-fit bg-white rounded-3xl p-4 min-w-[20rem] shadow-2xl">
            {editTask ? (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 relative">
                <input type="number" {...register("id", { value: task.id })} hidden />
                <Icon
                  icon="arrowLeft"
                  className="hover:stroke-underline hover:fill-underline absolute right-0 top-0"
                  onClick={() => setEditTask(false)}
                />
                <input name="id" type="number" required defaultValue={task.id} className="hidden" />
                <DefaultInput
                  type="text"
                  name="title"
                  register={register}
                  placeholder="Enter a title"
                  block
                  defaultValue={task ? task.title : undefined}
                  isError={!!errors.title}
                  errorText={errors.title?.message as string}
                  label="Title"
                />
                <Textarea
                  name="description"
                  placeholder="Enter a description"
                  block
                  register={register}
                  isError={!!errors.description}
                  errorText={errors.description?.message as string}
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
                  name="due_date"
                  register={register}
                  defaultValue={task ? task.due_date : undefined}
                  isError={!!errors.due_date}
                  errorText={errors.due_date?.message as string}
                  block
                  label="Due Date"
                />
                <div className="flex flex-col gap-1">
                  <p>Category</p>
                  <select
                    required
                    {...register("category", { value: task ? task.category : undefined })}
                    className={clsx(
                      `border-2 border-outline w-full rounded-lg px-3 focus:border-underline outline-none py-1.5`,
                      {
                        "border-red": !!errors.category,
                      },
                    )}
                  >
                    <option value="">Select task category</option>
                    <option value="backoffice">Backoffice</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                    <option value="sales">Sales</option>
                    <option value="media">Media</option>
                  </select>
                  {errors.category && <p className="text-xs text-red">{errors.category.message as string}</p>}
                </div>
                <div className="flex flex-col gap-1">
                  <p>Assignee</p>
                  <select
                    required
                    {...register("assignee", { value: task ? task.assignee : undefined })}
                    className={clsx(
                      `border-2 border-outline w-full rounded-lg px-3 focus:border-underline outline-none py-1.5`,
                      {
                        "border-red": !!errors.assignee,
                      },
                    )}
                  >
                    <option>Select Assignee</option>
                    {contacts.map((contact) => {
                      return (
                        <option value={contact.id} key={contact.email}>
                          {contact.username}
                        </option>
                      );
                    })}
                  </select>
                  {errors.assignee && <p className="text-xs text-red">{errors.assignee.message as string}</p>}
                </div>
                <span className="w-full flex justify-end">
                  <BigButton text="Ok" icon="check" loading={isSubmitting} />
                </span>
              </form>
            ) : (
              <div className="gap-4 flex flex-col relative">
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
                <p className="text-3xl font-bold">{task.title}</p>
                <p>{task.description}</p>
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
                    {task.priority.slice(1)}{" "}
                  </p>
                </span>
                <span className="flex flex-row gap-2">
                  <p className="w-1/3">Assigned to:</p>
                  <p className="w-2/2"> {getAssignee(task.assignee, contacts)}</p>
                </span>
                <span className="flex flex-row items-center gap-1 w-full justify-end">
                  <span
                    onClick={() => setEditTask(true)}
                    className="flex cursor-pointer flex-row gap-1 hover:text-underline transition-all hover:border-underline hover:stroke-underline hover:fill-underline"
                  >
                    <Icon icon="pencil" />
                    <Text text="Edit" />
                  </span>
                  <span className="h-5 border-l-2 border-grey" />
                  <span
                    onClick={() => (task.id ? deleteTask(task.id) : undefined)}
                    className="flex cursor-pointer flex-row gap-1 hover:text-underline transition-all hover:border-underline hover:stroke-underline hover:fill-underline"
                  >
                    <Icon icon="trash" />
                    <Text text="Delete" />
                  </span>
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
