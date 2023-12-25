"use client";

import { useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import clsx from "clsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { Contact, PrioType, TSubtask } from "../../../types";
import DefaultInput from "../../inputs/Default";
import Button from "../../Basics/Button";
import Textarea from "../../inputs/Textarea";
import Prio from "../../Prio";
import { taskSchema } from "../../../schemas";
import { createSubtask, createTask } from "../../../utils/serverActions";
import Icon from "../../Basics/Icon";
import Checkbox from "../../Basics/Checkbox";

const AddTaskFormDesktop = ({ contacts }: { contacts: Contact[] }) => {
  const { push } = useRouter();
  const {
    reset,
    formState: { isSubmitting, errors, isValid },
    register,
    handleSubmit,
  } = useForm({ resolver: zodResolver(taskSchema) });
  const [subTasks, setSubTasks] = useState<TSubtask[]>([]);
  const [prio, setPrio] = useState<PrioType | undefined>();
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="hidden flex-row gap-8 lg:flex">
      <div className="flex w-full max-w-screen-md flex-col gap-4">
        {serverError && <p className="text-red">{serverError}</p>}
        <DefaultInput
          type="text"
          name="title"
          register={register}
          placeholder="Enter a title"
          block
          label="Title"
          isError={!!errors.title}
          errorText={errors.title?.message as string}
        />
        <Textarea
          name="description"
          placeholder="Enter a description"
          block
          register={register}
          label="Description"
          isError={!!errors.description}
          errorText={errors.description?.message as string}
          className="h-20"
        />
        <div className="flex flex-col gap-1">
          <p>Assignee</p>
          <select
            {...register("assignee")}
            className={clsx(
              `w-full rounded-lg border-2 border-outline px-3 py-1.5 outline-none focus:border-underline dark:bg-bgDark`,
              {
                "border-red": !!errors.assignee,
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
      </div>
      <div className="h-full border-r-2 border-grey" />
      <div className="relative flex w-full max-w-screen-md flex-col gap-4">
        <DefaultInput
          type="date"
          name="due_date"
          register={register}
          isError={!!errors.due_date}
          errorText={errors.due_date?.message as string}
          block
          label="Due Date"
        />
        <div className="flex flex-col gap-1">
          <p>Priority</p>
          <div className="flex flex-row gap-2">
            <Prio prio="urgent" active={prio === "high"} setPrio={setPrio} />
            <Prio prio="medium" active={prio === "medium"} setPrio={setPrio} />
            <Prio prio="low" active={prio === "low"} setPrio={setPrio} />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p>Category</p>
          <select
            {...register("category")}
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
        <div className="absolute -bottom-20 right-0 flex w-full flex-row justify-between gap-4">
          <Button type="reset" outlined icon="x" onClick={reset}>
            Clear
          </Button>
          <Button icon="check" loading={isSubmitting} disabled={!isValid}>
            Create
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddTaskFormDesktop;
