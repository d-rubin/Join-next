"use client";

import { useRef, useState } from "react";
import { FieldValues } from "react-hook-form";
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
import Form from "../../Basics/Form";
import Select from "../../Basics/Select";

const AddTaskFormMobile = ({ contacts, task }: { contacts: Contact[]; task?: Task }) => {
  const { push } = useRouter();
  const [prio, setPrio] = useState<PrioType | undefined>(task ? task.priority : undefined);
  const [subTasks, setSubTasks] = useState<TSubtask[]>([]);
  const [serverError, setServerError] = useState<string>();
  const subTaskInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (fieldValues: FieldValues) => {
    console.log(fieldValues);
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
    <Form onSubmit={onSubmit} schema={taskSchema} className="flex flex-col gap-4 pb-48 lg:hidden">
      {serverError && <p className="text-red">{serverError}</p>}
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
          ...contacts.map((contact) => [contact.id.toString(), contact.username] as [key: string, value: string]),
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
      <Button icon="check" className="fixed bottom-24 right-4">
        Create
      </Button>
    </Form>
  );
};

export default AddTaskFormMobile;
