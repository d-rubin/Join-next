"use client";

import { useRef, useState } from "react";
import { FieldValues } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useRouter, useSearchParams } from "next/navigation";
import { TContact, TPriority, TSubtask } from "../../../types";
import DefaultInput from "../../inputs/Default";
import Button from "../../Basics/Button";
import Textarea from "../../inputs/Textarea";
import Prio from "../../Prio";
import { taskSchema } from "../../../schemas";
import { createSubtask, createTask } from "../../../utils/serverActions";
import Icon from "../../Basics/Icon";
import Checkbox from "../../Basics/Checkbox";
import Form from "../../Basics/Form";
import Select from "../../Basics/Select";
import FormButton from "../FormButton";

const AddTaskFormDesktop = ({ contacts }: { contacts: TContact[] }) => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const [subTasks, setSubTasks] = useState<TSubtask[]>([]);
  const [prio, setPrio] = useState<TPriority | undefined>();
  const [serverError, setServerError] = useState<string>();
  const subTaskInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (fieldValues: FieldValues) => {
    const response = await createTask({
      ...fieldValues,
      ...{ priority: prio || "low", status: searchParams.get("status") || "toDo" },
    });
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
    <Form onSubmit={onSubmit} schema={taskSchema} className="hidden flex-row gap-8 lg:flex">
      <div className="flex w-full max-w-screen-md flex-col gap-4">
        {serverError && <p className="text-red">{serverError}</p>}
        <DefaultInput type="text" name="title" placeholder="Enter a title" block label="Title" />
        <Textarea name="description" placeholder="Enter a description" block label="Description" className="h-20" />
        <Select
          label="Assignee"
          name="assignee"
          options={[
            ["", "Select Assignee"] as [key: string, value: string],
            ...contacts.map((contact) => [contact.id.toString(), contact.username] as [key: string, value: string]),
          ]}
        />
      </div>
      <div className="h-full border-r-2 border-grey" />
      <div className="relative flex w-full max-w-screen-md flex-col gap-4">
        <DefaultInput type="date" name="due_date" block label="Due Date" />
        <div className="flex flex-col gap-1">
          <p>Priority</p>
          <div className="flex flex-row gap-2">
            <Prio prio="urgent" active={prio === "high"} setPrio={setPrio} />
            <Prio prio="medium" active={prio === "medium"} setPrio={setPrio} />
            <Prio prio="low" active={prio === "low"} setPrio={setPrio} />
          </div>
        </div>
        <Select
          label="Category"
          name="category"
          options={[
            ["", "Select task category"],
            ["backoffice", "Backoffice"],
            ["design", "Design"],
            ["marketing", "Marketing"],
            ["sales", "Sales"],
            ["media", "Media"],
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
                className="w-full bg-transparent outline-none"
              />
              <Icon icon="plus" className="h-5 w-5 outline-none" onClick={addSubtask} />
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
          <FormButton type="reset" outlined icon="x" className="">
            Clear
          </FormButton>
          <Button icon="check">Create</Button>
        </div>
      </div>
    </Form>
  );
};

export default AddTaskFormDesktop;
