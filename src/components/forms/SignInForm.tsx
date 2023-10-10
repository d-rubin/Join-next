"use client";

import { FieldValues, useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ErrorResponse, register as registerFetch, TokenResponse } from "../../helper/fetchApi";
import DefaultInput from "../inputs/Default";
import Password from "../inputs/Password";
import BigButton from "../buttons/BigButton";
import Checkbox from "../Checkbox";
import Notification from "../Notification";

const SignInForm = () => {
  const cookieStore = new Cookies();
  const { handleSubmit, register } = useForm<FieldValues>();
  const router = useRouter();
  const [error, setError] = useState<{
    privacy: boolean;
    general: boolean;
    email: boolean;
    name: boolean;
    password: boolean;
  }>({
    general: false,
    email: false,
    name: false,
    password: false,
    privacy: false,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [trigger, setTrigger] = useState<boolean>(false);

  const submit = (values: FieldValues) => {
    if (!checkbox) setError({ email: false, name: false, general: false, password: false, privacy: true });
    else if (values.password !== values.secondPassword)
      setError({ email: false, name: false, general: false, password: true, privacy: false });
    else {
      setLoading(true);
      registerFetch(values).then((res) => {
        if (res.status === 201) {
          cookieStore.set("authToken", (res as TokenResponse).token);
          setTrigger(true);
          setTimeout(() => router.push("summary"), 2000);
        } else {
          switch ((res as ErrorResponse).message) {
            case "Email already in use":
              setError({ email: true, name: false, general: false, password: false, privacy: false });
              break;
            case "Name already in use":
              setError({ name: true, general: false, email: false, password: false, privacy: false });
              break;
            default:
              setError({ name: false, general: true, email: false, password: false, privacy: false });
              break;
          }
        }
        setLoading(false);
      });
    }
  };

  const checkboxChange = (value: boolean) => {
    setCheckbox(value);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4 items-center justify-start">
        {error.general && <p className="text-xs text-red text-left w-full">Oops, something went wrong!</p>}
        <DefaultInput
          type="text"
          name="name"
          register={register}
          block
          required
          icon="person"
          placeholder="Name"
          isError={error.name}
          errorText="Username already in use"
        />
        <DefaultInput
          type="text"
          name="email"
          register={register}
          block
          required
          maxLength={100}
          icon="mail"
          placeholder="Email"
          isError={error.email}
          errorText="Email already in use"
        />
        <Password
          name="password"
          placeholder="Password"
          register={register}
          block
          required
          isError={error.password}
          errorText="Passwords don't match"
        />
        <DefaultInput
          type="password"
          name="secondPassword"
          placeholder="Confirm password"
          register={register}
          block
          isError={error.password}
          required
          icon="lock"
        />
        <div className="w-full text-left">
          <Checkbox
            name="privacy"
            text="I accept the Privacy Policy"
            value={checkbox}
            onChange={checkboxChange}
            isError={error.privacy}
            errorText="Pls accept the Privacy Policy"
          />
        </div>
        <BigButton text="Sign up" loading={loading} disabled={!checkbox} />
      </form>
      <Notification text="You Signed Up successfully" trigger={trigger} />
    </>
  );
};

export default SignInForm;
