"use client";

import { FieldValues, useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import DefaultInput from "../inputs/Default";
import Password from "../inputs/Password";
import BigButton from "../buttons/BigButton";
import Checkbox from "../Checkbox";
import { login } from "../../helper/fetchApi";

const LoginForm = () => {
  const cookieStore = new Cookies();
  const router = useRouter();
  const { handleSubmit, register } = useForm<FieldValues>();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const checkboxRef = useRef<HTMLInputElement>(null);

  const submit = (values: FieldValues) => {
    setLoading(true);
    login({ ...values, ...{ rememberMe: checkboxRef.current?.checked || null } }).then((res) => {
      if (res.status === 201) {
        cookieStore.set("authToken", res.token);
        router.push("summary");
      } else {
        setError(true);
      }
      setLoading(false);
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4 items-center justify-start">
      <DefaultInput type="text" register={register} name="username" placeholder="Username" icon="mail" required block />
      <Password
        name="password"
        placeholder="Password"
        register={register}
        required
        block
        isError={error}
        errorText="Ups! Wrong password. Try again."
      />
      <div className="w-full">
        <Checkbox name="rememberMe" text="Remember me" ref={checkboxRef} />
      </div>
      <div className="w-full flex justify-center">
        <BigButton text="Login" loading={loading} className="px-12" />
      </div>
    </form>
  );
};

export default LoginForm;
