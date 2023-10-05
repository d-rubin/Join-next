import { Metadata } from "next";
import DefaultInput from "../../components/inputs/Default";
import Password from "../../components/inputs/Password";
import BigButton from "../../components/buttons/BigButton";
import Text from "../../components/Text/Text";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = () => {
  return (
    <div className="bg-white rounded-3xl px-4 py-8 gap-4 flex flex-col items-center shadow-md">
      <h1 className="text-4xl font-bold">Log in</h1>
      <div className="border-underline border-b-[3px] h-0 w-24 rounded-full" />
      <form className="flex flex-col gap-4 items-center">
        <DefaultInput type="text" name="username" placeholder="Email" icon="mail" required block maxLength={30} />
        <Password
          name="password"
          placeholder="Password"
          required
          block
          errorText="Ups! Wrong password. Try again."
          maxLength={20}
        />
        <Text text="Remember me" />
        <BigButton text="Login" loading />
      </form>
    </div>
  );
};

export default LoginPage;
