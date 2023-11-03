"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Contact, PrioType, Task } from "../../../types";
import DefaultInput from "../../inputs/Default";
import Textarea from "../../inputs/Textarea";
import Prio from "../../Prio";
import SubmitButton from "../SubmitButton";
import { ErrorResponse } from "../../../helper/fetchApi";
import { addTaskSchema } from "../../../schemas";

const AddTaskFormMobile = ({
  contacts,
  action,
  task,
  text,
  icon,
  className,
}: {
  contacts: Contact[];
  action: (body: unknown) => Promise<Task | ErrorResponse>;
  text: string;
  icon: string;
  task?: Task;
  className?: string;
}) => {
  const { push } = useRouter();
  const [prio, setPrio] = useState<PrioType | undefined>(task ? task.priority : undefined);
  const [error, setError] = useState<boolean>(false);
  const [trigger, setTrigger] = useState<boolean>(false);
  const submitHandler = async (formData: FormData) => {
    setError(false);
    try {
      const body = addTaskSchema.parse({
        title: formData.get("title"),
        description: formData.get("description"),
        assignee: formData.get("assignee"),
        due_date: formData.get("due_date"),
        category: formData.get("category"),
        priority: prio || "low",
      });
      await action(body).then((res) => {
        if ("id" in res) {
          setTrigger(!trigger);
          setTimeout(() => {
            push("board");
          }, 2000);
        } else {
          setError(true);
        }
      });
    } catch (e) {
      console.error("Error while creating the Task");
      setError(true);
    }
  };

  return (
    <form action={submitHandler} className={`flex flex-col gap-4 mb-16 ${className}`}>
      <DefaultInput
        type="text"
        name="title"
        required
        maxLength={50}
        placeholder="Enter a title"
        block
        defaultValue={task ? task.title : undefined}
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
        required
        name="due_date"
        defaultValue={task ? task.due_date : undefined}
        isError={error}
        block
        label="Due Date"
      />
      <div className="flex flex-col gap-1">
        <p>Category</p>
        <select
          name="category"
          required
          defaultValue={task ? task.category : undefined}
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
          defaultValue={task ? task.assignee : undefined}
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
      <SubmitButton text={text} icon={icon} className="fixed bottom-24 right-4" />
    </form>
  );
};

export default AddTaskFormMobile;
