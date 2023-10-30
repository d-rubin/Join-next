"use client";

import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Task, Contact } from "../../../types";
import { createTask } from "../../../helper/fetchApi";
import DefaultInput from "../../inputs/Default";
import BigButton from "../../buttons/BigButton";
import Textarea from "../../inputs/Textarea";
import Prio from "../../Prio";
import Notification from "../../Notification";

const AddTaskFormDesktop = ({ contacts }: { contacts: Contact[] }) => {
  const { register, handleSubmit, reset } = useForm<FieldValues>();
  const router = useRouter();
  const [prio, setPrio] = useState<"high" | "medium" | "low" | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [trigger, setTrigger] = useState<boolean>(false);

  const submitHandler = async (data: FieldValues) => {
    setLoading(true);
    setError(false);
    await createTask({ ...(data as Task), ...{ priority: prio || "low" } }).then((res) => {
      if ("id" in res) {
        setTrigger(!trigger);
        setTimeout(() => {
          router.push("board");
        }, 2000);
      } else {
        setError(true);
      }
    });
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="hidden lg:flex flex-row gap-8">
      <div className="flex flex-col gap-4 min-w-[20rem]">
        <DefaultInput type="text" name="title" placeholder="Enter a title" block label="Title" isError={error} />
        <Textarea
          name="description"
          placeholder="Enter a description"
          block
          label="Description"
          isError={error}
          className="h-20"
        />
        <div className="flex flex-col gap-1">
          <p>Assignee</p>
          <select
            {...register("assignee", { required: true })}
            className={`border-2 border-outline h-8 w-full rounded-lg px-3 focus:border-underline outline-none py-0.5 ${
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
      </div>
      <div className="border-r-2 border-grey h-full" />
      <div className="flex flex-col gap-4 relative min-w-[20rem]">
        <DefaultInput type="date" name="due_date" isError={error} block label="Due Date" />
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
            {...register("category", { required: true })}
            className={`border-2 border-outline h-8 w-full rounded-lg px-3 focus:border-underline outline-none py-0.5 ${
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
        <div className="flex flex-row gap-4 absolute -bottom-20 right-0 justify-end">
          <BigButton type="reset" text="Clear" outlined icon="x" onClick={reset} />
          <BigButton text="Create Task" icon="check" iconSize="h-8 w-8" loading={loading} />
        </div>
      </div>
      {trigger && <Notification text="Task added to board" trigger={trigger} />}
    </form>
  );
};

export default AddTaskFormDesktop;
