"use client";

import { FieldValues } from "react-hook-form";
import { useRef, useState } from "react";
import DefaultInput from "../inputs/Default";
import Password from "../inputs/Password";
import Checkbox from "../Basics/Checkbox";

import { login } from "../../utils/serverActions";
import { loginSchema } from "../../schemas";
import { ErrorResponse } from "../../utils/fetchApi";
import Form from "../Basics/Form";
import FormButton from "./FormButton";

const LoginForm = () => {
  const [error, setError] = useState<string>();
  const rememberMeRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (fieldValues: FieldValues) => {
    const response = await login(fieldValues, rememberMeRef.current?.checked);

    if (response) {
      setError((response as ErrorResponse).message);
    }
  };

  return (
    <Form onSubmit={onSubmit} schema={loginSchema} className="flex flex-col items-center justify-start gap-4">
      <DefaultInput name="username" type="text" placeholder="Username" icon="mail" block />
      <Password name="password" placeholder="Password" block isError={!!error} errorText={error} />
      <div className="w-full">
        <Checkbox name="rememberMe" text="Remember me" ref={rememberMeRef} />
      </div>
      <div className="flex w-full justify-center">
        <FormButton>Login</FormButton>
      </div>
    </Form>
  );
};

export default LoginForm;
