"use client";

import { FieldValues, useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { register as registerFetch } from "../../helper/fetchApi";
import Icon from "../Icon";

const SignInForm = () => {
  const cookieStore = new Cookies();
  const router = useRouter();
  const { handleSubmit, setFocus, register } = useForm();

  const onSubmit = (values: FieldValues) => {
    registerFetch(values).then((res) => {
      if (res.status === 201) {
        cookieStore.set("authToken", res.token);
      }
      router.push("/");
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 items-center">
      <div
        onClick={() => setFocus("name")}
        className="h-8 w-60 border-outline border-2 rounded-lg text-outline px-2 flex items-center"
      >
        <input
          {...register("name", { required: true })}
          // ref={usernameRef}
          type="text"
          placeholder="Username"
          className="w-11/12 placeholder:opacity-50 outline-0 text-black"
        />
        <Icon icon="person" />
      </div>
      <div
        onClick={() => setFocus("email")}
        className="h-8 w-60 border-outline border-2 rounded-lg text-outline px-2 flex items-center"
      >
        <input
          {...register("email", { required: true })}
          // ref={emailRef}
          type="email"
          placeholder="Email"
          className="w-11/12 placeholder:opacity-50 outline-0 text-black"
        />
        <Icon icon="email" />
      </div>
      <div
        onClick={() => setFocus("password")}
        className="h-8 w-60 border-outline border-2 rounded-lg text-outline px-2 flex items-center"
      >
        <input
          {...register("password", { required: true })}
          // ref={passwordRef}
          type="password"
          placeholder="Password"
          className="w-11/12 placeholder:opacity-50 outline-0 text-black"
        />
        <Icon icon="lock" />
      </div>
      <button type="submit" className="w-40 h-10 px-4 bg-primary rounded-lg text-white text-xl">
        Sign in
      </button>
    </form>
  );
};

export default SignInForm;
