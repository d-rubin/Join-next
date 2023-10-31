"use client";

import { useRef, useState } from "react";
import DefaultInput from "../inputs/Default";
import Password from "../inputs/Password";
import Checkbox from "../Checkbox";

import { login } from "../../helper/serverActions";
import SubmitButton from "./SubmitButton";

const LoginForm = () => {
  const [error, setError] = useState<string>();
  // Todo: checkboxRef not working
  const checkboxRef = useRef<HTMLInputElement>(null);

  const submit = (formData: FormData) => {
    setError(undefined);
    login(formData).then((res) => {
      if (res.status !== 200 && "message" in res) setError(res.message);
    });
  };

  return (
    <form action={submit} className="flex flex-col gap-4 items-center justify-start">
      <DefaultInput
        maxLength={30}
        required
        type="text"
        name="username"
        placeholder="Username"
        isError={!!error}
        icon="mail"
        block
      />
      <Password
        minLength={8}
        required
        name="password"
        placeholder="Password"
        block
        isError={!!error}
        errorText={error}
      />
      <div className="w-full">
        <Checkbox name="rememberMe" text="Remember me" ref={checkboxRef} />
      </div>
      <div className="w-full flex justify-center">
        <SubmitButton text="Login" />
      </div>
    </form>
  );
};

export default LoginForm;
