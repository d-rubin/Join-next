"use client";

import Image from "next/image";
import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import highImage from "../iconlib/high.svg";
import mediumImage from "../iconlib/medium.svg";
import lowImage from "../iconlib/low.svg";
import { Task, Contact } from "../types";
import { createTask } from "../helper/fetchApi";

const AddTasksForm = ({ contacts }: { contacts: Contact[] }) => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [prio, setPrio] = useState<"high" | "medium" | "low">("low");

  const submitHandler = (data: FieldValues) => {
    createTask({ ...(data as Task), ...{ priority: prio } }).then(() => {
      router.push("board");
    });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-2">
      <label htmlFor="title" className="flex flex-col gap-2">
        <p>Title</p>
        <input
          type="text"
          {...register("title", { required: true, maxLength: 30 })}
          placeholder="Enter a title"
          className="border-2 border-outline h-8 rounded-lg px-2"
        />
      </label>
      <label htmlFor="description" className="flex flex-col gap-2">
        <p>Description</p>
        <textarea
          {...register("description", { required: true, maxLength: 100 })}
          placeholder="Enter a description"
          className="border-2 border-outline h-32 rounded-lg px-2"
        />
      </label>
      <div className="flex flex-col gap-2">
        <p>Prio</p>
        <div className="flex gap-4">
          <button
            onClick={() => setPrio("high")}
            type="button"
            className="flex w-1/3 justify-around gap-2 rounded-lg p-2 bg-white shadow-xl border-outline border-2 items-center"
          >
            <span>Urgent</span>
            <Image src={highImage} alt="Urgent" />
          </button>
          <button
            onClick={() => setPrio("medium")}
            type="button"
            className="flex w-1/3 justify-around gap-2 rounded-lg p-2 bg-white shadow-xl border-outline border-2 items-center"
          >
            <span>Medium</span>
            <Image src={mediumImage} alt="Medium" />
          </button>
          <button
            onClick={() => setPrio("low")}
            type="button"
            className="flex w-1/3 justify-around gap-2 rounded-lg p-2 bg-white shadow-xl border-outline border-2 items-center"
          >
            <span>Low</span>
            <Image src={lowImage} alt="Low" />
          </button>
        </div>
      </div>
      <label htmlFor="due_date" className="flex flex-col gap-2">
        <p>Due date</p>
        <input
          type="date"
          {...register("due_date", { required: true })}
          className="border-2 border-outline h-8 w-full rounded-lg px-2"
        />
      </label>
      <div className="flex flex-col gap-2">
        <p>Category</p>
        <select {...register("category")} className="border-2 border-outline h-8 w-full rounded-lg px-2">
          <option value="backoffice">Backoffice</option>
          <option value="design">Design</option>
          <option value="marketing">Marketing</option>
          <option value="sales">Sales</option>
          <option value="media">Media</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <p>Assignee</p>
        <select {...register("assignee")} className="border-2 border-outline h-8 w-full rounded-lg px-2">
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
        <select {...register("status")} className="border-2 border-outline h-8 w-full rounded-lg px-2">
          <option value="inProgress">In Progress</option>
          <option value="toDo">To do</option>
          <option value="awaitingFeedback">Awaiting feedback</option>
          <option value="done">Done</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-fit h-12 px-4 bg-primary rounded-lg text-white text-xl flex items-center gap-2 absolute top-4 right-8 z-10"
      >
        <span>Create</span>
        {/* <Image src={checkImage} alt="Create" /> */}
      </button>
    </form>
  );
};

export default AddTasksForm;
