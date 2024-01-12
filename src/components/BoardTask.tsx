"use client";

import { Fragment, useState, KeyboardEvent, useRef, useEffect } from "react";
import { FieldValues } from "react-hook-form";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { useDrag } from "react-dnd";
import { TContact, TPriority, TSubtask, TTask } from "../types";
import { firstCharToUpperCase, getAssignee, getBackgroundForCategory } from "../utils/generalHelper";
import Icon from "./Basics/Icon";
import Text from "./Basics/Text";
import DefaultInput from "./inputs/Default";
import Textarea from "./inputs/Textarea";
import Prio from "./Prio";
import { taskSchema } from "../schemas";
import { deleteTask, handleMutateSubtasks, updateTask } from "../utils/serverActions";
import Button from "./Basics/Button";
import Checkbox from "./Basics/Checkbox";
import Form from "./Basics/Form";
import Select from "./Basics/Select";

const BoardTask = ({ task, contacts, subtasks }: { task: TTask; contacts: TContact[]; subtasks?: TSubtask[] }) => {
  const { refresh } = useRouter();
  const [subTasks, setSubTasks] = useState<TSubtask[]>(subtasks?.filter((item) => item.task === task.id) || []);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<boolean>(false);
  const [prio, setPrio] = useState<TPriority | undefined>(task ? task.priority : undefined);
  const subTaskInputRef = useRef<HTMLInputElement>(null);
  const [{}, dragRef] = useDrag({
    type: "boardTask",
    item: task,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const getMutatedSubtasks = (original?: TSubtask[], mutated?: TSubtask[]) => {
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
    const response = await updateTask({ ...(fieldValues as TTask), priority: prio || "low", id: task.id });
    // eslint-disable-next-line no-console
    if ("message" in response) console.error(response);
    else {
      await handleMutateSubtasks(mutatedSubtasks, task.id);
      setDialogOpen(false);
      setEditTask(false);
    }
  };

  const getIconForPriority = (priority: TPriority) => {
    if (priority === "low") return <Icon iconSize="h-4 w-4" icon="low" className="fill-green stroke-green" />;
    if (priority === "medium") return <Icon iconSize="h-4 w-4" icon="medium" className="fill-orange stroke-orange" />;
    return <Icon iconSize="h-4 w-4" icon="urgent" className="fill-red stroke-red" />;
  };

  const handleTaskKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") setDialogOpen(true);
  };

  const handleDeleteTask = (id: number) => {
    setDialogOpen(false);
    deleteTask(id).then(() => refresh());
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

  useEffect(() => {
    document.addEventListener("click", (event) => {
      if ((event.target as HTMLElement)?.classList.contains("Dialog")) {
        setDialogOpen(false);
        setEditTask(false);
      }
    });
    return document.removeEventListener("click", (event) => {
      if ((event.target as HTMLElement)?.classList.contains("Dialog")) {
        setDialogOpen(false);
        setEditTask(false);
      }
    });
  }, []);

  return (
    <Fragment key={uuidv4()}>
      <div
        className="min-w-40 flex w-52 cursor-pointer flex-col justify-start gap-2 rounded-3xl bg-white p-4 outline-none transition-all focus-visible:bg-grey dark:bg-bgDark dark:focus-visible:bg-primary lg:h-fit lg:w-full"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        ref={dragRef}
        draggable
        onClick={() => setDialogOpen(true)}
        onKeyDown={(e) => handleTaskKeyDown(e)}
      >
        <p
          className="w-fit rounded-lg px-4 py-1 text-white"
          style={{ backgroundColor: getBackgroundForCategory(task.category) }}
        >
          {firstCharToUpperCase(task.category)}
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
            {subTasks.length ? (
              <p className="dark:text-textDark">
                {getDoneSubtasks()}/{subTasks.length}
              </p>
            ) : null}
          </span>
          <span className="flex w-fit justify-end align-bottom">{getIconForPriority(task.priority)}</span>
        </div>
      </div>
      <dialog className="fixed left-0 top-0 h-full w-full bg-transparent" open={dialogOpen}>
        <div className="Dialog z-10 flex h-full w-full items-center justify-center bg-transparent">
          <div className="scrollbar z-20 h-fit max-h-[85%] w-full min-w-[17rem] overflow-y-auto overflow-x-hidden rounded-3xl bg-white p-4 shadow-2xl outline-none dark:border-2 dark:border-textDark dark:bg-bgDark dark:text-textDark sm:w-[30rem] sm:p-8 lg:max-h-[80%]">
            {editTask ? (
              <div className="flex max-h-full flex-col">
                <span className="flex w-full items-center justify-end">
                  <Icon className="outline-offset-2" icon="x" onClick={handleCloseDialog} />
                </span>
                <Form onSubmit={onSubmit} schema={taskSchema} className="flex flex-col gap-4">
                  <DefaultInput
                    type="text"
                    name="title"
                    placeholder="Enter a title"
                    block
                    defaultValue={task ? task.title : undefined}
                    label="Title"
                  />
                  <Textarea
                    name="description"
                    placeholder="Enter a description"
                    block
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
                    defaultValue={task ? task.due_date : undefined}
                    block
                    label="Due Date"
                  />
                  <Select
                    name="category"
                    defaultValue={task?.category}
                    label="Category"
                    options={[
                      ["", "Select task category"],
                      ["backoffice", "Backoffice"],
                      ["design", "Design"],
                      ["marketing", "Marketing"],
                      ["sales", "Sales"],
                      ["media", "Media"],
                    ]}
                  />
                  <Select
                    name="assignee"
                    defaultValue={task?.assignee.toString()}
                    label="Assignee"
                    options={[
                      ["", "Select Assignee"] as [key: string, value: string],
                      ...contacts.map(
                        (contact) => [contact.id.toString(), contact.username] as [key: string, value: string],
                      ),
                    ]}
                  />
                  <Select
                    name="status"
                    defaultValue={task?.status.toString()}
                    label="Status"
                    options={[
                      ["", "Select task category"],
                      ["inProgress", "in Progress"],
                      ["toDo", "To do"],
                      ["awaitingFeedback", "awaiting Feedback"],
                      ["done", "Done"],
                    ]}
                  />
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
                          className="w-full bg-transparent placeholder-grey outline-none outline-0"
                        />
                        <Icon icon="plus" className="h-5 w-5 outline-none" onClick={addSubtask} />
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
                    <Button icon="check">Ok</Button>
                  </span>
                </Form>
              </div>
            ) : (
              <div className="relative flex cursor-default flex-col gap-4">
                <span className="flex w-full items-center justify-between">
                  <p
                    className="w-fit rounded-lg px-4 py-1 text-white"
                    style={{ backgroundColor: getBackgroundForCategory(task.category) }}
                  >
                    {firstCharToUpperCase(task.category)}
                  </p>
                  <Icon icon="x" iconSize="h-8 w-8" className="outline-offset-2" onClick={handleCloseDialog} />
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
                <span className="flex w-full flex-row items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditTask(true)}
                    className="group flex gap-1 rounded px-2 py-1 outline-none transition-all focus-visible:outline-underline"
                  >
                    <Icon icon="pencil" className="group-hover:fill-underline" />
                    <Text text="Edit" className="group-hover:text-underline" />
                  </button>
                  <span className="h-5 border-l-2 border-grey" />
                  <button
                    type="button"
                    onClick={() => (task.id ? handleDeleteTask(task.id) : undefined)}
                    className="group flex gap-1 rounded px-2 py-1 outline-none transition-all focus-visible:outline-underline"
                  >
                    <Icon icon="trash" className="group-hover:fill-underline" />
                    <Text text="Delete" className="group-hover:text-underline" />
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
