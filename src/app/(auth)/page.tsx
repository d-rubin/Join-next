import { Metadata } from "next";
import Link from "next/link";
import LoginForm from "../../components/forms/LoginForm";
import Text from "../../components/Text";
import BigButton from "../../components/buttons/BigButton";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = () => {
  return (
    <div className="flex flex-col gap-8 w-full items-center">
      <div className="bg-white sm:w-[30rem] rounded-3xl px-8 py-8 gap-4 flex flex-col items-center shadow-md">
        <h1 className="text-4xl font-bold">Log in</h1>
        <div className="border-underline border-b-[3px] h-0 w-24 rounded-full" />
        <LoginForm />
      </div>
      <div className="flex flex-row items-center justify-center gap-4 md:absolute md:right-4 md:top-4">
        <Text text="Not a Join user?" />
        <Link href="register">
          <BigButton text="Sign up" />
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
