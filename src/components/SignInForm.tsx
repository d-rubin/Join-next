"use client";

import Image from "next/image";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import UserIcon from "../img/userIcon.svg";
import EmailIcon from "../img/emailIcon.svg";
import LockIcon from "../img/lockIcon.svg";
import { register as registerFetch, TokenResponse } from "../helper/fetchApi";

const SignInForm = () => {
  const { handleSubmit, setFocus, register } = useForm();
  const [error, setError] = useState<string>();

  const onSubmit = (values: FieldValues) => {
    // registerFetch(values).then((res) => {
    registerFetch(values).then((res) => {
      const resp = res as TokenResponse;
      console.log("Token", resp.token || "Resp", resp);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 items-center">
      <div
        onClick={() => setFocus("name")}
        className="h-8 w-60 border-[--color-outline] border-2 rounded-lg text-[--color-outline] px-2 flex items-center"
      >
        <input
          {...register("name", { required: true })}
          // ref={usernameRef}
          type="text"
          placeholder="Username"
          className="w-11/12 placeholder:opacity-50 outline-0 text-black"
        />
        <Image src={UserIcon} alt="User Icon" className="w-1/12 h-4" />
      </div>
      <div
        onClick={() => setFocus("email")}
        className="h-8 w-60 border-[--color-outline] border-2 rounded-lg text-[--color-outline] px-2 flex items-center"
      >
        <input
          {...register("email", { required: true })}
          // ref={emailRef}
          type="email"
          placeholder="Email"
          className="w-11/12 placeholder:opacity-50 outline-0 text-black"
        />
        <Image src={EmailIcon} alt="Email Icon" className="w-1/12 h-4" />
      </div>
      <div
        onClick={() => setFocus("password")}
        className="h-8 w-60 border-[--color-outline] border-2 rounded-lg text-[--color-outline] px-2 flex items-center"
      >
        <input
          {...register("password", { required: true })}
          // ref={passwordRef}
          type="password"
          placeholder="Password"
          className="w-11/12 placeholder:opacity-50 outline-0 text-black"
        />
        <Image src={LockIcon} alt="Password Icon" className="w-1/12 h-4" />
      </div>
      <button type="submit" className="w-40 h-10 px-4 bg-[--color-primary] rounded-lg text-white text-xl">
        Sign in
      </button>
    </form>
  );
};

export default SignInForm;
