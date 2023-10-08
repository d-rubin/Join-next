"use client";

import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
// eslint-disable-next-line import/no-cycle
import DefaultInput from "../inputs/Default";
import Password from "../inputs/Password";
import BigButton from "../buttons/BigButton";
// eslint-disable-next-line import/no-cycle
import Checkbox from "../Checkbox";
import { login } from "../../helper/fetchApi";

export interface LoginValues {
  username: string;
  password: string;
  rememberMe: boolean;
}

const LoginForm = () => {
  const cookieStore = new Cookies();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<LoginValues>();
  const [error, setError] = useState<boolean>(false);

  const submit = (values: LoginValues) => {
    login(values).then((res) => {
      if (res.status === 201) {
        cookieStore.set("authToken", res.token);
        router.push("/summary");
      } else {
        setError(true);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4 items-center justify-start">
      <DefaultInput
        type="text"
        register={register}
        name="username"
        placeholder="Username"
        icon="mail"
        required
        block
        maxLength={30}
      />
      <Password
        name="password"
        placeholder="Password"
        register={register}
        required
        block
        isError={error}
        errorText="Ups! Wrong password. Try again."
        maxLength={20}
      />
      <div className="w-full">
        <Checkbox name="rememberMe" text="Remember me" register={register} />
      </div>
      <div className="w-full flex justify-center">
        <BigButton text="Login" loading={isSubmitting} className="px-12" />
      </div>
    </form>
  );
};

export default LoginForm;
