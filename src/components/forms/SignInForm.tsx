"use client";

import { FieldValues } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DefaultInput from "../inputs/Default";
import Password from "../inputs/Password";
import Notification from "../Notification";
import Checkbox from "../Basics/Checkbox";
import { register as registerFetch } from "../../utils/serverActions";
import { signInSchema } from "../../schemas";
import Form from "../Basics/Form";
import FormButton from "./FormButton";
import { ErrorResponse } from "../../types";

const SignInForm = () => {
  const { push } = useRouter();
  const [privacyError, setPrivacyError] = useState<boolean>(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState<boolean>(false);
  const [trigger, setTrigger] = useState<boolean>(false);
  const [nameError, setNameError] = useState<string>();
  const [genericError, setGenericError] = useState<string>();

  const onSubmit = async (fieldValues: FieldValues) => {
    setPrivacyError(false);
    if (!isPrivacyChecked) setPrivacyError(true);
    else {
      const isValid = signInSchema.safeParse(fieldValues);

      if (!isValid.success) {
        const { error } = isValid;

        // todo: Resolve errors
        if (error.name) setNameError(error.name);
        else setGenericError("Something went wrong.");
      } else {
        const response = await registerFetch(fieldValues);

        if (response.status === 201) {
          setTrigger(!trigger);
          setTimeout(() => push("/summary"), 1500);
        } else if ("name" in response) {
          setGenericError((response as ErrorResponse).message);
        }
      }
    }
  };

  return (
    <>
      <Form onSubmit={onSubmit} schema={signInSchema} className="flex flex-col items-center justify-start gap-4">
        <DefaultInput
          type="text"
          name="name"
          block
          isError={!!nameError}
          icon="person"
          placeholder="Name"
          errorText={nameError}
        />
        <DefaultInput type="text" name="email" block icon="mail" placeholder="Email" />
        <Password name="password" placeholder="Password" block />
        <DefaultInput type="password" name="secondPassword" placeholder="Confirm password" block icon="lock" />
        {genericError && <p className="w-full justify-start text-xs text-red">{genericError}</p>}
        <div className="w-full text-left">
          <Checkbox
            name="privacy"
            isError={privacyError}
            onChange={setIsPrivacyChecked}
            text="I accept the Privacy Policy"
            errorText="Pls accept the Privacy Policy"
          />
        </div>
        <FormButton disabled={!isPrivacyChecked}>Sign up</FormButton>
      </Form>
      {trigger && <Notification text="You Signed Up successfully" trigger={trigger} />}
    </>
  );
};

export default SignInForm;
