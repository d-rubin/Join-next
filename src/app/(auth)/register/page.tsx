import Link from "next/link";
import { Metadata } from "next";
import SignInForm from "../../../components/forms/SignInForm";
import Icon from "../../../components/Icon";

export const metadata: Metadata = {
  title: "Sign up",
};

const RegisterPage = () => {
  return (
    <div className="relative bg-white sm:w-[25rem] rounded-3xl px-8 py-8 gap-4 flex flex-col items-center shadow-md">
      <Link href="/" className="absolute left-8 top-8">
        <Icon icon="arrowLeft" className="stroke-underline fill-underline" />
      </Link>
      <h1 className="text-4xl font-bold">Sign up</h1>
      <div className="border-underline border-b-[3px] h-0 w-24 rounded-full" />
      <SignInForm />
    </div>
  );
};

export default RegisterPage;
