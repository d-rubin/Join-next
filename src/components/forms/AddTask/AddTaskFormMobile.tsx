"use client";

import { useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { Contact, PrioType, Task, TSubtask } from "../../../types";
import DefaultInput from "../../inputs/Default";
import Textarea from "../../inputs/Textarea";
import Prio from "../../Prio";
import { taskSchema } from "../../../schemas";
import { createSubtask, createTask } from "../../../utils/serverActions";
import Button from "../../Basics/Button";
import Checkbox from "../../Basics/Checkbox";
import Icon from "../../Basics/Icon";

const AddTaskFormMobile = ({ contacts, task }: { contacts: Contact[]; task?: Task }) => {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({ resolver: zodResolver(taskSchema) });
  const [prio, setPrio] = useState<PrioType | undefined>(task ? task.priority : undefined);
  const [subTasks, setSubTasks] = useState<TSubtask[]>([]);
  const [serverError, setServerError] = useState<string>();
  const subTaskInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (fieldValues: FieldValues) => {
    const response = await createTask({ ...fieldValues, ...{ priority: prio || "low" } });
    if ("message" in response) setServerError(response.message);
    else if (subTasks.length) {
      await Promise.all(
        subTasks.map(async (subtask) => {
          await createSubtask({ ...subtask, task: response.id });
        }),
      );
    }
    push("/board");
  };

  const addSubtask = () => {
    if (subTaskInputRef.current && subTaskInputRef.current?.value.length) {
      setSubTasks([...subTasks, { label: subTaskInputRef.current.value, is_done: false }]);
      subTaskInputRef.current.value = "";
    }
  };

  const handleSubtaskClick = (label: string, isDone: boolean) => {
    const subtaskIndex = subTasks.findIndex((subtask) => subtask.label === label);
    setSubTasks(subTasks.map((subtask, index) => (index === subtaskIndex ? { ...subtask, is_done: isDone } : subtask)));
  };

  // const handleDeleteSubtask = (s: TSubtask) => {
  //   const index = subTasks.findIndex((subtask) => subtask.label === s.label);
  //   const newSubtasks = subTasks;
  //   newSubtasks.splice(index, 1);
  //   setSubTasks(newSubtasks);
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 pb-48 lg:hidden">
      {serverError && <p className="text-red">{serverError}</p>}
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
          {...register("category", { value: task ? task.category : undefined })}
          className={clsx(
            `w-full rounded-lg border-2 border-outline bg-white px-1.5 py-1.5 outline-none focus:border-underline dark:bg-bgDark`,
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
          {...register("assignee", { value: task ? task.assignee : undefined })}
          className={clsx(
            `w-full rounded-lg border-2 border-outline bg-white px-1.5 py-1.5 outline-none focus:border-underline dark:bg-bgDark`,
            {
              "border-red": !!errors.assigeee,
            },
          )}
        >
          <option value="">Select Assignee</option>
          {contacts.map((contact) => {
            return (
              <option value={contact.id} key={uuidv4()}>
                {contact.username}
              </option>
            );
          })}
        </select>
        {errors.assignee && <p className="text-xs text-red">{errors.assignee.message as string}</p>}
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
              className="w-full bg-transparent outline-0"
            />
            <Icon
              icon="plus"
              className="h-5 w-5 stroke-1 outline-none hover:fill-underline hover:stroke-underline focus:fill-underline focus:stroke-underline"
              onClick={addSubtask}
            />
          </div>
        </label>
      </div>
      {subTasks.map((subtask) => (
        <span key={uuidv4()} className="flex flex-row gap-2">
          <Checkbox
            name={subtask.label}
            text={subtask.label}
            value={subtask.is_done}
            onChange={(value) => handleSubtaskClick(subtask.label, value)}
          />
        </span>
      ))}
      <Button icon="check" loading={isSubmitting} className="fixed bottom-24 right-8">
        Create
      </Button>
    </form>
  );
};

export default AddTaskFormMobile;
