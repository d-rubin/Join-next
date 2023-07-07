"use client";

import Image from "next/image";
import { FieldValues, useForm } from "react-hook-form";
import checkImage from "../img/check.svg";
import highImage from "../img/high.svg";

const AddTasksForm = () => {
  const { register, handleSubmit } = useForm();

  const submitHandler = (data: FieldValues) => console.log(data);

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-2">
      <label htmlFor="title" className="flex flex-col gap-2">
        Title
        <input
          type="text"
          {...register("title", { required: true, maxLength: 30 })}
          placeholder="Enter a title"
          className="border-2 border-[--color-outline] h-8 rounded-lg px-2"
        />
      </label>
      <label htmlFor="description" className="flex flex-col gap-2">
        Description
        <textarea
          {...register("description", { required: true, maxLength: 100 })}
          placeholder="Enter a description"
          className="border-2 border-[--color-outline] h-32 rounded-lg px-2"
        />
      </label>
      <label>
        Prio
        <div>
          <input type="button" value="high"></input>
          <input type="button" value="medium" />
          <input type="button" value="low" />
        </div>
      </label>
      <button className="w-fit h-12 px-4 bg-[--color-primary] rounded-lg text-white text-xl flex items-center gap-2 absolute top-4 right-8 z-10">
        <span>Create</span>
        <Image src={checkImage} alt="Create" />
      </button>
    </form>
  );
};

export default AddTasksForm;
