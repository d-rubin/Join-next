"use client";

import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { Contact, PrioType, Task } from "../../../types";
import DefaultInput from "../../inputs/Default";
import Textarea from "../../inputs/Textarea";
import Prio from "../../Prio";
import { taskSchema } from "../../../schemas";
import { createTask } from "../../../helper/serverActions";
import BigButton from "../../buttons/BigButton";

const AddTaskFormMobile = ({ contacts, task }: { contacts: Contact[]; task?: Task }) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({ resolver: zodResolver(taskSchema) });
  const [prio, setPrio] = useState<PrioType | undefined>(task ? task.priority : undefined);
  const [serverError, setServerError] = useState<string>();

  const onSubmit = async (fieldValues: FieldValues) => {
    const response = await createTask({ ...fieldValues, ...{ priority: prio || "low" } });
    if (response) setServerError(response.message);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mb-16 lg:hidden">
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
          className={clsx(`border-2 border-outline w-full rounded-lg px-3 focus:border-underline outline-none py-1.5`, {
            "border-red": !!errors.category,
          })}
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
          className={clsx(`border-2 border-outline w-full rounded-lg px-3 focus:border-underline outline-none py-1.5`, {
            "border-red": !!errors.assigeee,
          })}
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
        {errors.assignee && <p className="text-xs text-red">{errors.assignee.message as string}</p>}
      </div>
      <BigButton text="Create" icon="check" loading={isSubmitting} className="fixed bottom-24 right-4" />
    </form>
  );
};

export default AddTaskFormMobile;
