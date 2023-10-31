"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Contact } from "../../../types";
import DefaultInput from "../../inputs/Default";
import BigButton from "../../buttons/BigButton";
import Textarea from "../../inputs/Textarea";
import Prio from "../../Prio";
import Notification from "../../Notification";
import SubmitButton from "../SubmitButton";
import { createTask } from "../../../helper/serverActions";

const AddTaskFormDesktop = ({ contacts }: { contacts: Contact[] }) => {
  const { reset } = useForm();
  const { push } = useRouter();
  const [prio, setPrio] = useState<"high" | "medium" | "low" | undefined>();
  const [error, setError] = useState<boolean>(false);
  const [trigger, setTrigger] = useState<boolean>(false);

  const submitHandler = async (formData: FormData) => {
    setError(false);
    await createTask(formData, prio).then((res) => {
      if ("id" in res) {
        setTrigger(!trigger);
        setTimeout(() => push("/board"), 2000);
      } else {
        setError(true);
      }
    });
  };

  return (
    <form action={submitHandler} className="hidden lg:flex flex-row gap-8">
      <div className="flex flex-col gap-4 max-w-screen-md w-full">
        <DefaultInput
          type="text"
          name="title"
          placeholder="Enter a title"
          block
          label="Title"
          maxLength={50}
          required
          isError={error}
        />
        <Textarea
          name="description"
          placeholder="Enter a description"
          block
          label="Description"
          maxLength={100}
          isError={error}
          className="h-20"
        />
        <div className="flex flex-col gap-1">
          <p>Assignee</p>
          <select
            name="assignee"
            required
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
      </div>
      <div className="border-r-2 border-grey h-full" />
      <div className="flex flex-col gap-4 relative max-w-screen-md w-full">
        <DefaultInput type="date" name="due_date" isError={error} required block label="Due Date" />
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
            name="category"
            required
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
        <div className="flex w-full flex-row gap-4 absolute -bottom-20 right-0 justify-between">
          <BigButton type="reset" text="Clear" outlined icon="x" onClick={reset} />
          <SubmitButton text="Create Task" icon="check" iconSize="h-8 w-8" />
        </div>
      </div>
      {trigger && <Notification text="Task added to board" trigger={trigger} />}
    </form>
  );
};

export default AddTaskFormDesktop;
