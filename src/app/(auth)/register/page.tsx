import Link from "next/link";
import { Metadata } from "next";
import SignInForm from "../../../components/forms/SignInForm";
import Icon from "../../../components/Basics/Icon";

export const metadata: Metadata = {
  title: "Sign up",
};

const RegisterPage = () => {
  return (
    <div className="flex flex-col gap-4 rounded-3xl bg-white px-8 py-8 shadow-md dark:bg-bgDark sm:w-[25rem]">
      <div className="grid grid-cols-6 items-baseline">
        <Link href="/" className="group w-fit rounded outline-none outline-offset-4 focus-visible:outline-underline">
          <Icon icon="arrowLeft" className="group-hover:fill-underline dark:fill-underline" />
        </Link>
        <div className="col-span-4 flex cursor-default flex-col items-center gap-4 justify-self-center">
          <h1 className="text-4xl font-bold dark:text-textDark">Sign up</h1>
          <div className="h-0 w-24 rounded-full border-b-[3px] border-underline" />
        </div>
      </div>
      <SignInForm />
    </div>
  );
};

export default RegisterPage;
