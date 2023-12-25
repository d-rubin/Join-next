"use client";

import { FieldValues, useForm } from "react-hook-form";
// eslint-disable-next-line import/no-extraneous-dependencies
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DefaultInput from "../inputs/Default";
import Password from "../inputs/Password";
import Notification from "../Notification";
import Button from "../Basics/Button";
import Checkbox from "../Basics/Checkbox";
import { register as registerFetch } from "../../utils/serverActions";
import { signInSchema } from "../../schemas";

const SignInForm = () => {
  const { push } = useRouter();
  const {
    setError,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm({ resolver: zodResolver(signInSchema) });
  const [privacyError, setPrivacyError] = useState<boolean>(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState<boolean>(false);
  const [trigger, setTrigger] = useState<boolean>(false);

  const onSubmit = async (fieldValues: FieldValues) => {
    setPrivacyError(false);
    if (!isPrivacyChecked) setPrivacyError(true);
    else {
      const isValid = signInSchema.safeParse(fieldValues);

      if (!isValid.success) {
        const { error } = isValid;

        // todo: Resolve errors
        if (error.name) setError("name", { message: error.name });
        // if (error.email) setError("email", { message: error.email });
        // if (error.password) setError("password", { message: error.password });
        // if (error.secondPassword) setError("secondPassword", { message: error.secondPassword });
        else setError("secondPassword", { message: "Something went wrong." });
      } else {
        const response = await registerFetch(fieldValues);

        if (response.status === 201) {
          setTrigger(!trigger);
          setTimeout(() => push("/summary"));
        } else if ("name" in response) {
          setError(response.name!, { message: response.message });
        }
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-start gap-4">
        <DefaultInput
          type="text"
          name="name"
          register={register}
          block
          isError={!!errors.name}
          icon="person"
          placeholder="Name"
          // errorText="Username already in use"
          errorText={errors.name?.message as string}
        />
        <DefaultInput
          type="text"
          register={register}
          name="email"
          block
          icon="mail"
          placeholder="Email"
          isError={!!errors.email}
          // errorText="Email already in use"
          errorText={errors.email?.message as string}
        />
        <Password
          name="password"
          register={register}
          placeholder="Password"
          block
          isError={!!errors.password}
          errorText={errors.password?.message as string}
          // errorText="Passwords don't match"
        />
        <DefaultInput
          type="password"
          register={register}
          name="secondPassword"
          placeholder="Confirm password"
          block
          icon="lock"
          isError={!!errors.secondPassword}
          errorText={errors.secondPassword?.message as string}
        />
        <div className="w-full text-left">
          <Checkbox
            name="privacy"
            isError={privacyError}
            onChange={setIsPrivacyChecked}
            text="I accept the Privacy Policy"
            errorText="Pls accept the Privacy Policy"
          />
        </div>
        <Button loading={isSubmitting} disabled={!isPrivacyChecked}>
          Sign up
        </Button>
      </form>
      {trigger && <Notification text="You Signed Up successfully" trigger={trigger} />}
    </>
  );
};

export default SignInForm;
