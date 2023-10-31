"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Contact } from "../../../types";
import DefaultInput from "../../inputs/Default";
import Textarea from "../../inputs/Textarea";
import Prio from "../../Prio";
import { createTask } from "../../../helper/serverActions";
import SubmitButton from "../SubmitButton";

const AddTaskFormMobile = ({ contacts }: { contacts: Contact[] }) => {
  const router = useRouter();
  const [prio, setPrio] = useState<"high" | "medium" | "low" | undefined>();
  const [error, setError] = useState<boolean>(false);
  const [trigger, setTrigger] = useState<boolean>(false);
  const submitHandler = async (formData: FormData) => {
    setError(false);
    await createTask(formData, prio).then((res) => {
      if ("id" in res) {
        setTrigger(!trigger);
        setTimeout(() => {
          router.push("board");
        }, 2000);
      } else {
        setError(true);
      }
    });
  };

  return (
    <form action={submitHandler} className="flex flex-col gap-4 mb-16 lg:hidden">
      <DefaultInput
        type="text"
        name="title"
        required
        maxLength={50}
        placeholder="Enter a title"
        block
        isError={error}
        label="Title"
      />
      <Textarea
        name="description"
        placeholder="Enter a description"
        block
        required
        maxLength={100}
        isError={error}
        label="Description"
        className="h-20"
      />
      <div className="flex flex-col gap-1">
        <p>Priority</p>
        <div className="flex flex-row gap-2">
          <Prio prio="urgent" active={prio === "high"} setPrio={setPrio} />
          <Prio prio="medium" active={prio === "medium"} setPrio={setPrio} />
          <Prio prio="low" active={prio === "low"} setPrio={setPrio} />
        </div>
      </div>
      <DefaultInput type="date" required name="due_date" isError={error} block label="Due Date" />
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
      <SubmitButton text="Create Task" icon="check" className="fixed bottom-24 right-4" />
    </form>
  );
};

export default AddTaskFormMobile;
