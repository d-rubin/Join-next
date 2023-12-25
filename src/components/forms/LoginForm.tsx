"use client";

import { FieldValues, useForm } from "react-hook-form";
// eslint-disable-next-line import/no-extraneous-dependencies
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import DefaultInput from "../inputs/Default";
import Password from "../inputs/Password";
import Checkbox from "../Basics/Checkbox";

import { login } from "../../utils/serverActions";
import Button from "../Basics/Button";
import { loginSchema } from "../../schemas";
import { ErrorResponse } from "../../utils/fetchApi";

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
    const response = await login(fieldValues, rememberMeRef.current?.checked);

    if (response) {
      setError((response as ErrorResponse).message);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-start gap-4">
      <DefaultInput register={register} type="text" name="username" placeholder="Username" icon="mail" block />
      <Password register={register} name="password" placeholder="Password" block isError={!!error} errorText={error} />
      <div className="w-full">
        <Checkbox name="rememberMe" text="Remember me" ref={rememberMeRef} />
      </div>
      <div className="flex w-full justify-center">
        <Button loading={isSubmitting}>Login</Button>
      </div>
    </form>
  );
};

export default LoginForm;
