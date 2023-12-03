import Link from "next/link";
import { Metadata } from "next";
import SignInForm from "../../../components/forms/SignInForm";
import Icon from "../../../components/Icon";

export const metadata: Metadata = {
  title: "Sign up",
};

const RegisterPage = () => {
  return (
    <div className="bg-white dark:bg-bgDark sm:w-[25rem] rounded-3xl px-8 py-8 gap-4 shadow-md flex flex-col">
      <div className="grid grid-cols-6 items-baseline">
        <Link href="/" className="outline-none w-fit rounded-lg p-1 hover:bg-grey focus:bg-grey">
          <Icon icon="arrowLeft" className="stroke-underline fill-underline" />
        </Link>
        <div className="flex flex-col col-span-4 items-center cursor-default gap-4 justify-self-center">
          <h1 className="text-4xl dark:text-textDark font-bold">Sign up</h1>
          <div className="border-underline border-b-[3px] h-0 w-24 rounded-full" />
        </div>
      </div>
      <SignInForm />
    </div>
  );
};

export default RegisterPage;
