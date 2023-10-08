"use client";

import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { register as registerFetch } from "../../helper/fetchApi";
// eslint-disable-next-line import/no-cycle
import DefaultInput from "../inputs/Default";
import Password from "../inputs/Password";
import BigButton from "../buttons/BigButton";
import Checkbox from "../Checkbox";

export interface RegisterValues {
  name: string;
  username: string;
  password: string;
}

const SignInForm = () => {
  const cookieStore = new Cookies();
  const router = useRouter();
  const { handleSubmit, register } = useForm<RegisterValues>();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const submit = (values: RegisterValues) => {
    registerFetch(values).then((res) => {
      if (res.status === 201) {
        cookieStore.set("authToken", res.token);
        router.push("summary");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4 items-center justify-start">
      {/* @ts-ignore */}
      <DefaultInput type="text" name="name" register={register} required block icon="person" placeholder="Name" />
      {/* @ts-ignore */}
      <DefaultInput type="text" name="email" register={register} required block icon="mail" placeholder="Email" />
      {/* @ts-ignore */}
      <Password name="password" placeholder="Password" register={register} required block />
      {/* @ts-ignore */}
      <DefaultInput
        type="password"
        name="secondPassword"
        placeholder="Confirm password"
        // @ts-ignore
        register={register}
        required
        block
        icon="lock"
      />
      {/* @ts-ignore */}
      <Checkbox name="privacy" text="I accept the Privacy Policy" register={register} />
      <BigButton text="Sign up" />
    </form>
  );
};

export default SignInForm;
