"use client";

import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Task, Contact } from "../../types";
import { createTask } from "../../helper/fetchApi";
import Icon from "../Icon";
import DefaultInput from "../inputs/Default";
import BigButton from "../buttons/BigButton";

const AddTasksForm = ({ contacts }: { contacts: Contact[] }) => {
  const { register, handleSubmit } = useForm<FieldValues>();
  const router = useRouter();
  const [prio, setPrio] = useState<"high" | "medium" | "low">("low");

  const submitHandler = (data: FieldValues) => {
    createTask({ ...(data as Task), ...{ priority: prio } }).then(() => {
      router.push("board");
    });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-4 overflow-y-auto max-h-[27rem]">
      <DefaultInput
        type="text"
        name="title"
        register={register}
        placeholder="Enter a title"
        block
        label="Title"
        required
      />
      <DefaultInput
        type="textarea"
        name="description"
        register={register}
        placeholder="Enter a description"
        block
        maxLength={100}
        label="Description"
        required
        className="h-20"
      />
      {/* Todo: add Prio */}
      <DefaultInput type="date" name="due_date" register={register} required block label="Due Date" />
      <div className="flex flex-col gap-2">
        <p>Category</p>
        <select
          {...register("category")}
          className="border-2 border-outline h-8 w-full rounded-lg px-3 focus:border-underline outline-none py-0.5"
        >
          <option value="">Select task category</option>
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
          {...register("assignee")}
          className="border-2 border-outline h-8 w-full rounded-lg px-3 focus:border-underline outline-none py-0.5"
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
      <div className="flex flex-col gap-2">
        <p>Status</p>
        <select
          {...register("status")}
          className="border-2 border-outline h-8 w-full rounded-lg px-3 focus:border-underline outline-none py-0.5"
        >
          <option value="inProgress">In Progress</option>
          <option value="toDo">To do</option>
          <option value="awaitingFeedback">Awaiting feedback</option>
          <option value="done">Done</option>
        </select>
      </div>
      <BigButton text="Create Task" icon="check" className="fixed bottom-24 right-4" />
    </form>
  );
};

export default AddTasksForm;
