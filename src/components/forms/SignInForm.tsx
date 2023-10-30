"use client";

import DefaultInput from "../inputs/Default";
import Password from "../inputs/Password";
import BigButton from "../buttons/BigButton";
import Checkbox from "../Checkbox";
import { register } from "../../helper/serverActions";

const SignInForm = () => {
  return (
    <>
      <form action={register} className="flex flex-col gap-4 items-center justify-start">
        {/* {error.general && <p className="text-xs text-red text-left w-full">Oops, something went wrong!</p>} */}
        <DefaultInput
          type="text"
          name="name"
          block
          icon="person"
          placeholder="Name"
          errorText="Username already in use"
        />
        <DefaultInput type="text" name="email" block icon="mail" placeholder="Email" errorText="Email already in use" />
        <Password name="password" placeholder="Password" block errorText="Passwords don't match" />
        <DefaultInput type="password" name="secondPassword" placeholder="Confirm password" block icon="lock" />
        <div className="w-full text-left">
          <Checkbox name="privacy" text="I accept the Privacy Policy" errorText="Pls accept the Privacy Policy" />
        </div>
        <BigButton text="Sign up" />
      </form>
      {/* {trigger && <Notification text="You Signed Up successfully" trigger={trigger} />} */}
    </>
  );
};

export default SignInForm;
