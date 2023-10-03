"use client";

import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import Image from "next/image";
import { useEffect } from "react";
import { login } from "../../helper/fetchApi";
import UserIcon from "../../iconlib/userIcon.svg";
import LockIcon from "../../iconlib/lockIcon.svg";

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
      if (res.status === 200) {
        cookieStore.set("authToken", res.token);
        router.push("/summary");
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
        <Image src={UserIcon} alt="User Icon" className="w-1/12 h-4" />
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
        <Image src={LockIcon} alt="Password Icon" className="w-1/12 h-4" />
      </div>
      <button className="w-40 h-10 px-4 bg-primary rounded-lg text-white text-xl">Log in</button>
    </form>
  );
};

export default LoginForm;
