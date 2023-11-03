"use client";

import { FieldValues, useForm } from "react-hook-form";
// eslint-disable-next-line import/no-extraneous-dependencies
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import DefaultInput from "../inputs/Default";
import Password from "../inputs/Password";
import Checkbox from "../Checkbox";

import { login } from "../../helper/serverActions";
import BigButton from "../buttons/BigButton";
import { loginSchema } from "../../schemas";
import { ErrorResponse } from "../../helper/fetchApi";
import { TLoginSchema } from "../../types";

const LoginForm = () => {
  const {
    register,
    formState: { isSubmitting },
    reset,
    handleSubmit,
  } = useForm({ resolver: zodResolver(loginSchema) });
  const [error, setError] = useState<string>();
  const rememberMeRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (fieldValues: FieldValues) => {
    const response = await login(fieldValues as TLoginSchema, rememberMeRef.current?.checked);

    if (response) {
      setError((response as ErrorResponse).message);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 items-center justify-start">
      <DefaultInput register={register} type="text" name="username" placeholder="Username" icon="mail" block />
      <Password register={register} name="password" placeholder="Password" block isError={!!error} errorText={error} />
      <div className="w-full">
        <Checkbox name="rememberMe" text="Remember me" ref={rememberMeRef} />
      </div>
      <div className="w-full flex justify-center">
        <BigButton text="Login" loading={isSubmitting} />
      </div>
    </form>
  );
};

export default LoginForm;
