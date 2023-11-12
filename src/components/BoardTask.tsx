"use client";

import { Fragment, useContext, useState, KeyboardEvent } from "react";
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

  const getIconForPriority = (priority: PrioType) => {
    if (priority === "low") return <Icon iconSize="h-4 w-4" icon="low" className="stroke-green fill-green" />;
    if (priority === "medium") return <Icon iconSize="h-4 w-4" icon="medium" className="stroke-orange fill-orange" />;
    return <Icon iconSize="h-4 w-4" icon="urgent" className="stroke-red fill-red" />;
  };

  const handleTaskKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") setDialogOpen(true);
  };

  const handleDeleteTask = (id: number) => {
    setDialogOpen(false);
    deleteTask(id);
  };

  return (
    <Fragment key={task.id}>
      <div
        className="focus:bg-grey outline-none p-4 min-w-40 w-52 bg-white rounded-3xl flex flex-col justify-start gap-2 lg:h-fit lg:w-full cursor-pointer"
        draggable
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        onDragStart={() => updateDraggedTask(task)}
        onDragEnd={() => updateDraggedTask(null)}
        onClick={() => setDialogOpen(true)}
        onKeyDown={(e) => handleTaskKeyDown(e)}
      >
        <p
          className="text-white px-4 py-1 w-fit rounded-lg"
          style={{ backgroundColor: getBackgroundForCategory(task.category) }}
        >
          {generalHelper(task.category)}
        </p>
        <p className="text-lg font-bold">{task.title}</p>
        <p className="text-gray-500">{task.description}</p>
        <span className="w-full flex align-bottom justify-end">{getIconForPriority(task.priority)}</span>
      </div>
      <dialog className="fixed top-0 left-0 w-screen h-full bg-transparent" open={dialogOpen}>
        <div className="flex items-center justify-center w-full h-full bg-transparent">
          <div className="z-10 w-fit h-fit bg-white rounded-3xl p-4 min-w-[17rem] max-w-[25rem] shadow-2xl">
            {editTask ? (
              <div className="flex flex-col max-h-full">
                <span className="w-full flex justify-end items-center">
                  <Icon
                    icon="arrowLeft"
                    className="hover:stroke-underline hover:fill-underline outline-none focus:stroke-underline focus:fill-underline"
                    focusable
                    onClick={() => setEditTask(false)}
                  />
                </span>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                  <input type="number" {...register("id", { value: task.id })} hidden />
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
                      {...register("assignee")}
                      className={clsx(
                        `border-2 border-outline w-full rounded-lg px-3 focus:border-underline outline-none py-1.5`,
                        {
                          "border-red": !!errors.assignee,
                        },
                      )}
                    >
                      <option>Select Assignee</option>
                      {contacts.map((contact) => {
                        if (contact.id === task.assignee)
                          return (
                            <option value={contact.id} selected key={contact.email}>
                              {contact.username}
                            </option>
                          );

                        return (
                          <option value={contact.id} key={contact.email}>
                            {contact.username}
                          </option>
                        );
                      })}
                    </select>
                    {errors.assignee && <p className="text-xs text-red">{errors.assignee.message as string}</p>}
                  </div>
                  <div className="flex flex-col gap-1">
                    <p>Status:</p>
                    <select
                      required
                      {...register("status", { value: task ? task.status : undefined })}
                      className="border-2 border-outline w-full rounded-lg px-3 focus:border-underline outline-none py-1.5"
                    >
                      <option value="">Select task category</option>
                      <option value="inProgress">in Progress</option>
                      <option value="toDo">To do</option>
                      <option value="awaitingFeedback">awaiting Feedback</option>
                      <option value="done">Done</option>
                    </select>
                  </div>
                  <span className="w-full flex justify-end">
                    <BigButton text="Ok" icon="check" loading={isSubmitting} />
                  </span>
                </form>
              </div>
            ) : (
              <div className="gap-4 flex flex-col relative">
                <span className="flex w-full justify-between items-center">
                  <p
                    className="text-white px-4 py-1 w-fit rounded-lg"
                    style={{ backgroundColor: getBackgroundForCategory(task.category) }}
                  >
                    {generalHelper(task.category)}
                  </p>
                  <Icon
                    icon="x"
                    className="outline-none border-none hover:stroke-underline hover:fill-underline focus:stroke-underline focus:fill-underline"
                    onClick={() => setDialogOpen(false)}
                    focusable
                  />
                </span>
                <div className="flex flex-col gap-2">
                  <p className="text-3xl font-bold">{task.title}</p>
                  <p className="text-black">{task.description}</p>
                  <span className="flex">
                    <p className="w-5/12 text-gray-600">Due Date:</p>
                    <p className="w-7/12">
                      {new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" }).format(
                        new Date(task.due_date),
                      )}
                    </p>
                  </span>
                  <span className="flex">
                    <p className="w-5/12 text-gray-600">Priority:</p>
                    <span className="w-7/12 flex gap-2 items-center">
                      <p>
                        {task.priority.charAt(0).toUpperCase()}
                        {task.priority.slice(1)}
                      </p>
                      <p>{getIconForPriority(task.priority)}</p>
                    </span>
                  </span>
                  <span className="flex">
                    <p className="w-5/12 text-gray-600">Assigned to:</p>
                    <p className="w-7/12">{getAssignee(task.assignee, contacts)}</p>
                  </span>
                </div>
                <span className="flex flex-row items-center gap-1 w-full justify-end">
                  <button
                    type="button"
                    onClick={() => setEditTask(true)}
                    className="flex cursor-pointer flex-row gap-1  outline-none transition-all hover:text-underline hover:stroke-underline hover:fill-underline focus:text-underline focus:stroke-underline focus:fill-underline"
                  >
                    <Icon icon="pencil" />
                    <Text text="Edit" />
                  </button>
                  <span className="h-5 border-l-2 border-grey" />
                  <button
                    type="button"
                    onClick={() => (task.id ? handleDeleteTask(task.id) : undefined)}
                    className="flex cursor-pointer flex-row gap-1  outline-none transition-all hover:text-underline hover:stroke-underline hover:fill-underline focus:text-underline focus:stroke-underline focus:fill-underline"
                  >
                    <Icon icon="trash" />
                    <Text text="Delete" />
                  </button>
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
