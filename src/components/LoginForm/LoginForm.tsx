"use client";

import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { useEffect } from "react";
import { login } from "../../helper/fetchApi";
import Icon from "../Icon";

const LoginForm = () => {
  const cookieStore = new Cookies();
  const router = useRouter();
  const { handleSubmit, setFocus, register } = useForm();

  useEffect(() => {
    const authToken = cookieStore.get("authToken");

    if (authToken) router.push("/summary");
  }, []);

  const onSubmit = (values: FieldValues) => {
    login(values).then((res) => {
      if (res.status === 201) {
        cookieStore.set("authToken", res.token);
        router.push("/summary");
      } else {
        router.push("/");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 items-center">
      <div
        onClick={() => setFocus("username")}
        className="h-8 w-60 border-outline border-2 rounded-lg text-color-outline px-2 flex items-center"
      >
        <input
          {...register("username", { required: true })}
          // ref={usernameRef}
          type="text"
          placeholder="Username"
          className="w-11/12 placeholder:opacity-50 outline-0 text-black"
        />
        <Icon icon="person" />
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
        <Icon icon="lock" />{" "}
      </div>
      <button className="w-40 h-10 px-4 bg-primary rounded-lg text-white text-xl">Log in</button>
    </form>
  );
};

export default LoginForm;
