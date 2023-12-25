"use client";

import { Fragment, useContext, useState, KeyboardEvent, useRef } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { Contact, PrioType, TSubtask, Task } from "../types";
import { generalHelper, getAssignee, getBackgroundForCategory } from "../utils/generalHelper";
import { DnDContext } from "../contexts/DnD.context";
import Icon from "./Basics/Icon";
import Text from "./Basics/Text";
import DefaultInput from "./inputs/Default";
import Textarea from "./inputs/Textarea";
import Prio from "./Prio";
import { taskSchema } from "../schemas";
import { deleteTask, handleMutateSubtasks, updateTask } from "../utils/serverActions";
import Button from "./Basics/Button";
import Checkbox from "./Basics/Checkbox";

const BoardTask = ({ task, contacts, subtasks }: { task: Task; contacts: Contact[]; subtasks: TSubtask[] }) => {
  const { updateDraggedTask } = useContext(DnDContext);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({ resolver: zodResolver(taskSchema) });
  const [subTasks, setSubTasks] = useState<TSubtask[]>(subtasks.filter((item) => item.task === task.id) || []);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<boolean>(false);
  const [prio, setPrio] = useState<PrioType | undefined>(task ? task.priority : undefined);
  const subTaskInputRef = useRef<HTMLInputElement>(null);

  const getMutatedSubtasks = (original: TSubtask[], mutated: TSubtask[]) => {
    const mutatedSubtasks: Array<TSubtask> = [];
    if (original && mutated) {
      mutated.forEach((item) => {
        const originalItem = original.find((originalSubtask) => originalSubtask.id === item.id);
        if (originalItem) {
          if (!_.isEqual(originalItem, item) || item.toDelete) mutatedSubtasks.push(item);
        }
        if (!originalItem) mutatedSubtasks.push(item);
      });
    }
    return mutatedSubtasks;
  };

  const onSubmit = async (fieldValues: FieldValues) => {
    const mutatedSubtasks = getMutatedSubtasks(subtasks, subTasks);
    const response = await updateTask({ ...fieldValues, priority: prio || "low" });
    // eslint-disable-next-line no-console
    if ("message" in response) console.error(response);
    else {
      await handleMutateSubtasks(mutatedSubtasks, task.id);
      setDialogOpen(false);
      setEditTask(false);
    }
  };

  const getIconForPriority = (priority: PrioType) => {
    if (priority === "low") return <Icon iconSize="h-4 w-4" icon="low" className="fill-green stroke-green" />;
    if (priority === "medium") return <Icon iconSize="h-4 w-4" icon="medium" className="fill-orange stroke-orange" />;
    return <Icon iconSize="h-4 w-4" icon="urgent" className="fill-red stroke-red" />;
  };

  const handleTaskKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") setDialogOpen(true);
  };

  const handleDeleteTask = (id: number) => {
    setDialogOpen(false);
    deleteTask(id);
  };

  const getDoneSubtasks = (): number => {
    let count = 0;
    subTasks.forEach((item) => {
      if (item.is_done) count++;
    });
    return count;
  };

  const addSubtask = () => {
    if (subTaskInputRef.current && subTaskInputRef.current?.value.length && task.id) {
      setSubTasks([...subTasks, { label: subTaskInputRef.current.value, is_done: false, task: task.id }]);
      subTaskInputRef.current.value = "";
    }
  };

  const handleSubtaskClick = (isDone: boolean, id?: number) => {
    if (id) {
      const subtaskIndex = subTasks.findIndex((s) => s.id === id);
      setSubTasks(subTasks.map((t, index) => (index === subtaskIndex ? { ...t, is_done: isDone } : t)));
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditTask(false);
  };

  const handleDeleteSubtask = (s: TSubtask) => {
    const index = subTasks.findIndex((subtask) => subtask.label === s.label);
    const newSubtasks = [...subTasks];
    newSubtasks[index].toDelete = true;
    setSubTasks(newSubtasks);
  };

  return (
    <Fragment key={uuidv4()}>
      <div
        className="min-w-40 flex w-52 cursor-pointer flex-col justify-start gap-2 rounded-3xl bg-white p-4 outline-none focus:bg-grey dark:bg-bgDark lg:h-fit lg:w-full"
        draggable
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        onDragStart={() => updateDraggedTask(task)}
        onDragEnd={() => updateDraggedTask(null)}
        onClick={() => setDialogOpen(true)}
        onKeyDown={(e) => handleTaskKeyDown(e)}
      >
        <p
          className="w-fit rounded-lg px-4 py-1 text-white"
          style={{ backgroundColor: getBackgroundForCategory(task.category) }}
        >
          {generalHelper(task.category)}
        </p>
        <p className="text-lg font-bold dark:text-textDark">{task.title}</p>
        <p className="text-gray-500 dark:text-gray-400">{task.description}</p>
        <div className="flex w-full items-center justify-between gap-4">
          <span className="flex w-full flex-row items-center gap-2">
            <span className="block h-3 w-full rounded-md bg-gray-200 dark:bg-gray-400">
              <span
                style={{
                  width: `${
                    !Number.isNaN(getDoneSubtasks() / subTasks.length) ? (getDoneSubtasks() / subTasks.length) * 100 : 0
                  }%`,
                }}
                className="block h-3 rounded-md bg-underline transition-all"
              />
            </span>
            <p>
              {getDoneSubtasks()}/{subTasks.length}
            </p>
          </span>
          <span className="flex w-fit justify-end align-bottom">{getIconForPriority(task.priority)}</span>
        </div>
      </div>
      <dialog className="fixed left-0 top-0 h-full w-screen bg-transparent" open={dialogOpen}>
        <div className="flex h-full w-full items-center justify-center bg-transparent">
          <div className="z-10 h-fit max-h-[75%] w-fit min-w-[17rem] max-w-[25rem] overflow-y-auto overflow-x-hidden rounded-3xl bg-white p-4 shadow-2xl dark:border-4 dark:border-defaultColorDark dark:bg-bgDark dark:text-textDark lg:max-h-[80%]">
            {editTask ? (
              <div className="flex max-h-full flex-col">
                <span className="flex w-full items-center justify-end">
                  <Icon
                    icon="x"
                    className="outline-none hover:fill-underline hover:stroke-underline focus:fill-underline focus:stroke-underline dark:fill-textDark dark:stroke-textDark"
                    onClick={handleCloseDialog}
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
                        `w-full rounded-lg border-2 border-outline px-3 py-1.5 outline-none focus:border-underline dark:bg-bgDark`,
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
                        `w-full rounded-lg border-2 border-outline px-3 py-1.5 outline-none focus:border-underline dark:bg-bgDark`,
                        {
                          "border-red": !!errors.assignee,
                        },
                      )}
                    >
                      <option>Select Assignee</option>
                      {contacts.map((contact) => {
                        if (contact.id === task.assignee)
                          return (
                            <option value={contact.id} selected key={uuidv4()}>
                              {contact.username}
                            </option>
                          );

                        return (
                          <option value={contact.id} key={uuidv4()}>
                            {contact.username}
                          </option>
                        );
                      })}
                    </select>
                    {errors.assignee && <p className="text-xs text-red">{errors.assignee.message as string}</p>}
                  </div>
                  <div className="flex flex-col gap-1">
                    <p>Status</p>
                    <select
                      required
                      {...register("status", { value: task ? task.status : undefined })}
                      className="w-full rounded-lg border-2 border-outline px-3 py-1.5  outline-none focus:border-underline dark:bg-bgDark"
                    >
                      <option value="">Select task category</option>
                      <option value="inProgress">in Progress</option>
                      <option value="toDo">To do</option>
                      <option value="awaitingFeedback">awaiting Feedback</option>
                      <option value="done">Done</option>
                    </select>
                  </div>
                  <div className="flex w-full flex-col justify-start gap-1">
                    <label>
                      Subtasks
                      <div className="flex flex-row flex-nowrap items-center rounded-lg border-2 border-grey bg-white px-2 py-1.5 focus-within:border-underline dark:bg-bgDark">
                        <input
                          ref={subTaskInputRef}
                          name="subtaskInput"
                          id="subtaskInput"
                          type="text"
                          placeholder="Add new Subtask"
                          className="w-full bg-transparent placeholder-grey outline-0"
                        />
                        <Icon
                          icon="plus"
                          className="h-5 w-5 stroke-1 outline-none hover:fill-underline hover:stroke-underline focus:fill-underline focus:stroke-underline"
                          onClick={addSubtask}
                        />
                      </div>
                    </label>
                  </div>
                  {subTasks.map((subtask) => {
                    if (subtask.toDelete) return null;
                    return (
                      <span key={uuidv4()} className="flex flex-row gap-2">
                        <Checkbox
                          name={subtask.label}
                          text={subtask.label}
                          value={subtask.is_done}
                          onChange={(value) => handleSubtaskClick(value, subtask.id)}
                        />
                        <Icon
                          icon="x"
                          onClick={() => handleDeleteSubtask(subtask)}
                          className="outline-none hover:fill-underline hover:stroke-underline focus:fill-underline focus:stroke-underline"
                        />
                      </span>
                    );
                  })}
                  <span className="flex w-full justify-end">
                    <Button icon="check" loading={isSubmitting}>
                      Ok
                    </Button>
                  </span>
                </form>
              </div>
            ) : (
              <div className="relative flex flex-col gap-4">
                <span className="flex w-full items-center justify-between">
                  <p
                    className="w-fit rounded-lg px-4 py-1 text-white"
                    style={{ backgroundColor: getBackgroundForCategory(task.category) }}
                  >
                    {generalHelper(task.category)}
                  </p>
                  <Icon
                    icon="x"
                    className="dark:stfill-textDark flex cursor-pointer flex-row  gap-1 outline-none transition-all hover:fill-underline hover:stroke-underline hover:text-underline focus:fill-underline focus:stroke-underline focus:text-underline dark:fill-textDark dark:text-textDark"
                    onClick={handleCloseDialog}
                  />
                </span>
                <div className="flex flex-col gap-2">
                  <p className="text-3xl font-bold">{task.title}</p>
                  <p className="text-black dark:text-gray-400">{task.description}</p>
                  <span className="flex">
                    <p className="w-5/12 text-gray-400">Due Date:</p>
                    <p className="w-7/12">
                      {new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" }).format(
                        new Date(task.due_date),
                      )}
                    </p>
                  </span>
                  <span className="flex">
                    <p className="w-5/12 text-gray-400">Priority:</p>
                    <span className="flex w-7/12 items-center gap-2">
                      <p>
                        {task.priority.charAt(0).toUpperCase()}
                        {task.priority.slice(1)}
                      </p>
                      <p>{getIconForPriority(task.priority)}</p>
                    </span>
                  </span>
                  <span className="flex">
                    <p className="w-5/12 text-gray-400">Assigned to:</p>
                    <p className="w-7/12">{getAssignee(task.assignee, contacts)}</p>
                  </span>
                </div>
                <span className="flex w-full flex-row items-center justify-end gap-1">
                  <button
                    type="button"
                    onClick={() => setEditTask(true)}
                    className="dark:stfill-textDark flex cursor-pointer flex-row  gap-1 outline-none transition-all hover:fill-underline hover:stroke-underline hover:text-underline focus:fill-underline focus:stroke-underline focus:text-underline dark:fill-textDark dark:text-textDark"
                  >
                    <Icon icon="pencil" />
                    <Text text="Edit" />
                  </button>
                  <span className="h-5 border-l-2 border-grey" />
                  <button
                    type="button"
                    onClick={() => (task.id ? handleDeleteTask(task.id) : undefined)}
                    className="dark:stfill-textDark flex cursor-pointer flex-row  gap-1 outline-none transition-all hover:fill-underline hover:stroke-underline hover:text-underline focus:fill-underline focus:stroke-underline focus:text-underline dark:fill-textDark dark:text-textDark"
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
