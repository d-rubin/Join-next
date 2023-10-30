import DefaultInput from "../inputs/Default";
import Password from "../inputs/Password";
import Checkbox from "../Checkbox";

import { login } from "../../helper/serverActions";
import SubmitButton from "./SubmitButton";

const LoginForm = () => {
  return (
    <form action={login} className="flex flex-col gap-4 items-center justify-start">
      <DefaultInput type="text" name="username" placeholder="Username" icon="mail" block />
      <Password name="password" placeholder="Password" block errorText="Ups! Wrong password. Try again." />
      <div className="w-full">
        <Checkbox name="rememberMe" text="Remember me" />
      </div>
      <div className="w-full flex justify-center">
        <SubmitButton text="Login" />
      </div>
    </form>
  );
};

export default LoginForm;
